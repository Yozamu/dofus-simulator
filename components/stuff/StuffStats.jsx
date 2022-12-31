import { Button, Card, Checkbox, styled, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MAIN_STATS } from '../../helpers/constants';
import { setLocalStorageCharacteristics } from '../../helpers/localstorage';
import { normalizeImageName } from '../../helpers/utils';

const StuffStats = ({ characteristics, setCharacteristics, ...props }) => {
  const [level, setLevel] = useState(200);
  const [pointsLeft, setPointsLeft] = useState(995);

  useEffect(() => {
    let points = level * 5 - 5;
    Object.entries(characteristics).forEach(([stat, value]) => {
      switch (stat) {
        case 'vitalité':
          points -= value;
          break;
        case 'sagesse':
          points -= 3 * value;
          break;
        default:
          let val = value,
            cost = 1;
          while (val > 0) {
            const substract = Math.min(val, 100);
            points -= substract * cost;
            val -= substract;
            cost++;
          }
      }
      setPointsLeft(points);
    });
  }, [characteristics, level]);

  const updateStat = (stat, val) => {
    setLocalStorageCharacteristics(stat, +val); // TODO + parcho is checked = 100
    setCharacteristics({ ...characteristics, [stat]: +val });
  };

  return (
    <div className={props.className}>
      <div>
        <Typography variant="h6">Caractéristiques</Typography>
        <div>Level {level}</div>
        <hr />
        <div className="character-stats">
          {MAIN_STATS.map((stat) => {
            const statName = stat.toLowerCase();
            return (
              <div key={stat}>
                <div>
                  <Image
                    src={`/images/ui/stats/${normalizeImageName(stat)}.png`}
                    alt={stat}
                    className="icon"
                    width={32}
                    height={32}
                  />
                  {stat}
                </div>
                <TextField
                  id={`${stat}-value`}
                  onChange={(e) => updateStat(statName, e.target.value)}
                  size="small"
                  sx={{ minWidth: '64px', maxWidth: '64px' }}
                  value={characteristics[statName]}
                />
                <div className="stat-scroll">
                  <Image src={`/images/ui/parchemins/${statName}Parchemin.png`} alt={stat} width={32} height={32} />
                  <Checkbox />
                </div>
              </div>
            );
          })}
        </div>
        <hr />
        <div>Points restants: {pointsLeft}</div>
      </div>
    </div>
  );
};

export default styled(StuffStats)`
  > div {
    background-color: var(--background-light);
    padding: 10px;
  }

  hr {
    border: solid 1px var(--background-lighter);
  }

  .character-stats > div {
    display: flex;
    align-items: center;
  }

  .character-stats > div > div:first-child {
    width: 150px;
  }

  .stat-scroll {
    margin: 0 0 0 20px;
    display: flex;
    align-items: center;
  }
`;
