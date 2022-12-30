import { Card, CardActionArea, CardContent, CardMedia, styled, Typography } from '@mui/material';
import Image from 'next/image';
import ItemCharacteristics from './ItemCharacteristics';
import ItemConditions from './ItemConditions';
import ItemStats from './ItemStats';

const Item = (props) => {
  const { item, category, className } = props;

  return (
    <Card className={className}>
      <CardActionArea onClick={() => console.log('Clicked card')}>
        <CardMedia>
          <Image
            className="item-image"
            src={`/images/${category}/${item.ankamaId}.png`}
            alt={item.name}
            width={64}
            height={64}
          />
        </CardMedia>
        <CardContent className="card-content">
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default styled(Item)`
  margin: 10px;
  color: var(--foreground);
  background-color: var(--background-light);

  hr {
    background-color: var(--background-lighter);
    border: none;
    height: 1px;
  }

  ul {
    line-height: 1.5;
  }

  .item-image {
    position: absolute;
    right: 0px;
  }

  button {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    min-width: 320px;
    height: ${(props) => props.height}px;
  }

  .card-content {
    width: 100%;
  }
`;
