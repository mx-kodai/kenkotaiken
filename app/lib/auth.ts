/**
 * 認証ロジック
 * TODO: Supabase Authに差し替え予定
 *
 * (ダミー) 実装 - ローカルストレージベースのシンプルな認証
 */

import { findUserByEmail, createUser, User } from './db';

// セッションの型定義
export interface Session {
  user: Omit<User, 'password'>;
  token: string;
  expiresAt: Date;
}

// (ダミー) トークン生成
function generateToken(): string {
  return `dummy-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ログイン
export async function login(email: string, password: string): Promise<{ success: boolean; session?: Session; error?: string }> {
  const user = await findUserByEmail(email);

  if (!user) {
    return { success: false, error: 'メールアドレスまたはパスワードが正しくありません' };
  }

  // (ダミー) パスワード比較 - 本番ではbcryptなどでハッシュ比較
  if (user.password !== password) {
    return { success: false, error: 'メールアドレスまたはパスワードが正しくありません' };
  }

  const { password: _, ...userWithoutPassword } = user;
  const session: Session = {
    user: userWithoutPassword,
    token: generateToken(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7日間有効
  };

  return { success: true, session };
}

// 新規登録
export async function register(data: {
  email: string;
  password: string;
  name: string;
}): Promise<{ success: boolean; session?: Session; error?: string }> {
  // メールアドレスの重複チェック
  const existingUser = await findUserByEmail(data.email);
  if (existingUser) {
    return { success: false, error: 'このメールアドレスは既に登録されています' };
  }

  // パスワードバリデーション
  if (data.password.length < 8) {
    return { success: false, error: 'パスワードは8文字以上で入力してください' };
  }

  // ユーザー作成
  const user = await createUser({
    email: data.email,
    password: data.password, // (ダミー) 本番ではハッシュ化必須
    name: data.name,
  });

  const { password: _, ...userWithoutPassword } = user;
  const session: Session = {
    user: userWithoutPassword,
    token: generateToken(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };

  return { success: true, session };
}

// パスワードリセットリクエスト
export async function requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
  const user = await findUserByEmail(email);

  if (!user) {
    // セキュリティのため、ユーザーが存在しなくても成功を返す
    return { success: true };
  }

  // (ダミー) 本番ではメール送信処理を実装
  console.log(`[ダミー] パスワードリセットメール送信: ${email}`);
  console.log(`[ダミー] リセットトークン: ${generateToken()}`);

  return { success: true };
}

// セッション検証
export function validateSession(session: Session | null): boolean {
  if (!session) return false;
  return new Date() < new Date(session.expiresAt);
}
