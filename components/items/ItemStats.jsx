import { styled } from '@mui/material';
import Image from 'next/image';

const ItemStats = ({ stats, className }) => {
  const damageLinesFilter = (stat) => Object.keys(stat)[0].match(/\(dommages|\(vol|\(PV/)?.length;
  const damageLines = stats.filter(damageLinesFilter).length || -1;

  return (
    <ul className={className}>
      {stats.map((stat, index) =>
        Object.entries(stat).map(([key, val]) => {
          let statName = key.replace(/[0-9-()]/g, '');
          const imageName = statName
            .replace('vol', 'dommages')
            .replace('PV rendus', 'Vitalité')
            .toLowerCase()
            .replace(/[ %]/g, '');
          statName = statName[0].toUpperCase() + statName.slice(1);
          return (
            <li key={index} className={val.min < 0 ? 'negative' : ''}>
              <Image
                src={key.length < 30 ? `/images/ui/stats/${imageName}.png` : '/images/ui/stats/other.png'}
                alt={key}
                className="icon"
                width={24}
                height={24}
              />
              <span>
                {statName}: {val.min} {val.max && `à ${val.max}`}
              </span>
              {index === damageLines - 1 && <hr />}
            </li>
          );
        })
      )}
    </ul>
  );
};

export default styled(ItemStats)`
  padding: 0;
  list-style-type: none;

  .negative {
    color: red;
  }
`;
