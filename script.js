const API_BASE_URL = '/api';

const charactersData = [
  {
    "name": "Капитан Америка",
    "desc": "Капитан Бургера",
    "image": "images/amurika.PNG",
    "price": 5000
  },
  {
    "name": "Barbie",
    "desc": "Описание для Barbie",
    "image": "images/barbie.PNG",
    "price": 4702
  },
  {
    "name": "Бэтгерл",
    "desc": "Отважная героиня Готэма",
    "image": "images/batgerrl.PNG",
    "price": 5500
  },
  {
    "name": "Batmen",
    "desc": "Описание для Batmen",
    "image": "images/batmen.PNG",
    "price": 5714
  },
  {
    "name": "Белоснежка",
    "desc": "Самая добрая принцесса",
    "image": "images/belosnezhka.PNG",
    "price": 5500
  },
  {
    "name": "Buzz",
    "desc": "Описание для Buzz",
    "image": "images/buzz.PNG",
    "price": 5881
  },
  {
    "name": "Cheburashka",
    "desc": "Описание для Cheburashka",
    "image": "images/cheburashka.PNG",
    "price": 6535
  },
  {
    "name": "Clown",
    "desc": "Описание для Clown",
    "image": "images/clown.PNG",
    "price": 6208
  },
  {
    "name": "Clowns",
    "desc": "Описание для Clowns",
    "image": "images/clowns.PNG",
    "price": 7039
  },
  {
    "name": "Djedai",
    "desc": "Описание для Djedai",
    "image": "images/djedai.PNG",
    "price": 4513
  },
  {
    "name": "Фредди Фазбер",
    "desc": "Поиграй с медведем",
    "image": "images/fredybazbearholhoholhoohohhool.PNG",
    "price": 5500
  },
  {
    "name": "Гарри Поттер",
    "desc": "Юный волшебник из Хогвартса",
    "image": "images/garypotter.PNG",
    "price": 6000
  },
  {
    "name": "Grinch",
    "desc": "Описание для Grinch",
    "image": "images/grinch.PNG",
    "price": 5678
  },
  {
    "name": "Халк",
    "desc": "Зеленный качок",
    "image": "images/Halk.PNG",
    "price": 5000
  },
  {
    "name": "Happy New Year",
    "desc": "Описание для Happy New Year",
    "image": "images/happy new year.PNG",
    "price": 5802
  },
  {
    "name": "Joker",
    "desc": "Описание для Joker",
    "image": "images/joker.PNG",
    "price": 7930
  },
  {
    "name": "Kreeper",
    "desc": "Описание для Kreeper",
    "image": "images/kreeper.PNG",
    "price": 7642
  },
  {
    "name": "Ladybug",
    "desc": "Описание для Ladybug",
    "image": "images/ladybug.PNG",
    "price": 4814
  },
  {
    "name": "Lego",
    "desc": "Описание для Lego",
    "image": "images/lego.PNG",
    "price": 5007
  },
  {
    "name": "Malifest",
    "desc": "Описание для Malifest",
    "image": "images/malifest.PNG",
    "price": 5085
  },
  {
    "name": "Matros",
    "desc": "Описание для Matros",
    "image": "images/matros.PNG",
    "price": 7225
  },
  {
    "name": "Maybl",
    "desc": "Описание для Maybl",
    "image": "images/maybl.PNG",
    "price": 7242
  },
  {
    "name": "Mikiandmaus",
    "desc": "Описание для Mikiandmaus",
    "image": "images/mikiandmaus.PNG",
    "price": 6237
  },
  {
    "name": "Mikimaus",
    "desc": "Описание для Mikimaus",
    "image": "images/Mikimaus.PNG",
    "price": 5554
  },
  {
    "name": "Майнкрафт",
    "desc": "Тюринг полная игра",
    "image": "images/minicraftblyat.PNG",
    "price": 4500
  },
  {
    "name": "Minions",
    "desc": "Описание для Minions",
    "image": "images/minions.PNG",
    "price": 7658
  },
  {
    "name": "Naruto",
    "desc": "Описание для Naruto",
    "image": "images/naruto.PNG",
    "price": 7376
  },
  {
    "name": "Neznayka",
    "desc": "Описание для Neznayka",
    "image": "images/neznayka.PNG",
    "price": 6436
  },
  {
    "name": "Patrul",
    "desc": "Описание для Patrul",
    "image": "images/patrul.PNG",
    "price": 7931
  },
  {
    "name": "Пьеро",
    "desc": "Дед инсайд с ссср",
    "image": "images/piero.PNG",
    "price": 6500
  },
  {
    "name": "Pirat",
    "desc": "Описание для Pirat",
    "image": "images/pirat.PNG",
    "price": 7209
  },
  {
    "name": "Pony",
    "desc": "Описание для Pony",
    "image": "images/pony.PNG",
    "price": 5876
  },
  {
    "name": "Футболист",
    "desc": "Отец роналдо",
    "image": "images/ronaldo.PNG",
    "price": 5000
  },
  {
    "name": "Rusalochka",
    "desc": "Описание для Rusalochka",
    "image": "images/rusalochka.PNG",
    "price": 6541
  },
  {
    "name": "Scauts",
    "desc": "Описание для Scauts",
    "image": "images/scauts.PNG",
    "price": 4903
  },
  {
    "name": "Шрек",
    "desc": "Кто проживает на дне болота",
    "image": "images/shrek.PNG",
    "price": 8000
  },
  {
    "name": "Soldat",
    "desc": "Описание для Soldat",
    "image": "images/soldat.PNG",
    "price": 6029
  },
  {
    "name": "Sonik",
    "desc": "Описание для Sonik",
    "image": "images/sonik.PNG",
    "price": 7761
  },
  {
    "name": "Spiderman",
    "desc": "Описание для Spiderman",
    "image": "images/spiderman.PNG",
    "price": 6253
  },
  {
    "name": "Superkot",
    "desc": "Описание для Superkot",
    "image": "images/superkot.PNG",
    "price": 7291
  },
  {
    "name": "Супермен",
    "desc": "Лунтик в плаще",
    "image": "images/superpidor.PNG",
    "price": 5500
  },
  {
    "name": "Svinkapepa",
    "desc": "Описание для Svinkapepa",
    "image": "images/svinkapepa.PNG",
    "price": 6986
  },
  {
    "name": "Teremok",
    "desc": "Описание для Teremok",
    "image": "images/teremok.PNG",
    "price": 4722
  },
  {
    "name": "Thor",
    "desc": "Описание для Thor",
    "image": "images/thor.PNG",
    "price": 4955
  },
  {
    "name": "Tiktokers",
    "desc": "Описание для Tiktokers",
    "image": "images/tiktokers.PNG",
    "price": 5596
  },
  {
    "name": "Железный Человек",
    "desc": "Гений, миллиардер, плейбой, филантроп",
    "image": "images/tonysrark.PNG",
    "price": 6000
  },
  {
    "name": "Transformers",
    "desc": "Описание для Transformers",
    "image": "images/transformers.PNG",
    "price": 6985
  },
  {
    "name": "Trikotaa",
    "desc": "Описание для Trikotaa",
    "image": "images/trikotaa.PNG",
    "price": 5477
  },
  {
    "name": "Wednesday",
    "desc": "Описание для Wednesday",
    "image": "images/wednesday.PNG",
    "price": 6756
  }
];

