import { getSpecificData } from '../../helpers/data';

export const getSets = (req) => {
  const set = getSpecificData('sets', req.query.setId);
  return { data: set };
};

export default async function handler(req, res) {
  let data;
  if (req.method === 'GET') {
    data = getSets(req);
  }
  res.status(200).json(data);
}
