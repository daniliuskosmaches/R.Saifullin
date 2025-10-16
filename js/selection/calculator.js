import { state, resetState } from '../state/appState.js';
import { CUSTOM_PRICES } from '../config/constants.js';
import { charactersData, showsData, masterClassesData } from '../data/data.js';

export function getPackageName(packageType) {
  const names = {
    basic: 'Базовый',
    standard: 'Стандарт',
    premium: 'Премиум',
    custom: 'Кастомный'
  };
  return names[packageType] || '';
}

export function updateSelection() {
  const charsCountEl = document.getElementById('characters-count');
  const showsCountEl = document.getElementById('shows-count');
  const masterCountEl = document.getElementById('master-count');
  if (charsCountEl) charsCountEl.textContent = state.selectedCharacters.length;
  if (showsCountEl) showsCountEl.textContent = state.selectedShows.length;
  if (masterCountEl) masterCountEl.textContent = state.selectedMasterClasses.length;

  updateSelectedServicesPreview();
  updateTotalPrice();
}

export function updateSelectedServicesPreview() {
  const preview = document.getElementById('selected-services');
  if (!preview) return;

  const currentPackage = state.currentPackage;
  let html = '<h4>Выбранные услуги:</h4><div class="selected-items-preview">';

  if (currentPackage) {
    html += `<div class="selected-item-card">
      <div class="selected-item-img" style="background: rgba(214, 196, 155, 0.2); display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 2rem;">📦</span>
      </div>
      <div class="selected-item-name">${getPackageName(currentPackage)}</div>
      <div class="remove-item-btn" data-remove-type="package">×</div>
    </div>`;
  }

  state.selectedCharacters.forEach(char => {
    const c = charactersData.find(x => x.name === char.name);
    html += `<div class="selected-item-card">
      <img src="${c ? c.image : ''}" alt="${char.name}" class="selected-item-img">
      <div class="selected-item-name">${char.name}</div>
      ${currentPackage === 'custom' ? `<div class="price-tag">${CUSTOM_PRICES.character}₽</div>` : ''}
      <div class="remove-item-btn" data-remove-type="character" data-remove-id="${char.name}">×</div>
    </div>`;
  });

  state.selectedShows.forEach(show => {
    const s = showsData.find(x => x.name === show.name);
    html += `<div class="selected-item-card">
      <img src="${s ? s.image : ''}" alt="${show.name}" class="selected-item-img">
      <div class="selected-item-name">${show.name}</div>
      ${currentPackage === 'custom' ? `<div class="price-tag">${CUSTOM_PRICES.show}₽</div>` : ''}
      <div class="remove-item-btn" data-remove-type="show" data-remove-id="${show.name}">×</div>
    </div>`;
  });

  state.selectedMasterClasses.forEach(master => {
    const m = masterClassesData.find(x => x.name === master.name);
    html += `<div class="selected-item-card">
      <div class="selected-item-img" style="background: rgba(214, 196, 155, 0.2); display: flex; align-items: center; justify-content: center; font-size: 2rem;">
        ${m ? m.icon : '🧰'}
      </div>
      <div class="selected-item-name">${master.name}</div>
      ${currentPackage === 'custom' ? `<div class="price-tag">${CUSTOM_PRICES.master}₽</div>` : ''}
      <div class="remove-item-btn" data-remove-type="master" data-remove-id="${master.name}">×</div>
    </div>`;
  });

  state.selectedProducts.forEach(prod => {
    const price = currentPackage === 'custom'
      ? (prod.id === 'photo' ? CUSTOM_PRICES.products.photo
      : prod.id === 'decor' ? CUSTOM_PRICES.products.decor
      : prod.id === 'pinata' ? CUSTOM_PRICES.products.pinata : prod.price)
      : prod.price;

    html += `<div class="selected-item-card">
      <div class="selected-item-img" style="background: rgba(214, 196, 155, 0.2); display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 2rem;">🎁</span>
      </div>
      <div class="selected-item-name">${prod.name}</div>
      ${currentPackage === 'custom' ? `<div class="price-tag">${price}₽</div>` : ''}
      <div class="remove-item-btn" data-remove-type="product" data-remove-id="${prod.id}">×</div>
    </div>`;
  });

  state.selectedAdditionalServices.forEach(serv => {
    const price = currentPackage === 'custom'
      ? (serv.id === 'photographer' ? CUSTOM_PRICES.products.photo
      : serv.id === 'pinata' ? CUSTOM_PRICES.products.pinata
      : serv.id === 'cake' ? 0 : serv.price)
      : serv.price;

    html += `<div class="selected-item-card">
      <div class="selected-item-img" style="background: rgba(214, 196, 155, 0.2); display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 2rem;">🍰</span>
      </div>
      <div class="selected-item-name">${serv.name}</div>
      ${currentPackage === 'custom' ? `<div class="price-tag">${price}₽</div>` : ''}
      <div class="remove-item-btn" data-remove-type="additional" data-remove-id="${serv.id}">×</div>
    </div>`;
  });

  html += '</div>';
  preview.innerHTML = html;

  // Обработчики удаления в превью
  preview.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-remove-type');
      const id = btn.getAttribute('data-remove-id');
      if (type === 'package') {
        resetState();
        const pkgSel = document.getElementById('package-selection');
        if (pkgSel) pkgSel.classList.remove('active');
        document.querySelectorAll('.additional-service').forEach(chk => { chk.checked = false; });
      } else {
        window.removeSelectedItem && window.removeSelectedItem(type, id);
      }
    });
  });
}

