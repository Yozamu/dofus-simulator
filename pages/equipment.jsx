import ItemsPage from '../components/items/ItemsPage';
import ItemsProgress from '../components/layout/ItemsProgress';
import { EQUIPMENT, EQUIPMENT_ITEMS } from '../helpers/constants';
import useFetchItems from '../hooks/useFetchItems';

const EquipmentPage = () => {
  const [items, count, query] = useFetchItems(EQUIPMENT);

  return (
    <>
      {count > 0 ? (
        <ItemsPage title="Equipement" query={query} items={items} count={count} availableCategories={EQUIPMENT_ITEMS} />
      ) : (
        <ItemsProgress />
      )}
    </>
  );
};

export default EquipmentPage;
