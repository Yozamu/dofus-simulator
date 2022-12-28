import { getFilteredData } from '../../helpers/data';

export default async function handler(req, res) {
  let data;
  if (req.method === 'GET') {
    const { type, name = '' } = req.query;
    const level = req.query.level.split(',');
    const categories = req.query.categories?.split(',') || [];
    data = await getFilteredData(type, {
      name: name,
      level: { min: level[0], max: level[1] },
      type: categories,
      statistics: [{ pa: { min: 1 } }],
    }); // TODO filter stats
  }
  res.status(200).json({ data });
}
