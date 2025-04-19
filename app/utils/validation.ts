export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateLoginInputs = (email: string, password: string): string | null => {
  if (!email || !password) {
    return 'الرجاء ملء جميع الحقول';
  }
  
  if (!isValidEmail(email)) {
    return 'البريد الإلكتروني غير صالح';
  }
  
  if (!isValidPassword(password)) {
    return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
  }
  
  return null;
}; 