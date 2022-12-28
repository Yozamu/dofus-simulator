import { FilterAlt } from '@mui/icons-material';
import { Button, Drawer, styled } from '@mui/material';
import { useState } from 'react';
import { EQUIPMENT } from '../../helpers/constants';
import CategoriesFilter from './CategoriesFilter';
import LevelFilter from './LevelFilter';
import NameFilter from './NameFilter';

const Filters = ({ setItems, ...props }) => {
  const [name, setName] = useState('');
  const [levelRange, setLevelRange] = useState([0, 200]);
  const [categories, setCategories] = useState(props.categories || []);
  const [stats, setStats] = useState([]);

  const handleFilteredSearch = async () => {
    let query = `api/items?type=${EQUIPMENT}&`;
    const queryParams = [];
    if (name) queryParams.push(`name=${name}`);
    queryParams.push(`level=${levelRange}`);
    if (categories.length > 0) queryParams.push(`categories=${categories}`);
    if (stats.length > 0) queryParams.push(`stats=${stats}`);
    query += queryParams.join('&');
    const res = await fetch(query);
    const json = await res.json();
    setItems(json.data);
  };

  return (
    <Drawer className={`${props.className} drawer`} variant="permanent">
      <Button variant="outlined" startIcon={<FilterAlt />} onClick={handleFilteredSearch}>
        Filtrer
      </Button>
      <NameFilter name={name} setName={setName} />
      <LevelFilter levelRange={levelRange} setLevelRange={setLevelRange} />
      <CategoriesFilter categories={categories} setCategories={setCategories} />
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
