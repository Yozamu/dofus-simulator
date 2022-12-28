import { styled } from '@mui/material';
import Head from 'next/head';
import ItemList from '../../components/items/ItemList';
import Filters from '../../components/filters/Filters';
import { EQUIPMENT } from '../../helpers/constants';
import { getFilteredData } from '../../helpers/data';

const EquipmentPage = (props) => {
  return (
    <>
      <Head>
        <title>Dofus Simulator - Equipement</title>
      </Head>
      <div className={`${props.className} wrapper`}>
        <Filters className="filters" />
        <ItemList className="items" items={props.equipment} category={EQUIPMENT} />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const equipment = await getFilteredData(EQUIPMENT);
  return {
    props: {
      equipment: equipment,
    },
  };
}

export default styled(EquipmentPage)`
  .items {
    margin-left: 200px;
  }
`;
