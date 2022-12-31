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

export const getItemSlotCategories = (type) => {
  switch (type) {
    case 'Anneaux':
      return 'Anneau';
    case 'Trophées':
      return 'Trophée,Dofus';
    case 'Arme':
    case 'Familier':
      return null;
    default:
      return type;
  }
};

export const normalizeStatName = (stat) => stat.replace(/[% ]/g, '').toLowerCase();
