import fs from 'fs/promises';
import path from 'path';

const DOFAPI_URL = 'https://fr.dofus.dofapi.fr';
const DATA_FOLDER = 'data';
const IMAGES_FOLDER = 'public/images';
// Data filenames
const EQUIPMENT_FILE = 'equipment.json';
const CLASSES_FILE = 'classes.json';
const MONSTERS_FILE = 'monsters.json';
const WEAPONS_FILE = 'weapons.json';
const SETS_FILE = 'sets.json';
const PETS_FILE = 'pets.json';
const MOUNTS_FILE = 'mounts.json';
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

// Getters

export const getEquipmentData = async () => await getJsonData(EQUIPMENT_FILE);

export const getClassesData = async () => await getJsonData(CLASSES_FILE);

export const getMonstersData = async () => await getJsonData(MONSTERS_FILE);

export const getWeaponsData = async () => await getJsonData(WEAPONS_FILE);

export const getSetsData = async () => await getJsonData(SETS_FILE);

export const getPetsData = async () => await getJsonData(PETS_FILE);

export const getMountsData = async () => await getJsonData(MOUNTS_FILE);

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
