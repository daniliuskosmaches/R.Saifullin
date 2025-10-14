import { state } from '../state/appState.js';
import { API_BASE_URL } from '../config/constants.js';
import { showNotification } from '../ui/notifications.js';
import { updateFormSelectedServices, getPackageName } from '../selection/calculator.js';
import { resetState } from '../state/appState.js';
import { updateSelection } from '../selection/calculator.js';

export function initFormValidation() {
  const form = document.getElementById('consultationForm');
  if (!form) return;

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
    } else name.style.borderColor = '';

    if (!phone.value.match(/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/)) {
      phone.style.borderColor = 'red';
      isValid = false;
    } else phone.style.borderColor = '';

    if (!eventDate.value) {
      eventDate.style.borderColor = 'red';
      isValid = false;
    } else eventDate.style.borderColor = '';

    if (!childBirthday.value) {
      childBirthday.style.borderColor = 'red';
      isValid = false;
    } else childBirthday.style.borderColor = '';

    if (isValid && state.currentPackage) {
      try {
        const totalPriceEl = document.getElementById('total-price');
        const formData = {
          name: name.value,
          phone: phone.value,
          email: '',
          eventDate: eventDate.value,
          childBirthday: childBirthday.value,
          packageType: state.currentPackage,
          characters: state.selectedCharacters,
          shows: state.selectedShows,
          masterClasses: state.selectedMasterClasses,
          products: state.selectedProducts,
          additionalServices: state.selectedAdditionalServices,
          total: totalPriceEl ? totalPriceEl.textContent : '0'
        };

        const response = await fetch(`${API_BASE_URL}/bookings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Ошибка сервера');
        }

        await response.json().catch(() => ({}));
        showNotification('Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
        form.reset();
        resetFormSelection();
      } catch (error) {
        console.error('Ошибка:', error);
        showNotification(error.message || 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.', 'error');
      }
    } else if (!state.currentPackage) {
      showNotification('Пожалуйста, выберите пакет услуг', 'error');
    } else {
      showNotification('Пожалуйста, заполните все обязательные поля корректно', 'error');
    }
  });
}

function resetFormSelection() {
  resetState();
  const packageSelection = document.getElementById('package-selection');
  if (packageSelection) packageSelection.classList.remove('active');

  const formServices = document.getElementById('form-selected-services');
  if (formServices) formServices.innerHTML = '';

  document.querySelectorAll('.character-card, .show-card, .master-card').forEach(card => {
    card.classList.remove('selected');
  });

  updateSelection();
}

// Кнопка "Оформить" — заполнение выбранных услуг и скролл к форме
export function initOrderButton() {
  const orderBtn = document.getElementById('order-btn');
  if (!orderBtn) return;

  orderBtn.addEventListener('click', () => {
    updateFormSelectedServices();
    const consultForm = document.querySelector('#consultForm') || document.querySelector('#consultationForm');
    if (consultForm) {
      consultForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}
