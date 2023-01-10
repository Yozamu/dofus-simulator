//import { retrieveItems } from './api/items';
import ItemsPage from '../components/items/ItemsPage';
//import { EQUIPMENT } from '../helpers/constants';
import { useEffect, useState } from 'react';

const EquipmentPage = (/*{ items, query }*/) => {
  const [items, setItems] = useState([]);
  const query = '';
  useEffect(() => {
    fetch('/api/items')
      .then((res) => res.json())
      .then((json) => setItems(json.data));
  }, []);

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
/*
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
*/
export default EquipmentPage;
