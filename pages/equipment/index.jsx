import Image from 'next/image';
import { getEquipmentData } from '../../helpers/data';

const Equipment = (props) => {
  const { equipment } = props;
  const slicedEquipment = equipment.slice(0, 50);
  return (
    <div>
      Equipment
      <ul>
        {slicedEquipment.map((eq) => (
          <li key={eq._id}>
            {/*<Image src={eq.imgUrl} alt="Equipment image" width={64} height={64} />*/}
            Level {eq.level} - {eq.name}
            {eq.statistics && (
              <ul>
                {eq.statistics.map((stat, index) => (
                  <li key={index}>
                    {Object.entries(stat).map(([key, val]) => (
                      <>
                        {key}: {val.min} - {val.max}
                      </>
                    ))}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const equipmentResponse = ''; //await fetch('https://fr.dofus.dofapi.fr/equipments');
  const equipment = await getEquipmentData();
  console.log(equipment);
  //const equipment = await equipmentResponse.json();
  return {
    props: {
      equipment,
    },
  };
}

export default Equipment;
