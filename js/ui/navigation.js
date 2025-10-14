export function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    this.classList.toggle('active');
  });

  mobileMenu.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    });
  });
}

export function initSmoothScroll() {
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

export function initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => observer.observe(section));

  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (!header) return;
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });
}

export function initPhoneMask() {
  const phoneInput = document.getElementById('phone');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 0) {
      value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
    }
    this.value = value.substring(0, 18);
  });
}

export function scrollCarousel(id, amount) {
  const carousel = document.getElementById(id);
  if (carousel) carousel.scrollBy({ left: amount, behavior: 'smooth' });
}
