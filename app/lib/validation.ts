/**
 * バリデーションユーティリティ
 */

// メールアドレスの正規表現
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * メールアドレスのバリデーション
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * 電話番号のバリデーション（日本形式）
 */
export function isValidPhone(phone: string): boolean {
  // ハイフンあり・なし両対応
  const phoneRegex = /^(0\d{1,4}-?\d{1,4}-?\d{3,4})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * パスワードのバリデーション
 */
export function isValidPassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 8) {
    return { valid: false, error: 'パスワードは8文字以上で入力してください' };
  }
  return { valid: true };
}

/**
 * 必須フィールドのバリデーション
 */
export function isRequired(value: string | undefined | null): boolean {
  return value !== undefined && value !== null && value.trim().length > 0;
}
