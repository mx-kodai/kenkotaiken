'use client';

/**
 * 認証コンテキスト
 * TODO: Supabase Authに差し替え予定
 *
 * (ダミー) 実装 - ローカルストレージベース
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as authLogin, register as authRegister, requestPasswordReset, Session, validateSession } from '../lib/auth';

interface AuthContextType {
  session: Session | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_STORAGE_KEY = 'wellnavi_session'; // (ダミー) ストレージキー

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初期化時にストレージからセッション復元
  useEffect(() => {
    const stored = localStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // 日付を復元
        parsed.expiresAt = new Date(parsed.expiresAt);
        parsed.user.createdAt = new Date(parsed.user.createdAt);

        if (validateSession(parsed)) {
          setSession(parsed);
        } else {
          localStorage.removeItem(SESSION_STORAGE_KEY);
        }
      } catch (e) {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const result = await authLogin(email, password);
    if (result.success && result.session) {
      setSession(result.session);
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(result.session));
    }
    return { success: result.success, error: result.error };
  };

  const register = async (email: string, password: string, name: string) => {
    const result = await authRegister({ email, password, name });
    if (result.success && result.session) {
      setSession(result.session);
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(result.session));
    }
    return { success: result.success, error: result.error };
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  };

  const resetPassword = async (email: string) => {
    return await requestPasswordReset(email);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        isLoggedIn: !!session,
        login,
        register,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
