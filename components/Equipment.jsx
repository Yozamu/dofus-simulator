import { Card, CardActionArea, CardContent, CardMedia, styled, Typography } from '@mui/material';
import Image from 'next/image';
import ImageWithFallback from './ImageWithFallback';

const Equipment = (props) => {
  const { equipment, className } = props;
  console.log(equipment);
  return (
    <Card className={className}>
      <CardActionArea onClick={() => alert('Clicked card')}>
        <CardMedia>
          <Image src={`/images/equipment/${equipment.ankamaId}.png`} alt="Equipment image" width={64} height={64} />
        </CardMedia>
        <CardContent>
          <Typography variant="h6" component="div">
            {equipment.name}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            Level {equipment.level}
          </Typography>
          <hr />
          {equipment.statistics && (
            <ul className="stats">
              {equipment.statistics.map((stat, index) =>
                Object.entries(stat).map(([key, val]) => (
                  <li key={index} className={val.min < 0 ? 'negative' : ''}>
                    <ImageWithFallback
                      key={key}
                      src={`/images/ui/stats/${key.toLowerCase()}.png`}
                      fallbackSrc={'/images/ui/stats/other.png'}
                      alt="stat image"
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

export default styled(Equipment)`
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
