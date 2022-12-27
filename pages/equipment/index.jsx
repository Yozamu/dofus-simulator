import { styled } from '@mui/material';
import Head from 'next/head';
import ItemList from '../../components/items/ItemList';
import { EQUIPMENT } from '../../helpers/constants';
import { getFilteredData } from '../../helpers/data';

const EquipmentPage = (props) => {
  return (
    <>
      <Head>
        <title>Dofus Simulator - Equipement</title>
      </Head>
      <ItemList items={props.equipment} category={EQUIPMENT} />
    </>
  );
};

export async function getStaticProps() {
  const equipment = await getFilteredData(EQUIPMENT, {
    level: { min: 120, max: 195 },
    type: 'chapeau',
    statistics: [{ pa: { min: 1 } }, { puissance: { max: 40 } }],
  });
  return {
    props: {
      equipment: equipment,
    },
  };
}

export default styled(EquipmentPage)``;
