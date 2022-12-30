import { Button } from '@mui/material';
import Image from 'next/image';

const StuffShowcaseSlot = ({ type, item = {}, ...props }) => {
  return (
    <Button
      className="item-background"
      sx={{ backgroundImage: `url("/images/ui/item-backgrounds/${type}.png")` }}
      startIcon={
        <Image src="/images/ui/item-backgrounds/Amulette.png" alt="Amulette background" width={64} height={64} />
      }
    ></Button>
  );
};

export default StuffShowcaseSlot;
