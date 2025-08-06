document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Очистка предыдущих сообщений
    clearErrors();
    document.getElementById('resultMessage').textContent = '';

    // Получение значений полей
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    let isValid = true;

    // Валидация имени
    if (name === '') {
        showError('nameError', 'Пожалуйста, введите имя.');
        isValid = false;
    }

    // Валидация email
    if (email === '') {
        showError('emailError', 'Пожалуйста, введите email.');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('emailError', 'Некорректный формат email.');
        isValid = false;
    }

    // Валидация пароля
    if (password.length < 8) {
        showError('passwordError', 'Пароль должен быть не менее 8 символов.');
        isValid = false;
    }

    // Валидация подтверждения пароля
    if (confirmPassword !== password) {
        showError('confirmPasswordError', 'Пароли не совпадают.');
        isValid = false;
   }

   // Если все валидно - показываем сообщение об успехе
   if (isValid) {
       document.getElementById('resultMessage').textContent = 'Регистрация прошла успешно!';
       document.getElementById('resultMessage').style.color = 'green';

       // Можно добавить логику отправки данных на сервер или сброс формы
       // например:
       // document.getElementById('registrationForm').reset();
   }
});

// Функция для отображения ошибок
function showError(elementId, message) {
   document.getElementById(elementId).textContent = message;
}

// Очистка сообщений об ошибках
function clearErrors() {
   const errorElements = document.querySelectorAll('.error-message');
   errorElements.forEach(function(el) {
       el.textContent = '';
   });
}

// Простая проверка email с помощью регулярного выражения
function validateEmail(email) {
   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return re.test(email);
}
