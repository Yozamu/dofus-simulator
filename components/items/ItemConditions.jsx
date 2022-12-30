import { Typography } from '@mui/material';

const ItemConditions = ({ conditions }) => {
  return (
    <>
      <Typography gutterBottom variant="subtitle1" component="div">
        Conditions
      </Typography>
      <ul>
        {conditions.map((condition) => (
          <li key={condition}>{condition}</li>
        ))}
      </ul>
    </>
  );
};

export default ItemConditions;
