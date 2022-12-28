import { Button, Drawer, styled } from '@mui/material';
import { useState } from 'react';
import CategoriesFilter from './CategoriesFilter';
import LevelFilter from './LevelFilter';
import NameFilter from './NameFilter';

const Filters = (props) => {
  const [name, setName] = useState('');
  const [levelRange, setLevelRange] = useState([0, 200]);
  const [categories, setCategories] = useState(props.categories || []);
  const [stats, setStats] = useState([]);

  return (
    <Drawer className={`${props.className} drawer`} variant="permanent">
      <Button variant="outlined">Filtrer</Button>
      <NameFilter name={name} setName={setName} />
      <LevelFilter levelRange={levelRange} setLevelRange={setLevelRange} />
      {/* <CategoriesFilter categories={categories} setCategories={setCategories} /> */}
    </Drawer>
  );
};

export default styled(Filters)`
  > div {
    color: var(--foreground);
    background-color: var(--background-light);
    padding: 80px 8px 0 8px;
    width: 192px;
    z-index: auto;
  }

  > div > div {
    padding: 6px;
  }
`;
