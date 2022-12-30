import fs from 'fs/promises';
import path from 'path';
import { CLASSES, EQUIPMENT, MONSTERS, MOUNTS, PETS, SETS, WEAPONS } from './constants';

const DOFAPI_URL = 'https://fr.dofus.dofapi.fr';
const DATA_FOLDER = 'data';
const IMAGES_FOLDER = 'public/images';
// Data filenames
const EQUIPMENT_FILE = `${EQUIPMENT}.json`;
const CLASSES_FILE = `${CLASSES}.json`;
const MONSTERS_FILE = `${MONSTERS}.json`;
const WEAPONS_FILE = `${WEAPONS}.json`;
const SETS_FILE = `${SETS}.json`;
const PETS_FILE = `${PETS}.json`;
const MOUNTS_FILE = `${MOUNTS}.json`;
// API names for DofAPI
const EQUIPMENT_API = 'equipments';
const CLASSES_API = 'classes';
const MONSTERS_API = 'monsters';
const WEAPONS_API = 'weapons';
const SETS_API = 'sets';
const PETS_API = 'pets';
const MOUNTS_API = 'mounts';

// Helpers

const fetchFromDofApi = async (resource) => {
  const response = await fetch(`${DOFAPI_URL}/${resource}`);
  return await response.json();
};

const getDataFilePath = (filename) => path.join(process.cwd(), DATA_FOLDER, filename);

const getJsonData = async (filename) => {
  const fileContent = await fs.readFile(getDataFilePath(filename));
  return JSON.parse(fileContent);
};

const updateImages = (data, filename) => {
  const images = data.map((element) => ({
    id: element.ankamaId,
    url: element.imgUrl || element.maleImg,
  }));
  const folderPath = path.join(process.cwd(), IMAGES_FOLDER, filename);
  images.forEach(async (image) => {
    const imagePath = `${folderPath}/${image.id}.png`;
    const imageResponse = await fetch(image.url);
    const imageData = await imageResponse.arrayBuffer();
    fs.writeFile(imagePath, Buffer.from(imageData));
  });
};

const updateData = async (filename, api) => {
  const rawData = await fetchFromDofApi(api);
  updateImages(rawData, filename.split('.')[0]);
  const data = { data: rawData };
  const filePath = getDataFilePath(filename);
  fs.writeFile(filePath, JSON.stringify(data));
};

// Getter

const extractMeaningfulData = (json) =>
  json.data.map((element) => {
    const { imgUrl, url, recipe, description, ...rest } = element;
    return rest;
  });

const isItemWithinInterval = (item, statRange) => {
  const itemRange = { ...item, max: item.max || item.min };
  if (!statRange.max) statRange.max = 9999;
  if (!statRange.min) statRange.min = -9999;
  const isItemStatHighEnough = statRange.min && itemRange.max >= statRange.min;
  const isItemStatLowEnough = statRange.max && itemRange.min <= statRange.max;
  return isItemStatHighEnough && isItemStatLowEnough;
};

const areStatsWithinValues = (itemStats = [], statsArray) => {
  for (let stat of statsArray) {
    let found = false;
    for (let itemStat of itemStats) {
      const itemStatName = Object.keys(itemStat)[0];
      const statName = Object.keys(stat)[0];
      if (itemStatName.toLowerCase() !== statName) {
        continue;
      }
      found = true;
      if (!isItemWithinInterval(itemStat[itemStatName], stat[statName])) {
        return false;
      }
    }
    if (!found) {
      return false;
    }
  }
  return true;
};

const applyFilters = (data, filters) => {
  Object.entries(filters).forEach(([key, value]) => {
    if (typeof value === 'string') {
      data = data.filter((element) => element[key].toLowerCase().includes(value));
    } else if (key === 'statistics') {
      data = data.filter((element) => areStatsWithinValues(element[key], value));
    } else if (Array.isArray(value) && value.length > 0) {
      data = data.filter((element) => value.some((condition) => element[key] === condition));
    } else {
      // Simple range filter
      value.min && (data = data.filter((e) => e[key] >= value.min));
      value.max && (data = data.filter((e) => e[key] <= value.max));
    }
  });
  return data;
};

export const getFilteredData = async (type, filters = {}, size = 24, offset = 0) => {
  const json = await getJsonData(`${type}.json`);
  let data = extractMeaningfulData(json);
  data = applyFilters(data, filters);
  data.sort((a, b) => {
    if (a.level !== b.level) return b.level - a.level;
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });
  const count = data.length;
  data = data.slice(offset, +offset + size);
  return { data, count };
};

export const getItemData = async (type, id) => {
  const json = await getJsonData(`${type}.json`);
  let data = extractMeaningfulData(json);
  return data.find((element) => +element.ankamaId === +id);
};

// Updaters

export const updateEquipment = async () => await updateData(EQUIPMENT_FILE, EQUIPMENT_API);

export const updateClasses = async () => await updateData(CLASSES_FILE, CLASSES_API);

export const updateMonsters = async () => await updateData(MONSTERS_FILE, MONSTERS_API);

export const updateWeapons = async () => await updateData(WEAPONS_FILE, WEAPONS_API);

export const updateSets = async () => await updateData(SETS_FILE, SETS_API);

export const updatePets = async () => await updateData(PETS_FILE, PETS_API);

export const updateMounts = async () => await updateData(MOUNTS_FILE, MOUNTS_API);

export const updateAll = async () => {
  await updateEquipment();
  await updateClasses();
  await updateMonsters();
  await updateWeapons();
  await updateSets();
  await updatePets();
  await updateMounts();
};
