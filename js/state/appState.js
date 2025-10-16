// Глобальное состояние приложения и операции изменения выбора

export const state = {
  currentPackage: null,
  selectedCharacters: [],
  selectedShows: [],
  selectedMasterClasses: [],
  selectedProducts: [],
  selectedAdditionalServices: [],
  maxCharacters: 0,
  maxShows: 0,
  maxMasterClasses: 0,
  basePrice: 0
};

export function setCurrentPackage(packageType) {
  state.currentPackage = packageType;
  switch (packageType) {
    case 'basic':
      state.maxCharacters = 1;
      state.maxShows = 0;
      state.maxMasterClasses = 1;
      state.basePrice = 10000;
      break;
    case 'standard':
      state.maxCharacters = 2;
      state.maxShows = 1;
      state.maxMasterClasses = 0;
      state.basePrice = 35000;
      break;
    case 'premium':
      state.maxCharacters = 3;
      state.maxShows = 2;
      state.maxMasterClasses = 1;
      state.basePrice = 55000;
      break;
    case 'custom':
      state.maxCharacters = 99;
      state.maxShows = 99;
      state.maxMasterClasses = 99;
      state.basePrice = 0;
      break;
    default:
      state.maxCharacters = 0;
      state.maxShows = 0;
      state.maxMasterClasses = 0;
      state.basePrice = 0;
  }
}

export function resetState() {
  state.currentPackage = null;
  state.selectedCharacters = [];
  state.selectedShows = [];
  state.selectedMasterClasses = [];
  state.selectedProducts = [];
  state.selectedAdditionalServices = [];
  state.maxCharacters = 0;
  state.maxShows = 0;
  state.maxMasterClasses = 0;
  state.basePrice = 0;
}

export function addCharacter(character) {
  if (state.selectedCharacters.length < state.maxCharacters || state.currentPackage === 'custom') {
    if (!state.selectedCharacters.some(c => c.name === character.name)) {
      state.selectedCharacters.push({ name: character.name, price: character.price });
      return true;
    }
  }
  return false;
}

export function removeCharacter(name) {
  state.selectedCharacters = state.selectedCharacters.filter(c => c.name !== name);
}

export function addShow(show) {
  if (state.selectedShows.length < state.maxShows || state.currentPackage === 'custom') {
    if (!state.selectedShows.some(s => s.name === show.name)) {
      state.selectedShows.push({ name: show.name, price: show.price });
      return true;
    }
  }
  return false;
}

export function removeShow(name) {
  state.selectedShows = state.selectedShows.filter(s => s.name !== name);
}

export function addMasterClass(master) {
  if (state.selectedMasterClasses.length < state.maxMasterClasses || state.currentPackage === 'custom') {
    if (!state.selectedMasterClasses.some(m => m.name === master.name)) {
      state.selectedMasterClasses.push({ name: master.name, price: master.price });
      return true;
    }
  }
  return false;
}

export function removeMasterClass(name) {
  state.selectedMasterClasses = state.selectedMasterClasses.filter(m => m.name !== name);
}

export function addProduct(product) {
  if (!state.selectedProducts.some(p => p.id === product.id)) {
    state.selectedProducts.push(product);
    return true;
  }
  return false;
}

export function removeProduct(id) {
  state.selectedProducts = state.selectedProducts.filter(p => p.id !== id);
}

export function addAdditionalService(service) {
  if (!state.selectedAdditionalServices.some(s => s.id === service.id)) {
    state.selectedAdditionalServices.push(service);
    return true;
  }
  return false;
}

export function removeAdditionalService(id) {
  state.selectedAdditionalServices = state.selectedAdditionalServices.filter(s => s.id !== id);
}
