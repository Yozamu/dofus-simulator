import fs from 'fs/promises';
import path from 'path';

import classes from '../data/classes.json';
import equipment from '../data/equipment.json';
import monsters from '../data/monsters.json';
import monsterSpells from '../data/monsterSpells.json';
import pets from '../data/pets.json';
import sets from '../data/sets.json';
import spells from '../data/spells.json';
import todos from '../data/todos.json';
import weapons from '../data/weapons.json';

const DATA_FOLDER = 'data';

const dataFiles = {
  classes,
  equipment,
  monsters,
  monsterSpells,
  pets,
  sets,
  spells,
  todos,
  weapons,
};

// Helpers

const getDataFilePath = (filename) => path.join(process.cwd(), DATA_FOLDER, filename);

const getJsonData = async (filename) => {
  const fileContent = await fs.readFile(getDataFilePath(filename));
  return JSON.parse(fileContent);
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

export const getFilteredData = (type, filters = {}, size = 24, offset = 0) => {
  const json = dataFiles[type];
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

export const getSpecificData = (type, id) => {
  const json = dataFiles[type];
  let data = extractMeaningfulData(json);
  return data.find((element) => +element.ankamaId === +id);
};

export const getSpellsData = (classe) => {
  return spells.data[classe];
};

export const getMonsterSpellsData = (monsterId) => {
  return monsterSpells.data[monsterId];
};

export const getTodos = () => {
  return todos.data;
};
