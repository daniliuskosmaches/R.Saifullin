// match-shows-images-eng.js
const fs = require('fs');
const path = require('path');

// Исходные данные шоу
const showsData = [
  {
    name: "Шоу мыльных пузырей",
    desc: "Гигантские пузыри, огненные пузыри и дети внутри пузыря.",
    price: "1400 AED",
    age: "2-7 лет",
    duration: "30 минут",
    video: "videos/Foam.mp4"
  },
  {
    name: "Неоновое шоу пузырей",
    desc: "Светящиеся в темноте пузыри, тоннели и световые эффекты.",
    price: "1800 AED",
    age: "5-12 лет",
    duration: "30 минут",
    video: "videos/Bubble.mp4"
  },
  {
    name: "Химическое шоу",
    desc: "Огненные и паровые эксперименты, сухой лёд и яркие опыты.",
    price: "1400 AED",
    age: "5-15 лет",
    duration: "30 минут",
    video: "videos/Chemical.mp4"
  },
  {
    name: "Тесла шоу",
    desc: "Электрические разряды, молнии и безопасные эксперименты.",
    price: "1400 AED",
    age: "6-15 лет",
    duration: "30 минут",
    video: "videos/Tesla.mp4"
  },
  {
    name: "Бумажное шоу",
    desc: "Танцы, музыка и буря из бумаги — яркое праздничное веселье.",
    price: "2000 AED",
    age: "5-9 лет",
    duration: "30 минут",
    video: "videos/Paper.mp4"
  },
  {
    name: "Крио-шоу с мороженым",
    desc: "Зрелищные эксперименты с холодом + мороженое для детей.",
    price: "1800 AED",
    age: "5-15 лет",
    duration: "45 минут",
    video: "videos/Icecream.mp4"
  },
  {
    name: "Слайм шоу-мастерская",
    desc: "Создай свой слайм — яркие цвета, весёлое творчество.",
    price: "1000 AED (до 10 детей)",
    age: "5-10 лет",
    duration: "30-45 минут",
    video: "videos/slime-show.mov"
  },
  {
    name: "Мастерская блокнотов",
    desc: "Творческий мастер-класс по созданию блокнотов со стикерами и декором.",
    price: "1200 AED (до 10 детей)",
    age: "5-10 лет",
    duration: "30-45 минут",
    video: "videos/Notebook.mp4"
  },
  {
    name: "Пенная вечеринка",
    desc: "Огромная пена, музыка и танцы в облаке пузырей.",
    price: "2200 AED",
    age: "5-15 лет",
    duration: "60 минут",
    video: "videos/Foam.mp4"
  },
  {
    name: "Магическое шоу",
    desc: "Весёлые фокусы, иллюзии и интерактив с детьми.",
    price: "1400 AED",
    age: "4-7 лет",
    duration: "30 минут",
    video: "videos/Magic.mp4"
  },
  {
    name: "Сумасшедшая коробка с животными",
    desc: "Интерактивный сюрприз с экзотическими животными.",
    price: "1900 AED",
    age: "5+",
    duration: "40 минут",
    video: "videos/Crazy.mp4"
  },
  {
    name: "Мафия для детей и подростков",
    desc: "Ролевая игра, логика и весёлый сторителлинг.",
    price: "700 AED",
    age: "6+",
    duration: "60 минут",
    video: "videos/Mafia.mp4"
  },
  {
    name: "Мафия для взрослых",
    desc: "Детективная ролевая игра в стиле вечеринки.",
    price: "900 AED",
    age: "16+",
    duration: "60 минут",
    video: "videos/MagicAdults.mp4"
  },
  {
    name: "Ведущий для подростков",
    desc: "Игры, конкурсы и зажигательный ведущий для вечеринки.",
    price: "700 AED",
    age: "12-18 лет",
    duration: "60 минут",
    video: "videos/teen.mp4"
  }
];

// Папка с изображениями
const IMAGES_DIR = './images';

// Ключевые слова на английском для сопоставления
const KEYWORDS_MAPPING = {
  'bubble': 'Шоу мыльных пузырей',
  'foam': 'Шоу мыльных пузырей',
  'soap': 'Шоу мыльных пузырей',
  
  'neon': 'Неоновое шоу пузырей',
  'glow': 'Неоновое шоу пузырей',
  'light': 'Неоновое шоу пузырей',
  
  'chemical': 'Химическое шоу',
  'science': 'Химическое шоу',
  'experiment': 'Химическое шоу',
  
  'tesla': 'Тесла шоу',
  'lightning': 'Тесла шоу',
  'electric': 'Тесла шоу',
  
  'paper': 'Бумажное шоу',
  'confetti': 'Бумажное шоу',
  
  'cryo': 'Крио-шоу с мороженым',
  'ice': 'Крио-шоу с мороженым',
  'icecream': 'Крио-шоу с мороженым',
  'cold': 'Крио-шоу с мороженым',
  
  'slime': 'Слайм шоу-мастерская',
  'slimeworkshop': 'Слайм шоу-мастерская',
  
  'notebook': 'Мастерская блокнотов',
  'diary': 'Мастерская блокнотов',
  'craft': 'Мастерская блокнотов',
  
  'foamparty': 'Пенная вечеринка',
  'foamdisco': 'Пенная вечеринка',
  
  'magic': 'Магическое шоу',
  'magician': 'Магическое шоу',
  'magicshow': 'Магическое шоу',
  
  'animal': 'Сумасшедшая коробка с животными',
  'animals': 'Сумасшедшая коробка с животными',
  'crazybox': 'Сумасшедшая коробка с животными',
  'zoo': 'Сумасшедшая коробка с животными',
  
  'mafia': 'Мафия для детей и подростков',
  'mafiagame': 'Мафия для детей и подростков',
  
  'host': 'Ведущий для подростков',
  'teen': 'Ведущий для подростков',
  'teenparty': 'Ведущий для подростков',
  'animator': 'Ведущий для подростков'
};

