import { getFilteredData } from '../../../helpers/data';

export const retrieveItems = (req) => {
  const { type, name = '', size, offset } = req.query;
  const level = req.query.level?.split(',') || [1, 200];
  const categories = req.query.categories?.split(',') || [];
  const stats = req.query.stats?.split(',') || [];
  const computedStats = stats.map((stat) => ({ [stat]: { min: 1 } }));
  return getFilteredData(
    type,
    {
      name: name.toLowerCase(),
      level: { min: level[0], max: level[1] },
      type: categories,
      statistics: computedStats,
    },
    size,
    offset
  );
};

const handler = async (req, res) => {
  let data;
  if (req.method === 'GET') {
    data = retrieveItems(req);
  }
  res.status(200).json(data);
};

export default handler;
