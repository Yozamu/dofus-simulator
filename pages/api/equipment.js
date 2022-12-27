import { getFilteredData } from '../../helpers/data';

export default async function handler(req, res) {
  let data;
  if (req.method === 'GET') {
    data = await getFilteredData(EQUIPMENT, {
      level: { min: 120, max: 195 },
      type: 'chapeau',
      statistics: [{ pa: { min: 1 } }],
    }); // TODO refactor with filters for client side usage
  }
  res.status(200).json({ data });
}