const showsData = [
  {
    "name": "Шоу мыльных пузырей",
    "desc": "Гигантские пузыри, огненные пузыри и дети внутри пузыря.",
    "price": "1400 AED",
    "age": "2-7 лет",
    "duration": "30 минут",
    "video": "https://daniliuskosmaches.github.io/videos/Fom.mp4",
    "image": "images/bubble.jpg"
  },
  {
    "name": "Неоновое шоу пузырей",
    "desc": "Светящиеся в темноте пузыри, тоннели и световые эффекты.",
    "price": "1800 AED",
    "age": "5-12 лет",
    "duration": "30 минут",
    "video": "https://daniliuskosmaches.github.io/videos/videos/Bubble.mp4",
    "image": "images/bubble.jpg"
  },
  {
    "name": "Химическое шоу",
    "desc": "Огненные и паровые эксперименты, сухой лёд и яркие опыты.",
    "price": "1400 AED",
    "age": "5-15 лет",
    "duration": "30 минут",
    "video": "https://daniliuskosmaches.github.io/videos/Chemical.mp4",
    "image": "images/chemical.jpg"
  },
  {
    "name": "Тесла шоу",
    "desc": "Электрические разряды, молнии и безопасные эксперименты.",
    "price": "1400 AED",
    "age": "6-15 лет",
    "duration": "30 минут",
    "video": "https://daniliuskosmaches.github.io/videos/videos/Tesla.mp4",
    "image": "images/tesla.jpg"
  },
  {
    "name": "Бумажное шоу",
    "desc": "Танцы, музыка и буря из бумаги — яркое праздничное веселье.",
    "price": "2000 AED",
    "age": "5-9 лет",
    "duration": "30 минут",
    "video": "https://daniliuskosmaches.github.io/videos/Paper.mp4",
    "image": "images/paper.jpg"
  },
  {
    "name": "Крио-шоу с мороженым",
    "desc": "Зрелищные эксперименты с холодом + мороженое для детей.",
    "price": "1800 AED",
    "age": "5-15 лет",
    "duration": "45 минут",
    "video": "https://daniliuskosmaches.github.io/videos/Icecream.mp4",
    "image": "images/cryo.jpg"
  },
  {
    "name": "Слайм шоу-мастерская",
    "desc": "Создай свой слайм — яркие цвета, весёлое творчество.",
    "price": "1000 AED (до 10 детей)",
    "age": "5-10 лет",
    "duration": "30-45 минут",
    "video": "videos/slime-show.mov",
    "image": "images/slime.jpg"
  },
  {
    "name": "Мастерская блокнотов",
    "desc": "Творческий мастер-класс по созданию блокнотов со стикерами и декором.",
    "price": "1200 AED (до 10 детей)",
    "age": "5-10 лет",
    "duration": "30-45 минут",
    "video": "https://daniliuskosmaches.github.io/videos/Notebook.mp4",
    "image": "images/notebook.jpg"
  },
  {
    "name": "Пенная вечеринка",
    "desc": "Огромная пена, музыка и танцы в облаке пузырей.",
    "price": "2200 AED",
    "age": "5-15 лет",
    "duration": "60 минут",
    "video": "videos/Foam.mp4",
    "image": "images/foam.jpg"
  },
  {
    "name": "Магическое шоу",
    "desc": "Весёлые фокусы, иллюзии и интерактив с детьми.",
    "price": "1400 AED",
    "age": "4-7 лет",
    "duration": "30 минут",
    "video": "videos/Magic.mp4",
    "image": "images/magic.jpg"
  },
  {
    "name": "Сумасшедшая коробка с животными",
    "desc": "Интерактивный сюрприз с экзотическими животными.",
    "price": "1900 AED",
    "age": "5+",
    "duration": "40 минут",
    "video": "https://daniliuskosmaches.github.io/videos/Crazybox.mp4",
    "image": "images/crazybox.jpg"
  },
  {
    "name": "Мафия для детей и подростков",
    "desc": "Ролевая игра, логика и весёлый сторителлинг.",
    "price": "700 AED",
    "age": "6+",
    "duration": "60 минут",
    "video": "https://daniliuskosmaches.github.io/videos/Mafiakids.mp4",
    "image": "images/mafia.jpg"
  },
  {
    "name": "Мафия для взрослых",
    "desc": "Детективная ролевая игра в стиле вечеринки.",
    "price": "900 AED",
    "age": "16+",
    "duration": "60 минут",
    "video": "https://daniliuskosmaches.github.io/videos/Mafia.mp4",
    "image": "images/mafia.jpg"
  },
  {
    "name": "Ведущий для подростков",
    "desc": "Игры, конкурсы и зажигательный ведущий для вечеринки.",
    "price": "700 AED",
    "age": "12-18 лет",
    "duration": "60 минут",
    "video": "videos/teen.mp4",
    "image": "images/default-show.jpg"
  }
];