function findMatchingImage(showName, imageFiles) {
  const showNameLower = showName.toLowerCase();
  
  // Ищем по ключевым словам
  for (const [keyword, targetShow] of Object.entries(KEYWORDS_MAPPING)) {
    if (targetShow === showName) {
      for (const imageFile of imageFiles) {
        const imageName = path.parse(imageFile).name.toLowerCase();
        if (imageName.includes(keyword)) {
          return imageFile;
        }
      }
    }
  }
  
  // Дополнительные проверки для каждого шоу
  for (const imageFile of imageFiles) {
    const imageName = path.parse(imageFile).name.toLowerCase();
    
    if (showNameLower.includes('пузыр') && (imageName.includes('bubble') || imageName.includes('foam'))) {
      return imageFile;
    }
    if (showNameLower.includes('неон') && imageName.includes('neon')) {
      return imageFile;
    }
    if (showNameLower.includes('хими') && (imageName.includes('chemical') || imageName.includes('science'))) {
      return imageFile;
    }
    if (showNameLower.includes('тесла') && (imageName.includes('tesla') || imageName.includes('lightning'))) {
      return imageFile;
    }
    if (showNameLower.includes('бумаж') && imageName.includes('paper')) {
      return imageFile;
    }
    if ((showNameLower.includes('крио') || showNameLower.includes('морожен')) && 
        (imageName.includes('cryo') || imageName.includes('ice') || imageName.includes('icecream'))) {
      return imageFile;
    }
    if (showNameLower.includes('слайм') && imageName.includes('slime')) {
      return imageFile;
    }
    if (showNameLower.includes('блокнот') && (imageName.includes('notebook') || imageName.includes('diary'))) {
      return imageFile;
    }
    if (showNameLower.includes('пен') && imageName.includes('foam')) {
      return imageFile;
    }
    if ((showNameLower.includes('маги') || showNameLower.includes('фокус')) && imageName.includes('magic')) {
      return imageFile;
    }
    if ((showNameLower.includes('животн') || showNameLower.includes('звер')) && 
        (imageName.includes('animal') || imageName.includes('zoo'))) {
      return imageFile;
    }
    if (showNameLower.includes('мафия') && imageName.includes('mafia')) {
      return imageFile;
    }
    if ((showNameLower.includes('ведущ') || showNameLower.includes('аним')) && 
        (imageName.includes('host') || imageName.includes('teen') || imageName.includes('animator'))) {
      return imageFile;
    }
  }
  
  return null;
}

function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.log('❌ Папка images не найдена!');
    return;
  }
  
  const imageFiles = fs.readdirSync(IMAGES_DIR).filter(file => 
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );
  
  if (imageFiles.length === 0) {
    console.log('❌ В папке images нет изображений!');
    return;
  }
  
  console.log(`📁 Найдено изображений: ${imageFiles.length}`);
  console.log('📝 Файлы:', imageFiles.join(', '));
  
  const showsWithImages = showsData.map(show => {
    const matchedImage = findMatchingImage(show.name, imageFiles);
    
    return {
      ...show,
      image: matchedImage ? `images/${matchedImage}` : 'images/default-show.jpg'
    };
  });
  
  const output = `const showsData = ${JSON.stringify(showsWithImages, null, 2)};\n\nexport default showsData;`;
  fs.writeFileSync('./showsData.js', output);
  
  console.log('\n✅ Готово! showsData.js создан');
  console.log('\n📊 Результаты сопоставления:');
  
  showsWithImages.forEach(show => {
    const status = show.image !== 'images/default-show.jpg' ? '✅' : '❌';
    console.log(`${status} ${show.name} -> ${show.image}`);
  });
  
  if (showsWithImages.some(show => show.image === 'images/default-show.jpg')) {
    console.log('\n💡 Для ненайденных изображений:');
    console.log('1. Добавьте default-show.jpg в папку images');
    console.log('2. Или переименуйте файлы чтобы содержали английские ключевые слова');
  }
}

main();