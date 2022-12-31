import { Button, styled } from '@mui/material';
import Image from 'next/image';
import { getTypeFilename } from '../../helpers/utils';

const StuffShowcaseSlot = ({ type, item, ...props }) => {
  const imgPath = item
    ? `/images/${getTypeFilename(type)}/${item.ankamaId}.png`
    : `/images/ui/item-backgrounds/${type}.png`;
  return (
    <Button className={props.className}>
      <Image src={imgPath} alt={`${type} background`} width={64} height={64} />
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
    opacity: ${(props) => (props.item ? '100' : '20')}%;
  }
`;