const masterClassesData = [
  { name: "Создание костюмов", desc: "Научитесь создавать костюмы своими руками", price: 2500, icon: "✂️" },
  { name: "Актерское мастерство", desc: "Основы перевоплощения в персонажей", price: 3000, icon: "🎭" },
  { name: "Грим и макияж", desc: "Профессиональные техники грима", price: 2800, icon: "🎨" }
];

let currentPackage = null;
let selectedCharacters = [];
let selectedShows = [];
let selectedMasterClasses = [];
let selectedProducts = [];
let selectedAdditionalServices = [];
let maxCharacters = 0;
let maxShows = 0;
let maxMasterClasses = 0;
let basePrice = 0;

document.addEventListener('DOMContentLoaded', function() {
  initSliders();
  initPackageSelection();
  initMobileMenu();
  initSmoothScroll();
  initOrderButton();
  initFormValidation();
  initPhoneMask();
  initModalClose();
  initIntersectionObserver();
  initProductButtons();
  initAdditionalServiceCheckboxes();
});

function initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      document.querySelector('header').classList.add('scrolled');
    } else {
      document.querySelector('header').classList.remove('scrolled');
    }
  });
}

function initSliders() {
  const charactersSlider = document.getElementById('characters-slider');
  charactersSlider.innerHTML = '';
  
  charactersData.forEach(character => {
    const isSelected = selectedCharacters.some(c => c.name === character.name);
    const card = document.createElement('div');
    card.className = `character-card ${isSelected ? 'selected' : ''}`;
    card.dataset.name = character.name;
    
    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <div class="character-info">
        <h4>${character.name}</h4>
        <p>${character.desc}</p>
        ${currentPackage === 'custom' ? `<p class="price-tag">${character.price}₽</p>` : ''}
      </div>
    `;
    
    charactersSlider.appendChild(card);
  });

  const showsSlider = document.getElementById('shows-slider');
  showsSlider.innerHTML = '';
  
  showsData.forEach(show => {
    const isSelected = selectedShows.some(s => s.name === show.name);
    const card = document.createElement('div');
    card.className = `show-card ${isSelected ? 'selected' : ''}`;
    card.dataset.name = show.name;
    
    card.innerHTML = `
      <img src="${show.image}" alt="${show.name}">
      <div class="show-info">
        <h4>${show.name}</h4>
        <p>${show.desc}</p>
        ${currentPackage === 'custom' ? `<p class="price-tag">${show.price}</p>` : ''}
        <button class="view-btn" data-video="${show.video}" data-name="${show.name}">Посмотреть</button>
      </div>
    `;
    
    showsSlider.appendChild(card);
  });

  const masterSlider = document.getElementById('master-slider');
  masterSlider.innerHTML = '';
  
  masterClassesData.forEach(master => {
    const isSelected = selectedMasterClasses.some(m => m.name === master.name);
    const card = document.createElement('div');
    card.className = `master-card ${isSelected ? 'selected' : ''}`;
    card.dataset.name = master.name;
    
    card.innerHTML = `
      <div class="master-icon">${master.icon}</div>
      <h4>${master.name}</h4>
      <p>${master.desc}</p>
      ${currentPackage === 'custom' ? `<p class="price-tag">${master.price}₽</p>` : ''}
    `;
    
    masterSlider.appendChild(card);
  });

  initSelectionHandlers();
  initGalleryButtons();
  initCarouselNavigation();
}

function initPackageSelection() {
  const packageButtons = document.querySelectorAll('.select-package');
  
  packageButtons.forEach(button => {
    button.addEventListener('click', function() {
      const packageCard = this.closest('.package-card');
      currentPackage = packageCard.dataset.package;
      
      switch(currentPackage) {
        case 'basic':
          maxCharacters = 1;
          maxShows = 0;
          maxMasterClasses = 1;
          basePrice = 10000;
          break;
        case 'standard':
          maxCharacters = 2;
          maxShows = 1;
          maxMasterClasses = 0;
          basePrice = 35000;
          break;
        case 'premium':
          maxCharacters = 3;
          maxShows = 2;
          maxMasterClasses = 1;
          basePrice = 55000;
          break;
        case 'custom':
          maxCharacters = 99;
          maxShows = 99;
          maxMasterClasses = 99;
          basePrice = 0;
          break;
      }
      
      selectedCharacters = [];
      selectedShows = [];
      selectedMasterClasses = [];
      selectedProducts = [];
      selectedAdditionalServices = [];
      
      document.getElementById('selected-package-name').textContent = getPackageName(currentPackage);
      document.getElementById('max-characters').textContent = maxCharacters;
      document.getElementById('max-shows').textContent = maxShows;
      document.getElementById('max-master').textContent = maxMasterClasses;
      
      document.getElementById('package-selection').classList.add('active');
      
      initSliders();
      updateSelection();
      
      setTimeout(() => {
        document.getElementById('package-selection').scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    });
  });
}

function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    this.classList.toggle('active');
  });
  
  const navButtons = mobileMenu.querySelectorAll('.nav-button');
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initOrderButton() {
  const orderBtn = document.getElementById('order-btn');
  
  orderBtn.addEventListener('click', () => {
    updateFormSelectedServices();
    
    document.querySelector('#consultForm').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  });
}

function initFormValidation() {
  const form = document.getElementById('consultationForm');
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = this.querySelector('#name');
    const phone = this.querySelector('#phone');
    const eventDate = this.querySelector('#eventDate');
    const childBirthday = this.querySelector('#childBirthday');
    
    let isValid = true;
    
    if (!name.value.trim()) {
      name.style.borderColor = 'red';
      isValid = false;
    } else {
      name.style.borderColor = '';
    }
    
    if (!phone.value.match(/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/)) {
      phone.style.borderColor = 'red';
      isValid = false;
    } else {
      phone.style.borderColor = '';
    }
    
    if (!eventDate.value) {
      eventDate.style.borderColor = 'red';
      isValid = false;
    } else {
      eventDate.style.borderColor = '';
    }
    
    if (!childBirthday.value) {
      childBirthday.style.borderColor = 'red';
      isValid = false;
    } else {
      childBirthday.style.borderColor = '';
    }
    
    if (isValid && currentPackage) {
      try {
        const formData = {
          name: name.value,
          phone: phone.value,
          email: '',
          eventDate: eventDate.value,
          childBirthday: childBirthday.value,
          packageType: currentPackage,
          characters: selectedCharacters,
          shows: selectedShows,
          masterClasses: selectedMasterClasses,
          products: selectedProducts,
          additionalServices: selectedAdditionalServices,
          total: document.getElementById('total-price').textContent
        };

        const response = await fetch(`${API_BASE_URL}/bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Ошибка сервера');
        }

        const data = await response.json();
        showNotification('Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
        form.reset();
        resetSelection();
      } catch (error) {
        console.error('Ошибка:', error);
        showNotification(error.message || 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.', 'error');
      }
    } else if (!currentPackage) {
      showNotification('Пожалуйста, выберите пакет услуг', 'error');
    } else {
      showNotification('Пожалуйста, заполните все обязательные поля корректно', 'error');
    }
  });
}

