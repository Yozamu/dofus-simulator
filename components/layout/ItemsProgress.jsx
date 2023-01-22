import { CircularProgress } from '@mui/material';
import Filters from '../filters/Filters';

const ItemsProgress = () => {
  return (
    <div>
      <Filters />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    </div>
  );
};

export default ItemsProgress;
