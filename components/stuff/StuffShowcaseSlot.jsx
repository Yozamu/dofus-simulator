import { Button, styled } from '@mui/material';
import Image from 'next/image';

const StuffShowcaseSlot = ({ type, item = {}, ...props }) => {
  return (
    <Button className={`item-background ${props.className}`}>
      <Image src={`/images/ui/item-backgrounds/${type}.png`} alt="Amulette background" width={64} height={64} />
    </Button>
  );
};

export default styled(StuffShowcaseSlot)`
  background-size: 64px;
  width: 64px;
  height: 64px;
  border: 1px solid var(--background-lighter);
  margin: 4px;

  img {
    opacity: 50%;
  }
`;
