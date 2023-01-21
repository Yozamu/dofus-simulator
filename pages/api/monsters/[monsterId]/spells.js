import { getMonsterSpellsData } from '../../../../helpers/data';

export const getMonsterSpells = (req) => {
  const spells = getMonsterSpellsData(req.query.monsterId);
  return { data: spells };
};

export default async function handler(req, res) {
  let data;
  if (req.method === 'GET') {
    data = getMonsterSpells(req);
  }
  res.status(200).json(data);
}
