document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    clearErrors();
    document.getElementById('resultMessage').textContent = '';

    const data = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
    };

    // Локальная проверка перед отправкой (можно оставить или убрать)
    let isValidLocal = true;
    if (data.name === '') { showError('nameError', 'Пожалуйста, введите имя.'); isValidLocal = false; }
    if (data.email === '') { showError('emailError', 'Пожалуйста, введите email.'); isValidLocal = false; }
    else if (!validateEmail(data.email)) { showError('emailError', 'Некорректный формат email.'); isValidLocal = false; }
    if (data.password.length < 8) { showError('passwordError', 'Пароль должен быть не менее 8 символов.'); isValidLocal = false; }
    if (data.confirmPassword !== data.password) { showError('confirmPasswordError', 'Пароли не совпадают.'); isValidLocal = false; }

    if (!isValidLocal) return;

    // Отправка данных на сервер
    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(result => {
          if (result.success) {
              document.getElementById('resultMessage').textContent = result.message;
              document.getElementById('resultMessage').style.color = 'green';
              document.getElementById('registrationForm').reset();
          } else {
              // Обработка ошибок с сервера
              for (const key in result.errors) {
                  showError(`${key}Error`, result.errors[key]);
              }
              document.getElementById('resultMessage').textContent = 'Ошибка при регистрации.';
              document.getElementById('resultMessage').style.color = 'red';
          }
      })
      .catch(() => {
          document.getElementById('resultMessage').textContent = 'Ошибка соединения с сервером.';
          document.getElementById('resultMessage').style.color = 'red';
      });
});