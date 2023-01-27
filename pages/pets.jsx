import ItemsPage from '../components/items/ItemsPage';
import ItemsProgress from '../components/layout/ItemsProgress';
import { PETS } from '../helpers/constants';
import useFetchItems from '../hooks/useFetchItems';

const PetsPage = () => {
  const availableCategories = ['Dragodinde', 'Muldo', 'Volkorne', 'Familier', 'Montilier'];
  const [items, count, query] = useFetchItems(PETS, 24);

  return (
    <>
      {count > 0 ? (
        <ItemsPage
          title="Familiers & Montures"
          query={query}
          items={items}
          count={count}
          availableCategories={availableCategories}
          itemHeight={300}
        />
      ) : (
        <ItemsProgress />
      )}
    </>
  );
};

export default PetsPage;
