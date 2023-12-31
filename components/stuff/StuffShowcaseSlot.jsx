import { Delete } from '@mui/icons-material';
import { Button, styled, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import { getItemSlotCategories, getTypeFilename } from '../../helpers/utils';
import ItemContent from '../items/ItemContent';

const StuffShowcaseSlot = ({ type, index = 0, item, tooltip, deleteItem, ...props }) => {
  const router = useRouter();
  const imgPath = item
    ? `/images/${getTypeFilename(type)}/${item.ankamaId}.png`
    : `/images/ui/item-backgrounds/${type}.png`;

  const TooltipContent = () => (
    <div>
      <ItemContent item={item} />
      <Button sx={{ width: '100%' }} variant="contained" onClick={() => deleteItem(type, index)} startIcon={<Delete />}>
        Supprimer
      </Button>
    </div>
  );

  const browseItems = () => {
    const slotCategories = getItemSlotCategories(type);
    router.push(`/${getTypeFilename(type)}${slotCategories ? `?categories=${slotCategories}` : ''}`);
  };

  return (
    <Tooltip enterDelay={250} placement={tooltip} title={item ? <TooltipContent /> : ''}>
      <Button className={props.className} onClick={browseItems}>
        <img src={imgPath} alt={`${type} background`} width={64} height={64} />
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
