import { charactersData, showsData, masterClassesData } from '../data/data.js';
import { state, addCharacter, removeCharacter, addShow, removeShow, addMasterClass, removeMasterClass, addProduct, removeProduct, addAdditionalService, removeAdditionalService } from '../state/appState.js';
import { showNotification } from '../ui/notifications.js';
import { updateSelection } from './calculator.js';

// Основные обработчики кликов по карточкам в слайдерах
export function initSelectionHandlers() {
  const charSlider = document.getElementById('characters-slider');
  const showsSlider = document.getElementById('shows-slider');
  const masterSlider = document.getElementById('master-slider');

  if (charSlider) {
    charSlider.addEventListener('click', (e) => {
      const card = e.target.closest('.character-card');
      if (!card) return;

      const name = card.dataset.name;
      const item = charactersData.find(c => c.name === name);
      if (!item) return;

      if (card.classList.contains('selected')) {
        removeCharacter(name);
        card.classList.remove('selected');
        showNotification(`Персонаж "${name}" удален`, 'info');
      } else {
        if (addCharacter(item)) {
          card.classList.add('selected');
          showNotification(`Персонаж "${name}" добавлен`, 'success');
        } else {
          showNotification(`Лимит персонажей исчерпан (${state.maxCharacters})`, 'error');
        }
      }
      updateSelection();
    });
  }

  if (showsSlider) {
    showsSlider.addEventListener('click', (e) => {
      if (e.target.closest('.view-btn')) return; // кнопка "Посмотреть"
      const card = e.target.closest('.show-card');
      if (!card) return;

      const name = card.dataset.name;
      const item = showsData.find(s => s.name === name);
      if (!item) return;

      if (card.classList.contains('selected')) {
        removeShow(name);
        card.classList.remove('selected');
        showNotification(`Шоу "${name}" удалено`, 'info');
      } else {
        if (addShow(item)) {
          card.classList.add('selected');
          showNotification(`Шоу "${name}" добавлено`, 'success');
        } else {
          showNotification(`Лимит шоу исчерпан (${state.maxShows})`, 'error');
        }
      }
      updateSelection();
    });
  }

  if (masterSlider) {
    masterSlider.addEventListener('click', (e) => {
      const card = e.target.closest('.master-card');
      if (!card) return;

      const name = card.dataset.name;
      const item = masterClassesData.find(m => m.name === name);
      if (!item) return;

      if (card.classList.contains('selected')) {
        removeMasterClass(name);
        card.classList.remove('selected');
        showNotification(`Мастер-класс "${name}" удален`, 'info');
      } else {
        if (addMasterClass(item)) {
          card.classList.add('selected');
          showNotification(`Мастер-класс "${name}" добавлен`, 'success');
        } else {
          showNotification(`Лимит мастер-классов исчерпан (${state.maxMasterClasses})`, 'error');
        }
      }
      updateSelection();
    });
  }

  // Доп. товары
  document.querySelectorAll('.product-card .add-product-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      if (!card) return;

      const name = card.dataset.name;
      let price = parseInt(card.dataset.price, 10);
      const id = card.dataset.product;

      if (!state.selectedProducts.some(p => p.id === id)) {
        if (addProduct({ id, name, price })) {
          showNotification(`Товар "${name}" добавлен`, 'success');
          updateSelection();
        }
      }
    });
  });

  // Доп. услуги (чекбоксы)
  document.querySelectorAll('.additional-service').forEach(chk => {
    chk.addEventListener('change', () => {
      const name = chk.dataset.name;
      let price = parseInt(chk.dataset.price, 10);
      const id = chk.dataset.type;

      if (chk.checked) {
        if (addAdditionalService({ id, name, price })) {
          updateSelection();
        }
      } else {
        removeAdditionalService(id);
        updateSelection();
      }
    });
  });

  // Удаление из превью (глобально)
  window.removeSelectedItem = function(type, key) {
    if (type === 'character') removeCharacter(key);
    else if (type === 'show') removeShow(key);
    else if (type === 'master') removeMasterClass(key);
    else if (type === 'product') removeProduct(key);
    else if (type === 'additional') removeAdditionalService(key);
    updateSelection();
  };
}
