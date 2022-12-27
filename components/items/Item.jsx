import { Card, CardActionArea, CardContent, CardMedia, styled, Typography } from '@mui/material';
import Image from 'next/image';
import ImageWithFallback from '../ImageWithFallback';

const Item = (props) => {
  const { item, category, className } = props;

  return (
    <Card className={className}>
      <CardActionArea onClick={() => alert('Clicked card')}>
        <CardMedia>
          <Image src={`/images/${category}/${item.ankamaId}.png`} alt={item.name} width={64} height={64} />
        </CardMedia>
        <CardContent>
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
                    <ImageWithFallback
                      key={key}
                      src={`/images/ui/stats/${key.includes(' ') ? 'other' : key.toLowerCase()}.png`}
                      fallbackSrc={'/images/ui/stats/other.png'}
                      alt={key}
                      className="icon"
                      width={32}
                      height={32}
                    />
                    {key}: {val.min} {val.max && `à ${val.max}`}
                  </li>
                ))
              )}
            </ul>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default styled(Item)`
  margin: 10px;
  color: #ffffff;
  background-color: #424242;

  button {
    display: flex;
    align-items: flex-start;
    width: 300px;
    height: 300px;
  }

  .stats {
    list-style-type: none;
  }

  .negative {
    color: red;
  }
`;
