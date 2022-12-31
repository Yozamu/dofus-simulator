import { Button, styled } from '@mui/material';
import Image from 'next/image';
import { deleteStuffItemFromLocalStorage } from '../../helpers/utils';
import StuffShowcaseSlot from './StuffShowcaseSlot';

const leftRowItems = ['Amulette', 'Bouclier', 'Anneaux', 'Ceinture', 'Bottes'];
const rightRowItems = ['Chapeau', 'Arme', 'Anneaux', 'Cape', 'Familier'];

const StuffShowcase = ({ items, setItems, ...props }) => {
  const deleteItem = (type, index) => {
    deleteStuffItemFromLocalStorage(type, index);
    const currentItems = [...items[type]];
    currentItems.splice(index, 1);
    setItems({ ...items, [type]: currentItems });
  };

  return (
    <div className={props.className}>
      <div className="stuff-upper">
        <div className="stuff-items">
          {leftRowItems.map((itemType) => (
            <StuffShowcaseSlot
              key={itemType}
              type={itemType}
              tooltip="right"
              item={items[itemType] && items[itemType][0]}
              deleteItem={deleteItem}
            />
          ))}
        </div>
        <div className="stuff-character">
          <Image src={`/images/classes/${'pandawa'}.png`} alt="Character background" width={192} height={192} />
          <Button variant="outlined">Changer classe</Button>
        </div>
        <div className="stuff-items">
          {rightRowItems.map((itemType) => (
            <StuffShowcaseSlot
              key={itemType}
              type={itemType}
              tooltip="left"
              index={itemType === 'Anneaux' ? 1 : 0}
              item={items[itemType] && items[itemType][itemType === 'Anneaux' ? 1 : 0]}
              deleteItem={deleteItem}
            />
          ))}
        </div>
      </div>
      <div>
        {[...Array(6)].map((e, i) => (
          <StuffShowcaseSlot
            key={i}
            type="Trophées"
            tooltip="top"
            index={i}
            item={items['Trophées'] && items['Trophées'][i]}
            deleteItem={deleteItem}
          />
        ))}
      </div>
    </div>
  );
};

export default styled(StuffShowcase)`
  width: 432px;
  margin: auto;

  .stuff-upper {
    display: flex;
  }

  .stuff-character {
    flex: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .stuff-items {
    display: flex;
    flex-direction: column;
  }
`;
