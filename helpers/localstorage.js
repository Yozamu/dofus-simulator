export const setLocalStorageStuffItem = (item, category) => {
  const stuff = JSON.parse(localStorage.getItem('stuff')) || {};
  let [key, value] = [item.type, item.ankamaId];
  if (category === 'pets') key = 'Familier';
  else if (category === 'weapons') key = 'Arme';
  else if (item.type === 'Sac à dos') key = 'Cape';
  else if (item.type === 'Anneau') {
    const current = stuff['Anneaux'] || [];
    const rings = current.length > 1 ? current.slice(1) : current;
    key = 'Anneaux';
    value = rings.concat(value);
  } else if (item.type === 'Dofus' || item.type === 'Trophée') {
    const current = stuff['Trophées'] || [];
    const trophies = current.length > 5 ? current.slice(1) : current;
    key = 'Trophées';
    value = trophies.concat(value);
  }
  localStorage.setItem('stuff', JSON.stringify({ ...stuff, [key]: value }));
};

export const deleteStuffItemFromLocalStorage = (type, index) => {
  const stuff = JSON.parse(localStorage.getItem('stuff')) || {};
  Array.isArray(stuff[type]) && stuff[type].length > 1 ? stuff[type].splice(index, 1) : delete stuff[type];
  localStorage.setItem('stuff', JSON.stringify({ ...stuff }));
};

export const setLocalStorageStuff = (stuff) => {
  localStorage.removeItem('stuff');
  let category = 'equipment';
  for (let [slotType, items] of Object.entries(stuff)) {
    for (let item of items) {
      switch (slotType) {
        case 'Arme':
          category = 'weapons';
          break;
        case 'Familier':
          category = 'pets';
          break;
        default:
          category = 'equipment';
          break;
      }
      setLocalStorageStuffItem(item, category);
    }
  }
};

export const setLocalStorageCharacteristics = (key, value) => {
  const character = JSON.parse(localStorage.getItem('characteristics')) || {};
  localStorage.setItem('characteristics', JSON.stringify({ ...character, [key]: value }));
};

export const setLocalStorageFinalStats = (stats) => {
  localStorage.setItem('stats', stats);
};