function resetSelection() {
  currentPackage = null;
  selectedCharacters = [];
  selectedShows = [];
  selectedMasterClasses = [];
  selectedProducts = [];
  selectedAdditionalServices = [];
  document.getElementById('package-selection').classList.remove('active');
  document.getElementById('form-selected-services').innerHTML = '';
  document.querySelectorAll('.character-card, .show-card, .master-card').forEach(card => {
    card.classList.remove('selected');
  });
  updateSelection();
}

function initPhoneMask() {
  const phoneInput = document.getElementById('phone');
  
  phoneInput.addEventListener('input', function(e) {
    let value = this.value.replace(/\D/g, '');
    
    if (value.length > 0) {
      value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
    }
    
    this.value = value.substring(0, 18);
  });
}

function initModalClose() {
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
      });
    });
  });
  
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
      }
    });
  });
}

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

function updateSelection() {
  document.getElementById('characters-count').textContent = selectedCharacters.length;
  document.getElementById('shows-count').textContent = selectedShows.length;
  document.getElementById('master-count').textContent = selectedMasterClasses.length;
  updateSelectedServicesPreview();
  updateTotalPrice();
}

function scrollCarousel(id, amount) {
  const carousel = document.getElementById(id);
  carousel.scrollBy({ left: amount, behavior: 'smooth' });
}

