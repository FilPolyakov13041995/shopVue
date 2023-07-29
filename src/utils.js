export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) && email !== '') {
      return 'Недопустимый адрес эл. почты';
    }
    return '';
}

export function validatePassword(password, confirmPassword) {
    if (password.length < 6 && password !== '') {
      return 'Пароль должен быть длиннее 6 символов';
    }
    if (password !== confirmPassword && confirmPassword !== '') {
      return 'Пароли не совпадают';
    }
    return '';
}

export function validatePasswordLength(password) {
    if (password.length < 6 && password !== '') {
      return 'Пароль должен быть длиннее 6 символов';
    }
    return '';
}



