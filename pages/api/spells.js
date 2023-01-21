import { getSpellsData } from '../../helpers/data';

export const getSpells = (req) => {
  const spells = getSpellsData(req.query.classe);
  return { data: spells };
};

export default async function handler(req, res) {
  let data;
  if (req.method === 'GET') {
    data = getSpells(req);
  }
  res.status(200).json(data);
}
