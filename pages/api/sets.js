import { getSpecificData } from '../../helpers/data';

export const getSets = async (req) => {
  const set = await getSpecificData('sets', req.query.setId);
  return { data: set };
};

export default async function handler(req, res) {
  let data;
  if (req.method === 'GET') {
    data = await getSets(req);
  }
  res.status(200).json(data);
}
