import { Info } from '@mui/icons-material';
import { LinearProgress, styled, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import { getFormattedStatName } from '../../helpers/utils';

const Fighter = ({ entity, isFighting, imagePath, scaleX = 1, ...props }) => {
  const FightingUI = () => (
    <div>
      <LinearProgress variant="determinate" value={(entity.vie / entity.viemax) * 100} sx={{ width: '200px' }} />
      <div className="pa-pm-po">
        <Image src="/images/ui/stats/vie.png" alt="Vie" width={32} height={32} /> {entity.vie}
        <Image src="/images/ui/stats/pa.png" alt="PA" width={32} height={32} /> {entity.pa}
        <Image src="/images/ui/stats/pm.png" alt="PM" width={32} height={32} /> {entity.pm}
        <Image src="/images/ui/stats/portée.png" alt="PO" width={32} height={32} /> {entity['portée']}
      </div>
    </div>
  );

  const TooltipContent = () => {
    return (
      <div>
        <Typography variant="h6">
          Buffs actifs
          <hr />
        </Typography>
        <ul>
          {entity.buffs.map((buff, i) => (
            <li key={i}>
              <Typography variant="body2">
                {buff.name}: {buff.amount} {getFormattedStatName(buff.stat)} ({buff.duration} tour(s))
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className={props.className}>
      <Image src={imagePath} alt={entity.name || 'fighter'} width={200} height={200} />
      {entity.buffs?.length > 0 && (
        <Tooltip placement="bottom" disableInteractive title={<TooltipContent />}>
          <Info sx={{ position: 'absolute' }} />
        </Tooltip>
      )}
      {isFighting && <FightingUI />}
    </div>
  );
};

export default styled(Fighter)`
  .pa-pm-po {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    transform: scaleX(${(props) => props.scaleX});
  }
`;
