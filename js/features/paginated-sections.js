// Пагинация для персонажей, шоу и мастер-классов

const ITEMS_PER_PAGE = 6; // показываем по 6 элементов (2 ряда по 3)

export const paginationState = {
  characters: { visible: ITEMS_PER_PAGE, total: 0 },
  shows: { visible: ITEMS_PER_PAGE, total: 0 },
  master: { visible: ITEMS_PER_PAGE, total: 0 }
};

export function initPagination() {
  initLoadMoreButton('characters', 'load-more-characters', 'characters-slider');
  initLoadMoreButton('shows', 'load-more-shows', 'shows-slider');
  initLoadMoreButton('master', 'load-more-master', 'master-slider');
}

function initLoadMoreButton(type, btnId, sliderId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;

  btn.addEventListener('click', () => {
    paginationState[type].visible += ITEMS_PER_PAGE;
    // Триггерим обновление через событие
    window.dispatchEvent(new CustomEvent(`${type}:loadMore`));
  });
}

export function updateLoadMoreButton(type, btnId, totalItems) {
  paginationState[type].total = totalItems;
  const btn = document.getElementById(btnId);
  if (!btn) return;

  if (paginationState[type].visible >= totalItems) {
    btn.style.display = 'none';
  } else {
    btn.style.display = 'inline-flex';
  }
}

export function getVisibleCount(type) {
  return paginationState[type].visible;
}

export function resetPagination(type) {
  paginationState[type].visible = ITEMS_PER_PAGE;
}
