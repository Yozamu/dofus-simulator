import { retrieveItems } from './api/items';
import ItemsPage from '../components/items/ItemsPage';
import { WEAPONS } from '../helpers/constants';

const WeaponsPage = ({ items, query }) => {
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

  return <ItemsPage title="Armes" query={query} items={items} availableCategories={availableCategories} />;
};

export async function getServerSideProps(context) {
  const query = { ...context.query, type: WEAPONS };
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

export default WeaponsPage;
