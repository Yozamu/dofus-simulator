import { Button, Dialog, styled } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NameFilter from '../filters/NameFilter';

const PAGE_SIZE = 60;

const MonsterChoice = ({ monsters, open, onClose, selectedValue, ...props }) => {
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
    <Dialog className={props.className} onClose={handleClose} open={open} sx={{ marginTop: '48px' }}>
      <div className="top-buttons">
        <NameFilter
          name={nameFilter}
          setName={setNameFilter}
          variant="filled"
          sx={{ backgroundColor: 'var(--background-light)' }}
        />
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
            <Image src={`/images/monsters/${monster.ankamaId}.png`} alt={monster.name} width={100} height={100} />
            {monster.name}
          </Button>
        ))}
      </div>
    </Dialog>
  );
};

export default styled(MonsterChoice)`
  > div > div {
    max-width: 75%;
    min-width: 75%;
    min-height: 75%;
    max-height: 75%;
  }

  .top-buttons {
    display: flex;
    position: sticky;
    top: 0px;
    left: 0;
    z-index: 1;
  }
`;
