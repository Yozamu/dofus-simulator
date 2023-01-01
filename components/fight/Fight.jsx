import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

const Fight = ({ monsters, stats }) => {
  const [enemy, setEnemy] = useState({});

  const chooseEnemy = () => {
    console.log('choose enemy', monsters, stats, enemy);
  };

  useEffect(() => {
    setEnemy(monsters.find((monster) => monster.ankamaId === 494));
  }, [monsters]);

  return (
    <>
      <Button onClick={chooseEnemy} variant="contained">
        Choisir monstre
      </Button>
    </>
  );
};

export default Fight;
