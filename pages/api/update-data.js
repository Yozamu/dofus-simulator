import { updateAll } from '../../helpers/data';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    await updateAll();
  }
  res.status(200).json({ message: 'Update successful' });
}
