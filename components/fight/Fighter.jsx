import { LinearProgress, styled } from '@mui/material';
import Image from 'next/image';

const Fighter = ({ entity, isFighting, imagePath, ...props }) => {
  const FightingUI = () => (
    <div>
      <LinearProgress variant="determinate" value={(entity.vie / entity.maxvie) * 100} sx={{ width: '200px' }} />
      <div className="pa-pm-po">
        <Image src="/images/ui/stats/vie.png" alt="Vie" width={32} height={32} /> {entity.vie}
        <Image src="/images/ui/stats/pa.png" alt="PA" width={32} height={32} /> {entity.pa}
        <Image src="/images/ui/stats/pm.png" alt="PM" width={32} height={32} /> {entity.pm}
        <Image src="/images/ui/stats/portée.png" alt="PO" width={32} height={32} /> {entity['portée']}
      </div>
    </div>
  );

  return (
    <div className={props.className}>
      <Image src={imagePath} alt={entity.name || 'fighter'} width={200} height={200} />
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
`;
