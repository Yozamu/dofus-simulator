import { styled } from '@mui/material';
import Head from 'next/head';
import ItemList from '../../components/items/ItemList';
import Filters from '../../components/filters/Filters';
import { EQUIPMENT } from '../../helpers/constants';
import { getFilteredData } from '../../helpers/data';
import { useState } from 'react';

const EquipmentPage = (props) => {
  const [items, setItems] = useState(props.items);

  return (
    <>
      <Head>
        <title>Dofus Simulator - Equipement</title>
      </Head>
      <div className={`${props.className} wrapper`}>
        <Filters setItems={setItems} />
        <ItemList className="items" items={items} category={EQUIPMENT} />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const items = await getFilteredData(EQUIPMENT);
  return {
    props: {
      items: items,
    },
  };
}

export default styled(EquipmentPage)`
  .items {
    margin-left: 200px;
  }
`;
