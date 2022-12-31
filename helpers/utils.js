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

export const normalizeStatName = (stat) => stat.replace(/[0-9- ]/g, '').toLowerCase();

export const normalizeImageName = (stat) => stat.replace(/[0-9- %()]/g, '').toLowerCase();

export const getStatCorrespondingElement = (stat) => {
  switch (stat) {
    case 'force':
      return 'terre';
    case 'intelligence':
      return 'feu';
    case 'chance':
      return 'eau';
    case 'agilité':
      return 'air';
    default:
      return stat;
  }
};

export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
