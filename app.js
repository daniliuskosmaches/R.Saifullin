require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const fs = require('fs');
const crypto = require('crypto');

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
const PRICE_SECRET = process.env.PRICE_SECRET || crypto.randomBytes(32).toString('hex');

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
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      mediaSrc: ["'self'", "https:"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com"]
    }
  }
}));
app.use(cors());
app.use(express.json({ limit: '10kb' }));

// Сначала блокируем доступ к серверным файлам
app.get([
  '/app.js',
  '/server.js', 
  '/package.json', 
  '/package-lock.json', 
  '/node_modules/*',
  '/.env',
  '/.git/*',
  '/data.json',
  '/.gitignore',
  '/README.md'
], (req, res) => {
  console.log('Blocked access to server file:', req.path);
  res.status(404).send('Not found');
});

// Блокировка .js файлов кроме разрешенных папок
app.get('*.js', (req, res, next) => {
  // Разрешаем только js файлы в определенных папках
  if (req.path.startsWith('/js/') || 
      req.path.startsWith('/scripts/') || 
      req.path.startsWith('/vendor/') ||
      req.path.startsWith('/assets/') ||
      req.path.startsWith('/static/')) {
    next();
  } else {
    console.log('Blocked JS file access:', req.path);
    res.status(404).send('Not found');
  }
});

// Лимитер запросов для API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later'
});
app.use('/api/', apiLimiter);

// Только после блокировки серверных файлов - безопасная раздача статических файлов
app.use(express.static(__dirname, {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const allowedExtensions = ['.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.mp4', '.webm', '.svg', '.woff', '.woff2', '.ttf', '.eot'];
    
    if (!allowedExtensions.includes(ext)) {
      res.status(404).end();
      return;
    }

    // Устанавливаем правильные Content-Type
    const mimeTypes = {
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.ico': 'image/x-icon',
      '.mp4': 'video/mp4',
      '.webm': 'video/webm',
      '.svg': 'image/svg+xml',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2',
      '.ttf': 'font/ttf',
      '.eot': 'application/vnd.ms-fontobject'
    };

    if (mimeTypes[ext]) {
      res.setHeader('Content-Type', mimeTypes[ext]);
    }
  }
}));

// Функции для работы с ценами
function createPriceSignature(productId, price, type = 'character') {
  const data = `${type}:${productId}:${price}:${Date.now()}`;
  const signature = crypto.createHmac('sha256', PRICE_SECRET)
    .update(data)
    .digest('hex');
  
  return { price, signature, timestamp: Date.now() };
}

function verifyPriceSignature(productId, price, signature, timestamp, type = 'character') {
  const data = `${type}:${productId}:${price}:${timestamp}`;
  const expectedSignature = crypto.createHmac('sha256', PRICE_SECRET)
    .update(data)
    .digest('hex');
  
  return expectedSignature === signature && 
         (Date.now() - timestamp) < 300000; // 5 минут expiry
}

function getRealPrice(productId, type = 'character') {
  let data;
  switch (type) {
    case 'character':
      data = charactersData.find(c => c.id === productId);
      break;
    case 'show':
      data = showsData.find(s => s.id === productId);
      break;
    case 'master':
      data = masterClassesData.find(m => m.id === productId);
      break;
    case 'additional':
      data = additionalServices.find(a => a.id === productId);
      break;
    default:
      return 0;
  }
  return data ? data.price : 0;
}

