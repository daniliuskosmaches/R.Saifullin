require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const fs = require('fs');

// Конфигурация
const PORT = process.env.PORT || 3000;
const EMAIL_CONFIG = {
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  from: process.env.EMAIL_FROM || 'no-reply@childparty.com'
};
const MAX_EMAILS_PER_CLIENT = 3;

// Инициализация приложения
const app = express();

// Хранение данных в памяти с сохранением в файл
let bookings = [];
const emailCounts = {};
const DATA_FILE = 'data.json';

// Загрузка данных при старте
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE));
      bookings = data.bookings || [];
      Object.assign(emailCounts, data.emailCounts || {});
      console.log('Data loaded from file');
    }
  } catch (err) {
    console.error('Error loading data:', err);
  }
}

// Сохранение данных
function saveData() {
  const data = {
    bookings,
    emailCounts
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(data));
}

// Настройка отправки email
const transporter = nodemailer.createTransport(EMAIL_CONFIG);

// Мидлвары
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));

// Статические файлы (CSS, JS, изображения, видео)
app.use(express.static(__dirname, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
      res.setHeader('Content-Type', 'image/jpeg');
    } else if (filePath.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
    }
  }
}));

// Лимитер запросов для API
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100,
  message: 'Too many requests, please try again later'
}));

// API: Создание заявки
app.post('/api/bookings', async (req, res) => {
  try {
    const { name, phone, email, eventDate, childBirthday, packageType, characters = [], shows = [], masterClasses = [], total } = req.body;

    // Валидация
    if (!name || !phone || !eventDate || !childBirthday || !packageType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Создание заявки
    const booking = {
      id: Date.now().toString(),
      name,
      phone,
      email,
      eventDate: new Date(eventDate),
      childBirthday: new Date(childBirthday),
      packageType,
      characters,
      shows,
      masterClasses,
      totalPrice: total,
      createdAt: new Date()
    };

    bookings.push(booking);
    saveData();
    console.log(`New booking created: ${booking.id}`);

    // Отправка email
    if (email) {
      const emailKey = email.toLowerCase();
      emailCounts[emailKey] = (emailCounts[emailKey] || 0) + 1;
      saveData();

      if (emailCounts[emailKey] <= MAX_EMAILS_PER_CLIENT) {
        try {
          await sendConfirmationEmail(booking);
          console.log(`Confirmation email sent to ${email}`);
        } catch (emailError) {
          console.error('Email sending error:', emailError);
        }
      } else {
        console.warn(`Email limit reached for ${email}`);
      }
    }

    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API: Получение списка заявок
app.get('/api/bookings', (req, res) => {
  res.json({ 
    success: true,
    count: bookings.length,
    bookings: bookings.slice(-100)
  });
});

// API: Получение данных для фронтенда
app.get('/api/init-data', (req, res) => {
  res.json({
    characters: charactersData,
    shows: showsData,
    masterClasses: masterClassesData
  });
});

// Данные для фронтенда (из вашего script.js)
const charactersData = [
  { name: "Человек-Паук", desc: "Любимый супергерой детей", image: "/images/человек паук новый.PNG", price: 5000, video: "/videos/spiderman.mp4" },
  { name: "Железный Человек", desc: "Гений, миллиардер, плейбой, филантроп", image: "/images/железный человек.PNG", price: 6000, video: "/videos/ironman.mp4" },
  { name: "Бэтгерл", desc: "Отважная героиня Готэма", image: "/images/batgerl.PNG", price: 5500, video: "/videos/batgirl.mp4" },
  { name: "Пьеро", desc: "Грустный персонаж итальянской комедии", image: "/images/IMG_1662.PNG", price: 4500, video: "/videos/piero.mp4" },
  { name: "Эльза", desc: "Снежная королева из Холодного сердца", image: "/images/эльза.PNG", price: 6500, video: "/videos/elsa.mp4" },
  { name: "Пират", desc: "Отважный морской разбойник", image: "/images/пират.PNG", price: 5000, video: "/videos/pirate.mp4" },
  { name: "Гарри Поттер", desc: "Юный волшебник из Хогвартса", image: "/images/гарри поттер.PNG", price: 6000, video: "/videos/harrypotter.mp4" },
  { name: "Черепашки ниндзя", desc: "Четверка героев-мутантов", image: "/images/черепашки ниндзя.PNG", price: 8000, video: "/videos/tmnt.mp4" },
  { name: "Русалочка", desc: "Морская принцесса", image: "/images/русалочка.PNG", price: 5500, video: "/videos/mermaid.mp4" },
  { name: "Лего Ниндзяго", desc: "Ниндзя из мира Леgo", image: "/images/лего ниндзяго.PNG", price: 5500, video: "/videos/ninjago.mp4" },
  { name: "Белоснежка", desc: "Самая добрая принцесса", image: "/images/белоснежка.PNG", price: 5500, video: "/videos/snowwhite.mp4" },
  { name: "Лунтик", desc: "Добрый пришелец с Луны", image: "/images/лунтик.PNG", price: 5000, video: "/videos/luntik.mp4" }
];

const showsData = [
  { name: "Химическое Шоу", desc: "Удивительные эксперименты с жидким азотом", image: "/images/chemistry.jpeg", price: 10000, video: "/videos/chemistry-show.mp4" },
  { name: "Бумажное Шоу", desc: "Музыка, танцы и море бумаги", image: "/images/paper.jpeg", price: 12000, video: "/videos/paper-show.mp4" },
  { name: "Шоу Пузырей", desc: "Волшебный мир огромных мыльных пузырей", image: "/images/bubble.jpeg", price: 8000, video: "/videos/bubble-show.mp4" },
  { name: "Шоу магии", desc: "Волшебное шоу для детей", image: "/images/majic.jpeg", price: 8000, video: "/videos/magic-show.mp4" }
];

const masterClassesData = [
  { name: "Создание костюмов", desc: "Научитесь создавать костюмы своими руками", price: 2500, icon: "✂️" },
  { name: "Актерское мастерство", desc: "Основы перевоплощения в персонажей", price: 3000, icon: "🎭" },
  { name: "Грим и макияж", desc: "Профессиональные техники грима", price: 2800, icon: "🎨" }
];

// Обслуживание фронтенда - index.html в корневой папке
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Функция отправки email
async function sendConfirmationEmail(booking) {
  const mailOptions = {
    from: EMAIL_CONFIG.from,
    to: booking.email,
    subject: 'Ваша заявка принята!',
    html: `
      <h1>Спасибо за вашу заявку!</h1>
      <p>Мы получили вашу заявку на организацию детского праздника.</p>
      <h2>Детали заявки:</h2>
      <ul>
        <li>Пакет: ${booking.packageType}</li>
        <li>Дата мероприятия: ${new Date(booking.eventDate).toLocaleDateString()}</li>
        <li>Общая стоимость: ${booking.totalPrice} ₽</li>
      </ul>
      <p>Наш менеджер свяжется с вами в ближайшее время.</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

// Запуск сервера
loadData();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open in browser: http://localhost:${PORT}`);
});

// Сохранение данных при завершении
process.on('SIGINT', () => {
  saveData();
  process.exit();
});
