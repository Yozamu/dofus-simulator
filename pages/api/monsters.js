import { getFilteredData } from '../../helpers/data';

export const getMonsters = async (req) => {
  const monsters = await getFilteredData('monsters', {}, 2000);
  const filteredMonsters = monsters.data.filter((monster) => monster.type !== 'Archi-monstres');
  const updatedData = filteredMonsters.map((monster) => ({
    ankamaId: monster.ankamaId,
    name: monster.name,
    resistances: monster.resistances,
    statistics: monster.statistics,
  }));
  return { data: updatedData, count: filteredMonsters.length };
};

export default async function handler(req, res) {
  let data;
  if (req.method === 'GET') {
    data = await getMonsters(req);
  }
  res.status(200).json(data);
}
