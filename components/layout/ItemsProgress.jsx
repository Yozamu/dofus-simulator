import { CircularProgress } from '@mui/material';
import { useContext } from 'react';
import Filters from '../filters/Filters';
import { WindowContext } from './WindowContext';

const ItemsProgress = () => {
  const { clientWidth } = useContext(WindowContext);
  return (
    <div>
      <Filters clientWidth={clientWidth} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    </div>
  );
};

export default ItemsProgress;