function showVideoModal(videoUrl, title) {
  const modal = document.getElementById('video-modal');
  const video = document.getElementById('modal-video');
  const videoTitle = document.getElementById('video-modal-title');
  
  video.src = videoUrl;
  videoTitle.textContent = title;
  modal.classList.add('active');
  
  document.querySelector('#video-modal .close-modal').addEventListener('click', function() {
    video.pause();
  });
}

function initProductButtons() {
  document.querySelectorAll('.product-card .add-product-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = this.closest('.product-card');
      const name = card.dataset.name;
      const price = parseInt(card.dataset.price, 10);
      const id = card.dataset.product;
      if (!selectedProducts.some(p => p.id === id)) {
        selectedProducts.push({ id, name, price });
        showNotification(`Товар "${name}" добавлен`, 'success');
        updateSelection();
      }
    });
  });
}

function initAdditionalServiceCheckboxes() {
  document.querySelectorAll('.additional-service').forEach(chk => {
    chk.addEventListener('change', function() {
      const name = this.dataset.name;
      const price = parseInt(this.dataset.price, 10);
      const id = this.dataset.type;
      if (this.checked) {
        if (!selectedAdditionalServices.some(s => s.id === id)) {
          selectedAdditionalServices.push({ id, name, price });
        }
      } else {
        selectedAdditionalServices = selectedAdditionalServices.filter(s => s.id !== id);
      }
      updateSelection();
    });
  });
}