export function updateTotalPrice() {
  const el = document.getElementById('total-price');
  if (!el) return;

  let total = 0;
  if (state.currentPackage === 'custom') {
    total += state.selectedCharacters.length * CUSTOM_PRICES.character;
    total += state.selectedShows.length * CUSTOM_PRICES.show;
    total += state.selectedMasterClasses.length * CUSTOM_PRICES.master;
    state.selectedProducts.forEach(prod => {
      if (prod.id === 'photo') total += CUSTOM_PRICES.products.photo;
      else if (prod.id === 'decor') total += CUSTOM_PRICES.products.decor;
      else if (prod.id === 'pinata') total += CUSTOM_PRICES.products.pinata;
    });
    state.selectedAdditionalServices.forEach(serv => {
      if (serv.id === 'photographer') total += CUSTOM_PRICES.products.photo;
      else if (serv.id === 'pinata') total += CUSTOM_PRICES.products.pinata;
      else if (serv.id === 'cake') total += 0;
    });
  } else {
    total = state.basePrice;
    state.selectedProducts.forEach(p => total += p.price || 0);
    state.selectedAdditionalServices.forEach(s => total += s.price || 0);
  }

  el.textContent = total.toLocaleString('ru-RU');
}

// Формирование блока выбранных услуг для формы
export function updateFormSelectedServices() {
  const formServices = document.getElementById('form-selected-services');
  if (!formServices) return;

  let html = '<h4>Выбранные услуги:</h4><div class="selected-items">';
  const totalText = (document.getElementById('total-price')?.textContent || '0');

  html += `<div class="selected-item">Пакет: ${getPackageName(state.currentPackage)} <span>${totalText}₽</span></div>`;

  if (state.selectedCharacters.length > 0) {
    state.selectedCharacters.forEach(char => {
      if (state.currentPackage === 'custom') {
        html += `<div class="selected-item">${char.name} <span>${CUSTOM_PRICES.character}₽</span></div>`;
      } else {
        html += `<div class="selected-item">${char.name}</div>`;
      }
    });
  }
  if (state.selectedShows.length > 0) {
    state.selectedShows.forEach(show => {
      if (state.currentPackage === 'custom') {
        html += `<div class="selected-item">${show.name} <span>${CUSTOM_PRICES.show}₽</span></div>`;
      } else {
        html += `<div class="selected-item">${show.name}</div>`;
      }
    });
  }
  if (state.selectedMasterClasses.length > 0) {
    state.selectedMasterClasses.forEach(master => {
      if (state.currentPackage === 'custom') {
        html += `<div class="selected-item">${master.name} <span>${CUSTOM_PRICES.master}₽</span></div>`;
      } else {
        html += `<div class="selected-item">${master.name}</div>`;
      }
    });
  }
  if (state.selectedProducts.length > 0) {
    state.selectedProducts.forEach(prod => {
      let price = prod.price;
      if (state.currentPackage === 'custom') {
        if (prod.id === 'photo') price = CUSTOM_PRICES.products.photo;
        else if (prod.id === 'decor') price = CUSTOM_PRICES.products.decor;
        else if (prod.id === 'pinata') price = CUSTOM_PRICES.products.pinata;
      }
      html += `<div class="selected-item">${prod.name} <span>${price}₽</span></div>`;
    });
  }
  if (state.selectedAdditionalServices.length > 0) {
    state.selectedAdditionalServices.forEach(serv => {
      let price = serv.price;
      if (state.currentPackage === 'custom') {
        if (serv.id === 'photographer') price = CUSTOM_PRICES.products.photo;
        else if (serv.id === 'pinata') price = CUSTOM_PRICES.products.pinata;
        else if (serv.id === 'cake') price = 0;
      }
      html += `<div class="selected-item">${serv.name} <span>${price}₽</span></div>`;
    });
  }

  html += '</div>';
  formServices.innerHTML = html;
}
