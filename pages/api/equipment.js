import { getEquipmentData } from '../../helpers/data';

export default async function handler(req, res) {
  let data;
  if (req.method === 'GET') {
    data = await getEquipmentData();
  }
  res.status(200).json({ data });
}
