import ItemsPage from '../components/items/ItemsPage';
import { EQUIPMENT, EQUIPMENT_ITEMS } from '../helpers/constants';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EquipmentPage = () => {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);

  const router = useRouter();
  const query = { type: EQUIPMENT, ...router.query };
  console.log('render', count);

  useEffect(() => {
    fetch(`/api/items?type=equipment`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setItems(json.data);
        setCount(json.count);
      });
  }, []);

  return (
    <>
      {count > 0 && (
        <ItemsPage title="Equipement" query={query} items={items} count={count} availableCategories={EQUIPMENT_ITEMS} />
      )}
    </>
  );
};

export default EquipmentPage;
