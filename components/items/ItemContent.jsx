import { styled, Typography } from '@mui/material';
import ItemCharacteristics from './ItemCharacteristics';
import ItemConditions from './ItemConditions';
import ItemStats from './ItemStats';

const ItemContent = ({ item, ...props }) => {
  return (
    <div className={props.className}>
      <Typography variant="h6" component="div">
        {item.name}
      </Typography>
      <Typography gutterBottom variant="subtitle1" component="div">
        Level {item.level}
      </Typography>
      {item.characteristics && (
        <>
          <hr />
          <ItemCharacteristics characteristics={item.characteristics} />
        </>
      )}
      {item.statistics && (
        <>
          <hr />
          <ItemStats stats={item.statistics} />
        </>
      )}
      {item.conditions && (
        <>
          <hr />
          <ItemConditions conditions={item.conditions} />
        </>
      )}
    </div>
  );
};

export default styled(ItemContent)`
  hr {
    background-color: var(--background-lighter);
    border: none;
    height: 1px;
  }

  ul {
    line-height: 1.5;
  }
`;
