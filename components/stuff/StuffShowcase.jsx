import { styled } from '@mui/material';
import { deleteStuffItemFromLocalStorage } from '../../helpers/localstorage';
import StuffShowcaseSlot from './StuffShowcaseSlot';
import StuffShowcaseCharacter from './StuffShowcaseCharacter';

const leftRowItems = ['Amulette', 'Bouclier', 'Anneaux', 'Ceinture', 'Bottes'];
const rightRowItems = ['Chapeau', 'Arme', 'Anneaux', 'Cape', 'Familier'];

const StuffShowcase = ({ items, setItems, characteristics, setCharacteristics, ...props }) => {
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
        <StuffShowcaseCharacter characteristics={characteristics} setCharacteristics={setCharacteristics} />
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
      <div className="stuff-lower">
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
  .stuff-upper {
    display: flex;
  }

  .stuff-items {
    display: flex;
    flex-direction: column;
  }

  .stuff-lower {
    display: flex;
    justify-content: space-between;
  }
`;
