import { getItemData } from '../../../helpers/data';
import { getTypeFilename } from '../../../helpers/utils';

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