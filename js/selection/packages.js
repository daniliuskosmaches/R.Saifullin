import { setCurrentPackage, state } from '../state/appState.js';
import { initSliders } from '../ui/sliders.js';
import { updateSelection, getPackageName } from './calculator.js';

export function initPackageSelection() {
  const packageButtons = document.querySelectorAll('.select-package');
  if (!packageButtons || packageButtons.length === 0) return;

  packageButtons.forEach(button => {
    button.addEventListener('click', function() {
      const packageCard = this.closest('.package-card');
      if (!packageCard) return;
      const pkg = packageCard.dataset.package;

      setCurrentPackage(pkg);

      const selectedPackageNameEl = document.getElementById('selected-package-name');
      const maxCharactersEl = document.getElementById('max-characters');
      const maxShowsEl = document.getElementById('max-shows');
      const maxMasterEl = document.getElementById('max-master');

      if (selectedPackageNameEl) selectedPackageNameEl.textContent = getPackageName(pkg);
      if (maxCharactersEl) maxCharactersEl.textContent = state.maxCharacters;
      if (maxShowsEl) maxShowsEl.textContent = state.maxShows;
      if (maxMasterEl) maxMasterEl.textContent = state.maxMasterClasses;

      const packageSelection = document.getElementById('package-selection');
      if (packageSelection) {
        packageSelection.classList.add('active');
      }

      initSliders();
      updateSelection();

      setTimeout(() => {
        if (packageSelection) {
          packageSelection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);
    });
  });
}
