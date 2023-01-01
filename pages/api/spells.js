import { getSpellsData } from '../../helpers/data';

export const getSpells = async (req) => {
  const spells = await getSpellsData(req.query.classe);
  return { data: spells };
};

export default async function handler(req, res) {
  let data;
  if (req.method === 'GET') {
    data = await getSpells(req);
  }
  res.status(200).json(data);
}
