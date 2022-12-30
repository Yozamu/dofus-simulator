import { getItemData } from '../../../helpers/data';

const getTypeFilename = (type) => {
  switch (type) {
    case 'Familier':
      return 'pets';
    case 'Arme':
      return 'weapons';
    default:
      return 'equipment';
  }
};

const handler = async (req, res) => {
  let data = [];
  let params = req.query.slug;
  if (req.method === 'GET') {
    const arr = params[1].split(',');
    for (let param of arr) {
      const itemData = await getItemData(getTypeFilename(params[0]), param);
      data.push(itemData);
    }
  }
  res.status(200).json({ data });
};

export default handler;