function updateFormSelectedServices() {
  const formServices = document.getElementById('form-selected-services');
  let html = '<h4>Выбранные услуги:</h4><div class="selected-items">';
  html += `<div class="selected-item">Пакет: ${getPackageName(currentPackage)} <span>${document.getElementById('total-price').textContent}₽</span></div>`;
  if (selectedCharacters.length > 0) {
    selectedCharacters.forEach(char => {
      html += `<div class="selected-item">${char.name} <span>${char.price}₽</span></div>`;
    });
  }
  if (selectedShows.length > 0) {
    selectedShows.forEach(show => {
      html += `<div class="selected-item">${show.name} <span>${show.price}₽</span></div>`;
    });
  }
  if (selectedMasterClasses.length > 0) {
    selectedMasterClasses.forEach(master => {
      html += `<div class="selected-item">${master.name} <span>${master.price}₽</span></div>`;
    });
  }
  if (selectedProducts.length > 0) {
    selectedProducts.forEach(prod => {
      html += `<div class="selected-item">${prod.name} <span>${prod.price}₽</span></div>`;
    });
  }
  if (selectedAdditionalServices.length > 0) {
    selectedAdditionalServices.forEach(serv => {
      html += `<div class="selected-item">${serv.name} <span>${serv.price}₽</span></div>`;
    });
  }
  html += '</div>';
  formServices.innerHTML = html;
}

