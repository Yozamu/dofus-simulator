import { Card, CardActionArea, CardContent, CardMedia, styled, Typography } from '@mui/material';
import Image from 'next/image';

const Equipment = (props) => {
  const { equipment, className } = props;
  return (
    <Card className={className}>
      <CardActionArea onClick={() => console.log('Clicked card')}>
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
          {equipment.statistics && (
            <ul>
              {equipment.statistics.map((stat, index) =>
                Object.entries(stat).map(([key, val]) => (
                  <li key={index}>
                    {key}: {val.min} {val.max && `- ${val.max}`}
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
  button {
    display: flex;
    align-items: flex-start;
    width: 300px;
    height: 300px;
  }
`;
