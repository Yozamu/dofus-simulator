import { Button, Dialog } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NameFilter from '../filters/NameFilter';

const PAGE_SIZE = 50;

const MonsterChoice = ({ monsters, open, onClose, selectedValue }) => {
  const [filteredMonsters, setFilteredMonsters] = useState(monsters.slice(0, PAGE_SIZE));
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    const lowercaseName = nameFilter.toLowerCase();
    const id = setTimeout(() => {
      setFilteredMonsters(
        monsters.filter((monster) => monster.name.toLowerCase().includes(lowercaseName)).slice(0, PAGE_SIZE)
      );
    }, 500);
    return () => clearTimeout(id);
  }, [nameFilter, monsters]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleMonsterClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullScreen sx={{ marginTop: '64px' }}>
      <div style={{ display: 'flex', position: 'sticky', top: 0, zIndex: 1 }}>
        <NameFilter name={nameFilter} setName={setNameFilter} variant="filled" />
        <Button onClick={handleClose} variant="contained">
          Close
        </Button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredMonsters.map((monster) => (
          <Button
            style={{
              margin: '5px',
              padding: '0',
              border: '1px solid',
              display: 'flex',
              flexDirection: 'column',
              width: '200px',
            }}
            key={monster.ankamaId}
            onClick={() => handleMonsterClick(monster)}
          >
            <Image src={`/images/monsters/${monster.ankamaId}.png`} alt={monster.name} width={200} height={200} />
            {monster.name}
          </Button>
        ))}
      </div>
    </Dialog>
  );
};

export default MonsterChoice;
