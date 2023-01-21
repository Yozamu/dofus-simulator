import fs from 'fs/promises';
import path from 'path';
import clientPromise from './mongodb';

const DATA_FOLDER = 'data';

// Helpers

const getDataFilePath = (filename) => path.join(process.cwd(), DATA_FOLDER, filename);

const getJsonData = async (filename) => {
  const fileContent = await fs.readFile(getDataFilePath(filename));
  return JSON.parse(fileContent);
};

const queryFromDatabase = async (collectionName, filters = {}, limit = 24, offset = 0) => {
  try {
    const client = await clientPromise;
    const db = client.db('dofus');
    const toFind = isNaN(filters) ? filters : { _id: +filters };
    const collection = await db
      .collection(collectionName)
      .find(toFind)
      .sort({ level: -1, name: 1 })
      .skip(offset)
      .limit(limit)
      .toArray();
    const count = await db.collection(collectionName).find(toFind).count();
    return { data: collection, count };
  } catch (e) {
    console.error(e);
  }
};

const buildQueryFilters = (rawFilters) => {
  const queryFilters = {};
  Object.entries(rawFilters).forEach(([key, value]) => {
    if (typeof value === 'string') {
      queryFilters[key] = { $regex: `.*${value}.*`, $options: 'i' };
    } else if (key === 'statistics') {
      //data = data.filter((element) => areStatsWithinValues(element[key], value));
    } else if (Array.isArray(value)) {
      if (value.length < 1) return;
      queryFilters[key] = { $in: value };
    } else {
      // Simple range filter
      if (value && !queryFilters[key]) queryFilters[key] = {};
      if (value.min) queryFilters[key].$gte = +value.min;
      if (value.max) queryFilters[key].$lte = +value.max;
    }
  });
  return queryFilters;
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

export const getFilteredData = async (type, filters = {}, size = 24, offset = 0) => {
  const queryFilters = buildQueryFilters(filters);
  const json = await queryFromDatabase(type, queryFilters, +size, +offset);
  let data = extractMeaningfulData(json);
  return { data, count: json.count };
};

export const getSpecificData = async (type, id) => {
  const json = await queryFromDatabase(type, id);
  let data = extractMeaningfulData(json);
  return data.find((element) => +element._id === +id);
};

export const getSpellsData = async (classe) => {
  const json = await getJsonData('spells.json');
  return json.data[classe];
};

export const getMonsterSpellsData = async (monsterId) => {
  const json = await getJsonData('monsterSpells.json');
  return json.data[monsterId];
};

export const getTodos = async () => {
  const json = await getJsonData('todos.json');
  return json.data;
};
