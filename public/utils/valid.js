export function isValidUserName(password) {
    return password.length >= 8;
}

// Минимум 4 символа и символ @
export function isValidEmail(email) {
    return email.length >= 4 && email.includes('@');
}

// Минимум 8 символов и содержит хотя бы одну строчную и заглавную буквы
export function isValidPassword(password) {
    return password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password);
}
