import { retrieveItems } from './api/items';
import ItemsPage from '../components/items/ItemsPage';
import { EQUIPMENT } from '../helpers/constants';

const EquipmentPage = ({ items, query }) => {
  const availableCategories = [
    'Amulette',
    'Anneau',
    'Bottes',
    'Bouclier',
    'Ceinture',
    'Cape',
    'Chapeau',
    'Dofus',
    'Trophée',
  ];

  return <ItemsPage title="Equipement" query={query} items={items} availableCategories={availableCategories} />;
};

export async function getServerSideProps(context) {
  const query = { ...context.query, type: EQUIPMENT };
  const req = { ...context.req, query };
  const res = await retrieveItems(req);
  return {
    props: {
      items: res.data,
      count: res.count,
      query,
    },
  };
}

export default EquipmentPage;
