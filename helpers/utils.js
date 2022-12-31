export const getTypeFilename = (type) => {
  switch (type) {
    case 'Familier':
      return 'pets';
    case 'Arme':
      return 'weapons';
    default:
      return 'equipment';
  }
};

export const setLocalStorageStuffItem = (item, category) => {
  const stuff = JSON.parse(localStorage.getItem('stuff')) || {};
  let [key, value] = [item.type, item.ankamaId];
  if (category === 'pets') key = 'Familier';
  else if (category === 'weapons') key = 'Arme';
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
