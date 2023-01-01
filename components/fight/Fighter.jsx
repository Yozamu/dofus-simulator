import { LinearProgress } from '@mui/material';
import Image from 'next/image';

const Fighter = ({ entity, isFighting, imagePath }) => {
  const FightingUI = () => (
    <div>
      <LinearProgress variant="determinate" value={(entity.vie / entity.maxvie) * 100} sx={{ width: '200px' }} />
    </div>
  );

  return (
    <div>
      <Image src={imagePath} alt={entity.name} width={200} height={200} />
      {isFighting && <FightingUI />}
    </div>
  );
};

export default Fighter;