// Данные для фронтенда
const charactersData = [
  { id: 1, name: "Человек-Паук", desc: "Любимый супергерой детей", image: "/images/человек паук новый.PNG", price: 5000, video: "/videos/spiderman.mp4" },
  { id: 2, name: "Железный Человек", desc: "Гений, миллиардер, плейбой, филантроп", image: "/images/железный человек.PNG", price: 6000, video: "/videos/ironman.mp4" },
  { id: 3, name: "Бэтгерл", desc: "Отважная героиня Готэма", image: "/images/batgerl.PNG", price: 5500, video: "/videos/batgirl.mp4" },
  { id: 4, name: "Пьеро", desc: "Грустный персонаж итальянской комедии", image: "/images/IMG_1662.PNG", price: 4500, video: "/videos/piero.mp4" },
  { id: 5, name: "Эльза", desc: "Снежная королева из Холодного сердца", image: "/images/эльза.PNG", price: 6500, video: "/videos/elsa.mp4" },
  { id: 6, name: "Пират", desc: "Отважный морской разбойник", image: "/images/пират.PNG", price: 5000, video: "/videos/pirate.mp4" },
  { id: 7, name: "Гарри Поттер", desc: "Юный волшебник из Хогвартса", image: "/images/гарри поттер.PNG", price: 6000, video: "/videos/harrypotter.mp4" },
  { id: 8, name: "Черепашки ниндзя", desc: "Четверка героев-мутантов", image: "/images/черепашки ниндзя.PNG", price: 8000, video: "/videos/tmnt.mp4" },
  { id: 9, name: "Русалочка", desc: "Морская принцесса", image: "/images/русалочка.PNG", price: 5500, video: "/videos/mermaid.mp4" },
  { id: 10, name: "Лего Ниндзяго", desc: "Ниндзя из мира Леgo", image: "/images/лего ниндзяго.PNG", price: 5500, video: "/videos/ninjago.mp4" },
  { id: 11, name: "Белоснежка", desc: "Самая добрая принцесса", image: "/images/белоснежка.PNG", price: 5500, video: "/videos/snowwhite.mp4" },
  { id: 12, name: "Лунтик", desc: "Добрый пришелец с Луны", image: "/images/лунтик.PNG", price: 5000, video: "/videos/luntik.mp4" }
];

const showsData = [
  { id: 1, name: "Химическое Шоу", desc: "Удивительные эксперименты с жидким азотом", image: "/images/chemistry.jpeg", price: 10000, video: "/videos/chemistry-show.mp4" },
  { id: 2, name: "Бумажное Шоу", desc: "Музыка, танцы и море бумаги", image: "/images/paper.jpeg", price: 12000, video: "/videos/paper-show.mp4" },
  { id: 3, name: "Шоу Пузырей", desc: "Волшебный мир огромных мыльных пузырей", image: "/images/bubble.jpeg", price: 8000, video: "/videos/bubble-show.mp4" },
  { id: 4, name: "Шоу магии", desc: "Волшебное шоу для детей", image: "/images/majic.jpeg", price: 8000, video: "/videos/magic-show.mp4" }
];

const masterClassesData = [
  { id: 1, name: "Создание костюмов", desc: "Научитесь создавать костюмы своими руками", price: 2500, icon: "✂️" },
  { id: 2, name: "Актерское мастерство", desc: "Основы перевоплощения в персонажей", price: 3000, icon: "🎭" },
  { id: 3, name: "Грим и макияж", desc: "Профессиональные техники грима", price: 2800, icon: "🎨" }
];

const additionalServices = [
  { id: 1, name: "Тортик", price: 3000 },
  { id: 2, name: "Фотограф", price: 5000 },
  { id: 3, name: "Пиньята", price: 1500 }
];

