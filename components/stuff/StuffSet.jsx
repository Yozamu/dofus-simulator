import { styled, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
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
          const itemIsEquipped = item[2];
          return (
            <Link key={itemId} href={`/equipment?name=${itemName}`}>
              <Image
                className={itemIsEquipped ? '' : 'not-equiped'}
                key={itemId}
                src={`/images/${category}/${itemId}.png`}
                alt={itemName}
                width={64}
                height={64}
              />
            </Link>
          );
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

  .not-equiped {
    opacity: 20%;
  }
`;
