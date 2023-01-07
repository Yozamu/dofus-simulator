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
    case 'Cape':
      return 'Cape,Sac à dos';
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

export const getStatFromElement = (element) => {
  switch (element) {
    case 'terre':
      return 'force';
    case 'feu':
      return 'intelligence';
    case 'eau':
      return 'chance';
    case 'air':
      return 'agilité';
    default:
      return element;
  }
};

export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getSpellActionTypeName = (type) => {
  switch (type) {
    case 'damage':
      return 'dommages';
    case 'steal':
      return 'vol';
    case 'heal':
      return 'soins';
    default:
      return type;
  }
};

export const getSpellActionTypeFromName = (type) => {
  switch (type) {
    case 'dommages':
      return 'damage';
    case 'vol':
      return 'steal';
    case 'soins':
      return 'heal';
    default:
      return type;
  }
};

export const getFormattedStatName = (rawStatName) => {
  switch (rawStatName) {
    case 'pa':
      return 'PA';
    case 'pm':
      return 'PM';
    case rawStatName.match(/%résistance[A-z]+/)?.input:
      return '% Résistance ' + rawStatName.split('résistance')[1];
    case rawStatName.match(/%dommages[A-z]+/)?.input:
      return '% Dommages ' + rawStatName.split('dommages')[1];
    case rawStatName.match(/%[A-z]*/)?.input:
      return '% ' + rawStatName[1].toUpperCase() + rawStatName.slice(2);
    default:
      return rawStatName[0].toUpperCase() + rawStatName.slice(1);
  }
};
