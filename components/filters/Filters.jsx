import { RestartAlt } from '@mui/icons-material';
import { Button, Drawer, IconButton, Snackbar, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import CategoriesFilter from './CategoriesFilter';
import LevelFilter from './LevelFilter';
import NameFilter from './NameFilter';
import StatisticsFilter from './StatisticsFilter';
import Slide from '@mui/material/Slide';

const Filters = ({ setFilters, availableCategories, ...props }) => {
  const [name, setName] = useState('');
  const [levelRange, setLevelRange] = useState([1, 200]);
  const [categories, setCategories] = useState(props.categories || []);
  const [stats, setStats] = useState([]);
  const [snackbarIsOpened, setSnackbarIsOpened] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const filters = {
        level: levelRange,
      };
      if (name) filters.name = name;
      if (categories.length > 0) filters.categories = categories;
      if (stats.length > 0) filters.stats = stats;
      setFilters(filters);
    }, 500);
    return () => clearTimeout(timerId);
  }, [name, levelRange, categories, stats, setFilters]);

  const clearFilters = () => {
    setName('');
    setLevelRange([1, 200]);
    setCategories([]);
    setStats([]);
    setSnackbarIsOpened(true);
  };

  return (
    <Drawer className={`${props.className} drawer`} variant="permanent">
      <Button variant="contained" startIcon={<RestartAlt />} onClick={clearFilters}>
        Reset
      </Button>
      <NameFilter name={name} setName={setName} />
      <br />
      <LevelFilter levelRange={levelRange} setLevelRange={setLevelRange} />
      <CategoriesFilter
        categories={categories}
        setCategories={setCategories}
        availableCategories={availableCategories}
      />
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
