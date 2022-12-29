import { retrieveItems } from '../api/items';
import ItemsPage from '../../components/items/ItemsPage';

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
  const query = { ...context.query, type: 'equipment' };
  const req = { ...context.req, query };
  const items = await retrieveItems(req);
  return {
    props: {
      items,
      query,
    },
  };
}

export default EquipmentPage;
