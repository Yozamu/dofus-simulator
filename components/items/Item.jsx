import { Card, CardActionArea, CardContent, CardMedia, styled, Typography } from '@mui/material';
import Image from 'next/image';

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
          <hr />
          {item.statistics && (
            <ul className="stats">
              {item.statistics.map((stat, index) =>
                Object.entries(stat).map(([key, val]) => (
                  <li key={index} className={val.min < 0 ? 'negative' : ''}>
                    <Image
                      key={key}
                      src={
                        key.length < 30
                          ? `/images/ui/stats/${key.toLowerCase().replace(/[0-9]| |-|%/g, '')}.png`
                          : '/images/ui/stats/other.png'
                      }
                      alt={key}
                      className="icon"
                      width={24}
                      height={24}
                    />
                    <span>
                      {key.replace(/[0-9]|-/g, '')}: {val.min} {val.max && `à ${val.max}`}
                    </span>
                  </li>
                ))
              )}
            </ul>
          )}
          {item.conditions && (
            <>
              <hr />
              <Typography gutterBottom variant="subtitle1" component="div">
                Conditions
              </Typography>
              <ul>
                {item.conditions.map((condition) => (
                  <li key={condition}>{condition}</li>
                ))}
              </ul>
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
    width: 320px;
    height: 500px;
  }

  .card-content {
    width: 100%;
  }

  .stats {
    padding: 0;
    list-style-type: none;
  }

  .negative {
    color: red;
  }
`;
