import { styled } from '@mui/material';
import { useState } from 'react';
import Equipment from '../../components/Equipment';
import { getEquipmentData } from '../../helpers/data';

const EquipmentPage = (props) => {
  const [equipment, setEquipment] = useState(props.equipment);
  return (
    <div className={props.className}>
      <ul className="equipment-list">
        {equipment.map((eq) => (
          <li key={eq._id}>
            <Equipment equipment={eq} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const equipment = await getEquipmentData();
  return {
    props: {
      equipment: equipment.data.slice(0, 50),
    },
  };
}

export default styled(EquipmentPage)`
  .equipment-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    list-style-type: none;
  }
`;