// API: Получение данных для фронтенда с подписанными ценами
app.get('/api/init-data', (req, res) => {
  try {
    const signedCharacters = charactersData.map(char => ({
      ...char,
      signedPrice: createPriceSignature(char.id, char.price, 'character')
    }));

    const signedShows = showsData.map(show => ({
      ...show,
      signedPrice: createPriceSignature(show.id, show.price, 'show')
    }));

    const signedMasterClasses = masterClassesData.map(master => ({
      ...master,
      signedPrice: createPriceSignature(master.id, master.price, 'master')
    }));

    const signedAdditionalServices = additionalServices.map(service => ({
      ...service,
      signedPrice: createPriceSignature(service.id, service.price, 'additional')
    }));

    res.json({
      characters: signedCharacters,
      shows: signedShows,
      masterClasses: signedMasterClasses,
      additionalServices: signedAdditionalServices
    });
  } catch (error) {
    console.error('Error generating signed data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API: Создание заявки
app.post('/api/bookings', async (req, res) => {
  try {
    const { 
      name, 
      phone, 
      email, 
      eventDate, 
      childBirthday, 
      packageType, 
      characters = [], 
      shows = [], 
      masterClasses = [], 
      additionalServices = [],
      total 
    } = req.body;

    // Валидация обязательных полей
    if (!name || !phone || !eventDate || !childBirthday || !packageType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Валидация email
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Валидация телефона
    if (!/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(phone)) {
      return res.status(400).json({ error: 'Invalid phone format' });
    }

    // Валидация дат
    const eventDateObj = new Date(eventDate);
    const childBirthdayObj = new Date(childBirthday);
    const now = new Date();
    
    if (eventDateObj <= now) {
      return res.status(400).json({ error: 'Event date must be in the future' });
    }

    if (childBirthdayObj >= now) {
      return res.status(400).json({ error: 'Child birthday must be in the past' });
    }

    // Проверка цен персонажей
    for (const char of characters) {
      if (!verifyPriceSignature(char.id, char.price, char.signature, char.timestamp, 'character')) {
        return res.status(400).json({ error: 'Invalid character price detected' });
      }
      
      const realPrice = getRealPrice(char.id, 'character');
      if (parseFloat(char.price) !== parseFloat(realPrice)) {
        return res.status(400).json({ error: 'Character price mismatch' });
      }
    }

    // Проверка цен шоу
    for (const show of shows) {
      if (!verifyPriceSignature(show.id, show.price, show.signature, show.timestamp, 'show')) {
        return res.status(400).json({ error: 'Invalid show price detected' });
      }
      
      const realPrice = getRealPrice(show.id, 'show');
      if (parseFloat(show.price) !== parseFloat(realPrice)) {
        return res.status(400).json({ error: 'Show price mismatch' });
      }
    }

    // Проверка цен мастер-классов
    for (const master of masterClasses) {
      if (!verifyPriceSignature(master.id, master.price, master.signature, master.timestamp, 'master')) {
        return res.status(400).json({ error: 'Invalid master class price detected' });
      }
      
      const realPrice = getRealPrice(master.id, 'master');
      if (parseFloat(master.price) !== parseFloat(realPrice)) {
        return res.status(400).json({ error: 'Master class price mismatch' });
      }
    }

    // Проверка цен доп. услуг
    for (const service of additionalServices) {
      if (!verifyPriceSignature(service.id, service.price, service.signature, service.timestamp, 'additional')) {
        return res.status(400).json({ error: 'Invalid additional service price detected' });
      }
      
      const realPrice = getRealPrice(service.id, 'additional');
      if (parseFloat(service.price) !== parseFloat(realPrice)) {
        return res.status(400).json({ error: 'Additional service price mismatch' });
      }
    }

    // Пересчет общей суммы на сервере
    let calculatedTotal = 0;
    
    // Базовая цена пакета
    const packagePrices = {
      basic: 10000,
      standard: 35000,
      premium: 55000,
      custom: 0
    };
    
    calculatedTotal += packagePrices[packageType] || 0;

    // Добавляем цены выбранных услуг
    characters.forEach(char => calculatedTotal += parseFloat(char.price));
    shows.forEach(show => calculatedTotal += parseFloat(show.price));
    masterClasses.forEach(master => calculatedTotal += parseFloat(master.price));
    additionalServices.forEach(service => calculatedTotal += parseFloat(service.price));

    // Проверка общей суммы
    if (Math.abs(parseFloat(total) - calculatedTotal) > 0.01) {
      return res.status(400).json({ 
        error: 'Total price mismatch', 
        calculatedTotal,
        receivedTotal: total 
      });
    }

    // Создание заявки
    const booking = {
      id: crypto.randomUUID(),
      name,
      phone,
      email,
      eventDate: eventDateObj,
      childBirthday: childBirthdayObj,
      packageType,
      characters,
      shows,
      masterClasses,
      additionalServices,
      totalPrice: calculatedTotal,
      createdAt: new Date(),
      ip: req.ip
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

    res.status(201).json({ 
      success: true, 
      booking: {
        id: booking.id,
        totalPrice: booking.totalPrice,
        createdAt: booking.createdAt
      }
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API: Получение списка заявок (только для админа)
app.get('/api/bookings', (req, res) => {
  // Базовая проверка авторизации
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.json({ 
    success: true,
    count: bookings.length,
    bookings: bookings.slice(-100).map(b => ({
      id: b.id,
      name: b.name,
      phone: b.phone,
      email: b.email,
      eventDate: b.eventDate,
      packageType: b.packageType,
      totalPrice: b.totalPrice,
      createdAt: b.createdAt
    }))
  });
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

// Обработка ошибок
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Обслуживание фронтенда - ДОЛЖНО БЫТЬ ПОСЛЕДНИМ
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
loadData();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open in browser: http://localhost:${PORT}`);
  console.log('Price security enabled with HMAC signatures');
});

// Сохранение данных при завершении
process.on('SIGINT', () => {
  saveData();
  process.exit();
});