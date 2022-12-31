import { Button, Card, TextField, Typography } from '@mui/material';
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
        case 'Vitalité':
          points -= value;
          break;
        case 'Sagesse':
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
    setLocalStorageCharacteristics(stat, +val);
    setCharacteristics({ ...characteristics, [stat]: +val });
  };

  return (
    <Card>
      <Typography>Caractéristiques</Typography>
      <div>Level {level}</div>
      <div>
        {MAIN_STATS.map((stat) => (
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
              onChange={(e) => updateStat(stat.toLowerCase(), e.target.value)}
              value={characteristics[stat.toLowerCase()]}
            />
            <Button>
              <Image src={`/images/ui/stats/${'other'}.png`} alt={stat} width={32} height={32} />
            </Button>
          </div>
        ))}
      </div>
      <div>Points restants: {pointsLeft}</div>
    </Card>
  );
};

export default StuffStats;