function updateSelectedServicesPreview() {
  const preview = document.getElementById('selected-services');
  let html = '<h4>Выбранные услуги:</h4><div class="selected-items-preview">';
  
  html += `<div class="selected-item-card">
    <div class="selected-item-img" style="background: rgba(214, 196, 155, 0.2); display: flex; align-items: center; justify-content: center;">
      <span style="font-size: 2rem;">📦</span>
    </div>
    <div class="selected-item-name">${getPackageName(currentPackage)}</div>
    <div class="remove-item-btn" onclick="removePackage()">×</div>
  </div>`;
  
  selectedCharacters.forEach(char => {
    const character = charactersData.find(c => c.name === char.name);
    html += `<div class="selected-item-card">
      <img src="${character.image}" alt="${char.name}" class="selected-item-img">
      <div class="selected-item-name">${char.name}</div>
      <div class="remove-item-btn" onclick="removeSelectedItem('character', '${char.name}')">×</div>
    </div>`;
  });
  
  selectedShows.forEach(show => {
    const showData = showsData.find(s => s.name === show.name);
    html += `<div class="selected-item-card">
      <img src="${showData.image}" alt="${show.name}" class="selected-item-img">
      <div class="selected-item-name">${show.name}</div>
      <div class="remove-item-btn" onclick="removeSelectedItem('show', '${show.name}')">×</div>
    </div>`;
  });
  
  selectedMasterClasses.forEach(master => {
    const masterData = masterClassesData.find(m => m.name === master.name);
    html += `<div class="selected-item-card">
      <div class="selected-item-img" style="background: rgba(214, 196, 155, 0.2); display: flex; align-items: center; justify-content: center; font-size: 2rem;">
        ${masterData.icon}
      </div>
      <div class="selected-item-name">${master.name}</div>
      <div class="remove-item-btn" onclick="removeSelectedItem('master', '${master.name}')">×</div>
    </div>`;
  });
  
  selectedProducts.forEach(prod => {
    html += `<div class="selected-item-card">
      <div class="selected-item-img" style="background: rgba(214, 196, 155, 0.2); display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 2rem;">🎁</span>
      </div>
      <div class="selected-item-name">${prod.name}</div>
      <div class="remove-item-btn" onclick="removeSelectedItem('product', '${prod.id}')">×</div>
    </div>`;
  });
  
  selectedAdditionalServices.forEach(serv => {
    html += `<div class="selected-item-card">
      <div class="selected-item-img" style="background: rgba(214, 196, 155, 0.2); display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 2rem;">🍰</span>
      </div>
      <div class="selected-item-name">${serv.name}</div>
      <div class="remove-item-btn" onclick="removeSelectedItem('additional', '${serv.id}')">×</div>
    </div>`;
  });
  
  html += '</div>';
  preview.innerHTML = html;
  
  window.removePackage = function() {
    currentPackage = null;
    selectedCharacters = [];
    selectedShows = [];
    selectedMasterClasses = [];
    selectedProducts = [];
    selectedAdditionalServices = [];
    document.getElementById('package-selection').classList.remove('active');
    document.querySelectorAll('.additional-service').forEach(chk => chk.checked = false);
    updateSelection();
  };
  
  window.removeSelectedItem = function(type, name) {
    if (type === 'character') {
      const index = selectedCharacters.findIndex(c => c.name === name);
      if (index !== -1) selectedCharacters.splice(index, 1);
    } else if (type === 'show') {
      const index = selectedShows.findIndex(s => s.name === name);
      if (index !== -1) selectedShows.splice(index, 1);
    } else if (type === 'master') {
      const index = selectedMasterClasses.findIndex(m => m.name === name);
      if (index !== -1) selectedMasterClasses.splice(index, 1);
    } else if (type === 'product') {
      selectedProducts = selectedProducts.filter(p => p.id !== name);
    } else if (type === 'additional') {
      selectedAdditionalServices = selectedAdditionalServices.filter(s => s.id !== name);
      document.querySelectorAll(`.additional-service[data-type="${name}"]`).forEach(chk => chk.checked = false);
    }
    updateSelection();
  };
}

