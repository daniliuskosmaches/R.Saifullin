import { charactersData, showsData, masterClassesData } from '../data/data.js';
import { state } from '../state/appState.js';
import { CUSTOM_PRICES } from '../config/constants.js';
import { filterCharacters } from '../features/search.js';
import { showVideoModal } from './modals.js';
import { getVisibleCount, updateLoadMoreButton, resetPagination } from '../features/paginated-sections.js';

function applyGridLayout(container) {
  container.style.display = 'grid';
  container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
  container.style.gap = '20px';
  container.style.maxWidth = '1200px';
  container.style.margin = '0 auto';
}

export function initSliders() {
  resetPagination('characters');
  resetPagination('shows');
  resetPagination('master');

  initCharactersSlider();
  initShowsSlider();
  initMasterClassesSlider();

  // Ререндер при смене поиска
  window.addEventListener('characters:searchChanged', () => {
    resetPagination('characters');
    initCharactersSlider();
  });

  // Ререндер при "показать ещё"
  window.addEventListener('characters:loadMore', () => initCharactersSlider());
  window.addEventListener('shows:loadMore', () => initShowsSlider());
  window.addEventListener('master:loadMore', () => initMasterClassesSlider());
}

function initCharactersSlider() {
  const charactersSlider = document.getElementById('characters-slider');
  if (!charactersSlider) return;

  applyGridLayout(charactersSlider);
  charactersSlider.innerHTML = '';

  const filtered = filterCharacters();
  const visibleCount = getVisibleCount('characters');
  const toShow = filtered.slice(0, visibleCount);

  if (toShow.length === 0) {
    const wishCard = document.createElement('div');
    wishCard.className = 'wish-character-card';
    wishCard.innerHTML = `<span style="font-size:2.2rem;">🧞‍♂️</span>
      <div>Не нашли нужного персонажа?</div>
      <div style="font-size:0.95rem;opacity:0.7;">Предложить своего</div>`;
    wishCard.addEventListener('click', () => {
      const modal = document.getElementById('wish-character-modal');
      if (modal) modal.classList.add('active');
    });
    charactersSlider.appendChild(wishCard);
    updateLoadMoreButton('characters', 'load-more-characters', 0);
    return;
  }

  toShow.forEach(character => {
    const isSelected = state.selectedCharacters.some(c => c.name === character.name);
    const card = document.createElement('div');
    card.className = `character-card ${isSelected ? 'selected' : ''}`;
    card.dataset.name = character.name;

    const priceHtml = state.currentPackage === 'custom'
      ? `<p class="price-tag">${CUSTOM_PRICES.character}₽</p>` : '';

    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <div class="character-info">
        <h4>${character.name}</h4>
        <p>${character.desc}</p>
        ${priceHtml}
      </div>
    `;
    charactersSlider.appendChild(card);
  });

  updateLoadMoreButton('characters', 'load-more-characters', filtered.length);
}

function initShowsSlider() {
  const showsSlider = document.getElementById('shows-slider');
  if (!showsSlider) return;

  applyGridLayout(showsSlider);
  showsSlider.innerHTML = '';

  const visibleCount = getVisibleCount('shows');
  const toShow = showsData.slice(0, visibleCount);

  toShow.forEach(show => {
    const isSelected = state.selectedShows.some(s => s.name === show.name);
    const card = document.createElement('div');
    card.className = `show-card ${isSelected ? 'selected' : ''}`;
    card.dataset.name = show.name;

    const priceHtml = state.currentPackage === 'custom'
      ? `<p class="price-tag">${CUSTOM_PRICES.show}₽</p>` : '';

    card.innerHTML = `
      <img src="${show.image}" alt="${show.name}">
      <div class="show-info">
        <h4>${show.name}</h4>
        <p>${show.desc}</p>
        ${priceHtml}
        <button class="view-btn" data-video="${show.video}" data-name="${show.name}">Посмотреть</button>
      </div>
    `;

    const viewBtn = card.querySelector('.view-btn');
    if (viewBtn) {
      viewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showVideoModal(show.video, show.name);
      });
    }

    showsSlider.appendChild(card);
  });

  updateLoadMoreButton('shows', 'load-more-shows', showsData.length);
}

function initMasterClassesSlider() {
  const masterSlider = document.getElementById('master-slider');
  if (!masterSlider) return;

  applyGridLayout(masterSlider);
  masterSlider.innerHTML = '';

  const visibleCount = getVisibleCount('master');
  const toShow = masterClassesData.slice(0, visibleCount);

  toShow.forEach(master => {
    const isSelected = state.selectedMasterClasses.some(m => m.name === master.name);
    const card = document.createElement('div');
    card.className = `master-card ${isSelected ? 'selected' : ''}`;
    card.dataset.name = master.name;

    const priceHtml = state.currentPackage === 'custom'
      ? `<p class="price-tag">${CUSTOM_PRICES.master}₽</p>` : '';

    card.innerHTML = `
      <div class="master-icon">${master.icon}</div>
      <h4>${master.name}</h4>
      <p>${master.desc}</p>
      ${priceHtml}
    `;
    masterSlider.appendChild(card);
  });

  updateLoadMoreButton('master', 'load-more-master', masterClassesData.length);
}

export function initCarouselNavigation() {
  // Стрелки удалены из HTML, функция больше не нужна
}
