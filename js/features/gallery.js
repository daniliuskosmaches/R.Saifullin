import { orbitItems } from '../data/data.js';

const INITIAL_COUNT = 3; // показываем сначала 3
const LOAD_STEP = 3; // всегда добавляем по 3
let visiblePhotosCount = INITIAL_COUNT;
let lastAddedCount = 0;

function renderReviewPhotos() {
  const reviewsGrid = document.getElementById('reviews-slider');
  if (!reviewsGrid) return;

  // Настраиваем grid layout: 3 колонки на десктопе, адаптивно на мобильных
  reviewsGrid.style.display = 'grid';
  reviewsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
  reviewsGrid.style.gap = '20px';
  reviewsGrid.style.maxWidth = '1200px';
  reviewsGrid.style.margin = '0 auto';

  reviewsGrid.innerHTML = '';

  const photosToShow = orbitItems.slice(0, visiblePhotosCount);

  photosToShow.forEach((item, index) => {
    const photoCard = document.createElement('div');
    photoCard.className = 'review-photo-card';

    // помечаем "новые" только те, что были добавлены последними
    if (lastAddedCount > 0 && index >= Math.max(0, visiblePhotosCount - lastAddedCount)) {
      photoCard.classList.add('new');
    }

    photoCard.innerHTML = `
      <img src="${item.photo}" alt="${item.title || ''}" class="review-photo" loading="lazy">
      <div class="photo-overlay">
        <div class="photo-info">
          <div class="photo-title">${item.title || ''}</div>
          <div class="photo-date">${item.date || ''}</div>
        </div>
      </div>
    `;
    reviewsGrid.appendChild(photoCard);
  });

  const loadMoreBtn = document.getElementById('load-more-reviews');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = visiblePhotosCount >= orbitItems.length ? 'none' : 'inline-flex';
  }
}

function loadMorePhotos() {
  const newVisible = Math.min(visiblePhotosCount + LOAD_STEP, orbitItems.length);
  lastAddedCount = newVisible - visiblePhotosCount;
  visiblePhotosCount = newVisible;

  renderReviewPhotos();

  // Плавная прокрутка к первым новым фото
  setTimeout(() => {
    const newPhotos = document.querySelectorAll('.review-photo-card.new');
    if (newPhotos.length > 0) {
      newPhotos[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 100);
}

function initReviewPhotoModalOpen() {
  const reviewsGrid = document.getElementById('reviews-slider');
  if (!reviewsGrid) return;

  reviewsGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.review-photo-card');
    if (!card) return;
    const img = card.querySelector('img');
    if (!img) return;

    const modal = document.getElementById('review-media-modal');
    const body = document.getElementById('review-media-modal-body');
    if (!modal || !body) return;

    const src = img.getAttribute('src');
    const isVideo = src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov');
    body.innerHTML = isVideo
      ? `<video src="${src}" controls autoplay style="max-width:100%;max-height:80vh;"></video>`
      : `<img src="${src}" alt="" style="max-width:100%;max-height:80vh;">`;
    modal.classList.add('active');
  });
}

export function initReviewPhotos() {
  // Скрываем стрелки, если они есть в верстке (уже убраны в HTML, но на всякий случай)
  const prev = document.getElementById('reviews-prev');
  const next = document.getElementById('reviews-next');
  if (prev) prev.style.display = 'none';
  if (next) next.style.display = 'none';

  // Первичный рендер
  visiblePhotosCount = INITIAL_COUNT;
  lastAddedCount = 0;
  renderReviewPhotos();

  // Кнопка "Показать ещё"
  const loadMoreBtn = document.getElementById('load-more-reviews');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMorePhotos);
  }

  initReviewPhotoModalOpen();
}
