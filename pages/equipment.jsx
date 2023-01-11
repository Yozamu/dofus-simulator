import { retrieveItems } from './api/items';
import ItemsPage from '../components/items/ItemsPage';
import { EQUIPMENT, EQUIPMENT_ITEMS } from '../helpers/constants';

const EquipmentPage = ({ items, query }) => {
  return <ItemsPage title="Equipement" query={query} items={items} availableCategories={EQUIPMENT_ITEMS} />;
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
