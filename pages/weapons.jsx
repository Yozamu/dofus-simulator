import ItemsPage from '../components/items/ItemsPage';
import ItemsProgress from '../components/layout/ItemsProgress';
import { WEAPONS } from '../helpers/constants';
import useFetchItems from '../hooks/useFetchItems';

const WeaponsPage = () => {
  const availableCategories = [
    'Arc',
    'Baguette',
    'Bâton',
    'Dague',
    'Épée',
    'Faux',
    'Hache',
    'Marteau',
    'Pelle',
    'Pioche',
  ];
  const [items, count, query] = useFetchItems(WEAPONS);

  return (
    <>
      {count > 0 ? (
        <ItemsPage
          title="Armes"
          query={query}
          items={items}
          count={count}
          availableCategories={availableCategories}
          itemHeight={600}
        />
      ) : (
        <ItemsProgress />
      )}
    </>
  );
};

export default WeaponsPage;
