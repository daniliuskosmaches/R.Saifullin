import { initMobileMenu, initSmoothScroll, initIntersectionObserver, initPhoneMask } from './ui/navigation.js';
import { initModalClose } from './ui/modals.js';
import { initSliders } from './ui/sliders.js';
import { initSelectionHandlers } from './selection/handlers.js';
import { initPackageSelection } from './selection/packages.js';
import { initFormValidation, initOrderButton } from './form/validation.js';
import { initCharacterSearch } from './features/search.js';
import { initReviewPhotos } from './features/gallery.js';
import { initPagination } from './features/paginated-sections.js';

document.addEventListener('DOMContentLoaded', () => {
  // UI
  initMobileMenu();
  initSmoothScroll();
  initModalClose();
  initIntersectionObserver();
  initPhoneMask();

  // Бизнес-логика
  initPackageSelection();
  initPagination(); // Пагинация для персонажей, шоу, мастер-классов
  initSliders();
  initSelectionHandlers();

  // Формы
  initOrderButton();
  initFormValidation();

  // Доп. фичи
  initCharacterSearch();
  initReviewPhotos(); // Галерея «Наши работы»
});
