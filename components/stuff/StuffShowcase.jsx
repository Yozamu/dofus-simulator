import { Button, styled } from '@mui/material';
import Image from 'next/image';
import StuffShowcaseSlot from './StuffShowcaseSlot';

const leftRowItems = ['Amulette', 'Bouclier', 'Anneaux', 'Ceinture', 'Bottes'];
const rightRowItems = ['Chapeau', 'Arme', 'Anneaux', 'Cape', 'Familier'];

const StuffShowcase = ({ items, ...props }) => {
  console.log(items);
  return (
    <div className={props.className}>
      <div className="stuff-upper">
        <div className="stuff-items">
          {leftRowItems.map((itemType) => (
            <StuffShowcaseSlot key={itemType} type={itemType} item={items[itemType] && items[itemType][0]} />
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
              item={items[itemType] && items[itemType][itemType === 'Anneaux' ? 1 : 0]}
            />
          ))}
        </div>
      </div>
      <div>
        {[...Array(6)].map((e, i) => (
          <StuffShowcaseSlot key={i} type="Trophées" item={items['Trophées'] && items['Trophées'][i]} />
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
