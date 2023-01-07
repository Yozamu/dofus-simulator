import { styled, Typography } from '@mui/material';
import Image from 'next/image';
import { normalizeImageName } from '../../helpers/utils';

const StuffSet = ({ set, ...props }) => {
  return (
    <div className={`container ${props.className}`}>
      <Typography variant="h6">
        {set.name} - Niveau {set.level} - {set.amountEquipped}/{set.items.length} objets équipés
      </Typography>
      <hr />
      <div className="set-info">
        {set.items.map((item) => {
          const category = 'equipment';
          const itemId = item[0][0];
          const itemName = item[1];
          return <Image key={itemId} src={`/images/${category}/${itemId}.png`} alt={itemName} width={96} height={96} />;
        })}
        <div className="set-bonus">
          <div>Bonus:</div>
          {set.bonus.map((bonus) => (
            <div key={bonus[0]}>
              {bonus[1]}
              <Image
                src={`/images/ui/stats/${normalizeImageName(bonus[0])}.png`}
                alt={bonus[0]}
                width={24}
                height={24}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default styled(StuffSet)`
  .set-info {
    display: flex;
  }

  .set-bonus {
    display: flex;
    align-items: center;
  }

  .set-bonus > * {
    display: flex;
    align-items: center;
  }

  .set-bonus > div {
    margin: 5px;
  }
`;
