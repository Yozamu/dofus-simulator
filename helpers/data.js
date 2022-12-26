import fs from 'fs/promises';
import path from 'path';

const DATA_FOLDER = 'data';
// Data filenames
const EQUIPMENT_FILE = 'equipment.json';
const CLASSES_FILE = 'classes.json';
const MONSTERS_FILE = 'monsters.json';
// API names for DofAPI
const EQUIPMENT_API = 'equipments';
const CLASSES_API = 'classes';
const MONSTERS_API = 'monsters';

// Helpers

const fetchFromDofApi = async (resource) => {
  const response = await fetch(`https://fr.dofus.dofapi.fr/${resource}`);
  return await response.json();
};

const getDataFilePath = (file) => path.join(process.cwd(), DATA_FOLDER, file);

const getJsonData = async (file) => {
  const fileContent = await fs.readFile(getDataFilePath(file));
  return JSON.parse(fileContent);
};

const updateData = async (file, api) => {
  const rawData = await fetchFromDofApi(api);
  const data = { data: rawData };
  const filePath = getDataFilePath(file);
  fs.writeFile(filePath, JSON.stringify(data));
};

// Getters

export const getEquipmentData = async () => await getJsonData(EQUIPMENT_FILE);

export const getClassesData = async () => await getJsonData(CLASSES_FILE);

export const getMonstersData = async () => await getJsonData(MONSTERS_FILE);

// Updaters

export const updateEquipment = async () => await updateData(EQUIPMENT_FILE, EQUIPMENT_API);

export const updateClasses = async () => await updateData(CLASSES_FILE, CLASSES_API);

export const updateMonsters = async () => await updateData(MONSTERS_FILE, MONSTERS_API);

export const updateAll = async () => {
  await updateEquipment();
  await updateClasses();
  await updateMonsters();
};
