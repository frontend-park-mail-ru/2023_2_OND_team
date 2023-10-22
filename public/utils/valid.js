/**
* Проверяется, является ли имя пользователя валидным.
* @param {string} username - Введеное имя пользователя.
* @return {object} - Объект с полем `valid` (true/false) и полем
* `message` (сообщение об ошибке, если есть).
*/
export function nameValid(username) {
  const regex = /^[a-zA-Z0-9_-]+$/;
  const allowedChars = /^[a-zA-Zа-яА-Я0-9!@#$%^&*()_+{}[]|:<>,.?~=-]+$/;
  let validation = {valid: true, message: ''};

  if (!username) {
    validation = {
      valid: false,
      message: 'Заполните это поле',
    };
  } else if (!regex.test(username) || !allowedChars.test(username)) {
    validation = {
      valid: false,
      message: 'Имя пользователя содержит недопустимые символы',
    };
  } else if (username.length < 4) {
    validation = {
      valid: false,
      message: 'Имя пользователя должно содержать не менее 4 символов',
    };
  } else if (username.length >= 50) {
    validation = {
      valid: false,
      message: 'Имя пользователя должно содержать менее 50 символов',
    };
  }

  return validation;
}

/**
* Проверяется, является ли адрес электронной почты валидным.
* @param {string} email - Введенный адрес электронной почты.
* @return {object} - Объект с полем `valid` (true/false) и
* полем `message` (сообщение об ошибке, если есть).
*/
export function emailValid(email) {
  const allowedChars = /^[a-zA-Zа-яА-Я0-9!@#$%^&*()_+{}[]|:<>,.?~=-]+$/;
  let validation = {valid: true, message: ''};

  if (!email) {
    validation = {
      valid: false,
      message: 'Заполните это поле',
    };
  } else if (!allowedChars.test(email)) {
    validation = {
      valid: false,
      message: 'Email содержит недопустимые символы',
    };
  } else if (email.length >= 50) {
    validation = {
      valid: false,
      message: 'Email должен содержать не более 50 символов',
    };
  } else if (!email.includes('@')) {
    validation = {
      valid: false,
      message: 'Email должен содержать символ @',
    };
  } else {
    const parts = email.split('@');
    if (parts.length !== 2) {
      validation = {
        valid: false,
        message: 'Email должен содержать только один символ @',
      };
    } else {
      const domainParts = parts[1].split('.');
      if (domainParts.length < 2) {
        validation = {
          valid: false,
          message: 'Некорректный формат домена в email',
        };
      }
    }
  }

  return validation;
}

/**
* Проверяется, является ли пароль валидным.
* @param {string} password - Введенный пароль для проверки.
* @return {object} - Объект с полем `valid` (true/false) и полем
* `message` (сообщение об ошибке, если есть).
*/
export function passwordValid(password) {
  const allowedChars = /^[a-zA-Zа-яА-Я0-9!@#$%^&*()_+{}[]|:<>,.?~=-]+$/;
  let validation = {valid: true, message: ''};

  if (!password) {
    validation = {
      valid: false,
      message: 'Заполните это поле',
    };
  } else if (!allowedChars.test(password)) {
    validation = {
      valid: false,
      message: 'Пароль содержит недопустимые символы',
    };
  } else if (password.length < 8) {
    validation = {
      valid: false,
      message: 'Пароль должен содержать не менее 8 символов',
    };
  } else if (password.length >= 50) {
    validation = {
      valid: false,
      message: 'Пароль должен содержать менее 50 символов',
    };
  } else if (!/[a-z]/.test(password)) {
    validation = {
      valid: false,
      message: 'Пароль должен содержать хотя бы одну букву в нижнем регистре',
    };
  } else if (!/[A-Z]/.test(password)) {
    validation = {
      valid: false,
      message: 'Пароль должен содержать хотя бы одну букву в верхнем регистре',
    };
  }
  
  return validation;
}
