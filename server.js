const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Обработка POST-запроса на регистрацию
app.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // Внутренняя валидация на сервере
    const errors = {};

    if (!name || name.trim() === '') {
        errors.name = 'Пожалуйста, введите имя.';
    }

    if (!email || email.trim() === '') {
        errors.email = 'Пожалуйста, введите email.';
    } else if (!validateEmail(email)) {
        errors.email = 'Некорректный формат email.';
    }

    if (!password || password.length < 8) {
        errors.password = 'Пароль должен быть не менее 8 символов.';
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = 'Пароли не совпадают.';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    // Здесь можно добавить логику сохранения пользователя в базу данных

    return res.json({ success: true, message: 'Регистрация прошла успешно!' });
});

// Простая функция проверки email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});