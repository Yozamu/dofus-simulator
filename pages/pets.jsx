import { retrieveItems } from './api/items';
import ItemsPage from '../components/items/ItemsPage';
import { PETS } from '../helpers/constants';

const PetsPage = ({ items, count, query }) => {
  const availableCategories = ['Dragodinde', 'Muldo', 'Volkorne', 'Familier', 'Montilier'];

  return (
    <ItemsPage
      title="Familiers & Montures"
      query={query}
      items={items}
      count={count}
      availableCategories={availableCategories}
      itemHeight={300}
    />
  );
};

export async function getServerSideProps(context) {
  const query = { ...context.query, type: PETS };
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

export default PetsPage;
