import { getFilteredData } from '../../helpers/data';

export default async function handler(req, res) {
  let data;
  if (req.method === 'GET') {
    const { type, name = '' } = req.query;
    const level = req.query.level.split(',');
    const categories = req.query.categories?.split(',') || [];
    const stats = req.query.stats?.split(',') || [];
    const computedStats = stats.map((stat) => ({ [stat]: { min: 1 } }));
    data = await getFilteredData(type, {
      name: name,
      level: { min: level[0], max: level[1] },
      type: categories,
      statistics: computedStats,
    });
  }
  res.status(200).json({ data });
}
