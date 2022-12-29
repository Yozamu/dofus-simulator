import { FilterAlt, RestartAlt } from '@mui/icons-material';
import { Button, Drawer, IconButton, Snackbar, styled } from '@mui/material';
import { useState } from 'react';
import { EQUIPMENT } from '../../helpers/constants';
import CategoriesFilter from './CategoriesFilter';
import LevelFilter from './LevelFilter';
import NameFilter from './NameFilter';
import StatisticsFilter from './StatisticsFilter';
import Slide from '@mui/material/Slide';

const Filters = ({ setItems, ...props }) => {
  const [name, setName] = useState('');
  const [levelRange, setLevelRange] = useState([1, 200]);
  const [categories, setCategories] = useState(props.categories || []);
  const [stats, setStats] = useState([]);
  const [snackbarIsOpened, setSnackbarIsOpened] = useState(false);

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
    window.scrollTo(0, 0);
  };

  const clearFilters = () => {
    setName('');
    setLevelRange([1, 200]);
    setCategories([]);
    setStats([]);
    setSnackbarIsOpened(true);
  };

  return (
    <Drawer className={`${props.className} drawer`} variant="permanent">
      <div>
        <IconButton color="primary" aria-label="upload picture" component="label" onClick={clearFilters}>
          <RestartAlt />
        </IconButton>
        <Button variant="contained" startIcon={<FilterAlt />} onClick={handleFilteredSearch}>
          Filtrer
        </Button>
      </div>
      <NameFilter name={name} setName={setName} />
      <br />
      <LevelFilter levelRange={levelRange} setLevelRange={setLevelRange} />
      <CategoriesFilter categories={categories} setCategories={setCategories} />
      <StatisticsFilter stats={stats} setStats={setStats} />
      <Snackbar
        open={snackbarIsOpened}
        autoHideDuration={1000}
        onClose={() => setSnackbarIsOpened(false)}
        message="Filtres effacés"
        TransitionComponent={Slide}
      />
    </Drawer>
  );
};

export default styled(Filters)`
  > div {
    color: var(--foreground);
    background-color: var(--background-light);
    padding: 80px 8px 0 8px;
    width: 192px;
  }

  > div > div {
    padding: 6px;
  }
`;
