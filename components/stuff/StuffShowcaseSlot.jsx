import { Delete } from '@mui/icons-material';
import { Button, styled, Tooltip, tooltipClasses } from '@mui/material';
import Image from 'next/image';
import { getTypeFilename } from '../../helpers/utils';
import ItemContent from '../items/ItemContent';

const StuffShowcaseSlot = ({ type, item, tooltip, ...props }) => {
  const imgPath = item
    ? `/images/${getTypeFilename(type)}/${item.ankamaId}.png`
    : `/images/ui/item-backgrounds/${type}.png`;

  const TooltipContent = () => (
    <div>
      <ItemContent item={item} />
      <Button sx={{ width: '100%' }} variant="contained" startIcon={<Delete />}>
        Supprimer
      </Button>
    </div>
  );

  return (
    <Tooltip placement={tooltip} title={item ? <TooltipContent /> : ''}>
      <Button className={props.className}>
        <Image src={imgPath} alt={`${type} background`} width={64} height={64} />
      </Button>
    </Tooltip>
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
