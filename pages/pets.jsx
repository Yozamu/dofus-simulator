import ItemsPage from '../components/items/ItemsPage';
import Progress from '../components/layout/Progress';
import { PETS } from '../helpers/constants';
import useFetchItems from '../hooks/useFetchItems';

const PetsPage = () => {
  const availableCategories = ['Dragodinde', 'Muldo', 'Volkorne', 'Familier', 'Montilier'];
  const [items, count, query] = useFetchItems(PETS);

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
        <Progress />
      )}
    </>
  );
};

export default PetsPage;
