'use client';

/**
 * SNSシェア機能フック
 */

import { useCallback } from 'react';

interface ShareData {
  title: string;
  text?: string;
  url?: string;
}

export function useShare() {
  const share = useCallback(async (data: ShareData) => {
    const url = data.url || (typeof window !== 'undefined' ? window.location.href : '');
    const text = data.text || data.title;

    // Web Share APIが使える場合はそれを使用
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: data.title,
          text: text,
          url: url,
        });
        return { success: true, method: 'native' };
      } catch (error) {
        // ユーザーがキャンセルした場合
        if ((error as Error).name === 'AbortError') {
          return { success: false, method: 'cancelled' };
        }
      }
    }

    // フォールバック: クリップボードにコピー
    try {
      await navigator.clipboard.writeText(url);
      return { success: true, method: 'clipboard' };
    } catch (error) {
      return { success: false, method: 'error' };
    }
  }, []);

  const shareToTwitter = useCallback((data: ShareData) => {
    const url = data.url || (typeof window !== 'undefined' ? window.location.href : '');
    const text = encodeURIComponent(data.title);
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }, []);

  const shareToFacebook = useCallback((data: ShareData) => {
    const url = data.url || (typeof window !== 'undefined' ? window.location.href : '');
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }, []);

  const shareToLine = useCallback((data: ShareData) => {
    const url = data.url || (typeof window !== 'undefined' ? window.location.href : '');
    const text = encodeURIComponent(`${data.title} ${url}`);
    const shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${text}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }, []);

  const copyToClipboard = useCallback(async (url?: string) => {
    const targetUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    try {
      await navigator.clipboard.writeText(targetUrl);
      return true;
    } catch {
      return false;
    }
  }, []);

  return {
    share,
    shareToTwitter,
    shareToFacebook,
    shareToLine,
    copyToClipboard,
    copyLink: copyToClipboard, // エイリアス（互換性のため）
  };
}