function updateTotalPrice() {
  const totalPriceElement = document.getElementById('total-price');
  let total = 0;
  if (currentPackage === 'custom') {
    selectedCharacters.forEach(c => total += c.price);
    selectedShows.forEach(s => total += s.price);
    selectedMasterClasses.forEach(m => total += m.price);
  } else {
    total = basePrice;
  }
  selectedProducts.forEach(p => total += p.price);
  selectedAdditionalServices.forEach(s => total += s.price);
  totalPriceElement.textContent = total.toLocaleString('ru-RU');
}

function getPackageName(packageType) {
  switch(packageType) {
    case 'basic': return 'Базовый';
    case 'standard': return 'Стандарт';
    case 'premium': return 'Премиум';
    case 'custom': return 'Кастомный';
    default: return '';
  }
}

function initGalleryButtons() {
  document.addEventListener('click', function(e) {
    const viewBtn = e.target.closest('.view-btn');
    if (viewBtn) {
      const videoUrl = viewBtn.dataset.video;
      const title = viewBtn.dataset.name;
      if (videoUrl) {
        showVideoModal(videoUrl, title);
      }
    }
  });
}

function initSelectionHandlers() {
  document.querySelectorAll('.character-card, .show-card, .master-card').forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.closest('.view-btn')) return;
      
      const type = this.classList.contains('character-card') ? 'character' : 
                  this.classList.contains('show-card') ? 'show' : 'master';
      const name = this.dataset.name;
      
      let data, selectedArray, max;
      
      switch(type) {
        case 'character':
          data = charactersData.find(c => c.name === name);
          selectedArray = selectedCharacters;
          max = maxCharacters;
          break;
        case 'show':
          data = showsData.find(s => s.name === name);
          selectedArray = selectedShows;
          max = maxShows;
          break;
        case 'master':
          data = masterClassesData.find(m => m.name === name);
          selectedArray = selectedMasterClasses;
          max = maxMasterClasses;
          break;
      }
      
      const index = selectedArray.findIndex(item => item.name === name);
      
      if (index === -1) {
        if (selectedArray.length < max || currentPackage === 'custom') {
          selectedArray.push({ name, price: data.price });
          this.classList.add('selected');
          showNotification(`${type === 'character' ? 'Персонаж' : type === 'show' ? 'Шоу' : 'Мастер-класс'} "${name}" добавлен`, 'success');
        } else {
          showNotification(`Можно выбрать не более ${max} ${type === 'character' ? 'персонажей' : type === 'show' ? 'шоу-программ' : 'мастер-классов'}`, 'error');
        }
      } else {
        selectedArray.splice(index, 1);
        this.classList.remove('selected');
      }
      
      updateSelection();
    });
  });
}

function initCarouselNavigation() {
  document.getElementById('characters-prev').addEventListener('click', () => scrollCarousel('characters-slider', -220));
  document.getElementById('characters-next').addEventListener('click', () => scrollCarousel('characters-slider', 220));
  document.getElementById('shows-prev').addEventListener('click', () => scrollCarousel('shows-slider', -220));
  document.getElementById('shows-next').addEventListener('click', () => scrollCarousel('shows-slider', 220));
  document.getElementById('master-prev').addEventListener('click', () => scrollCarousel('master-slider', -220));
  document.getElementById('master-next').addEventListener('click', () => scrollCarousel('master-slider', 220));
}

function showCaseModal(index) {
  // Реализация показа модального окна с кейсами
  console.log('Показать кейс', index);
}

function showProductModal(index) {
  // Реализация показа модального окна с продуктами
  console.log('Показать продукт', index);
}

// Чекбоксы "Тортик", "Пиньята", "Фотограф" уже добавляются в пакет услуг через selectedAdditionalServices