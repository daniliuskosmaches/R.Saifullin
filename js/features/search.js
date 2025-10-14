import { charactersData } from '../data/data.js';

let characterSearchValue = '';

export function initCharacterSearch() {
  const input = document.getElementById('character-search-input');
  if (!input) return;
  input.value = '';
  input.addEventListener('input', () => {
    characterSearchValue = input.value;
    const event = new CustomEvent('characters:searchChanged');
    window.dispatchEvent(event);
  });
}

export function filterCharacters() {
  if (!characterSearchValue) return charactersData;
  const val = characterSearchValue.trim().toLowerCase();
  return charactersData.filter(c => c.name.toLowerCase().includes(val) || (c.desc && c.desc.toLowerCase().includes(val)));
}
