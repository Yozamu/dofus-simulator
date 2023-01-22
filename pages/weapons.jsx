import ItemsPage from '../components/items/ItemsPage';
import Progress from '../components/layout/Progress';
import { WEAPONS } from '../helpers/constants';
import useFetchItems from '../hooks/useFetchItems';

const WeaponsPage = () => {
  const availableCategories = [
    'Arc',
    'Baguette',
    'Bâton',
    'Dagues',
    'Épée',
    'Faux',
    'Hache',
    'Lance',
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
        <Progress />
      )}
    </>
  );
};

export default WeaponsPage;
