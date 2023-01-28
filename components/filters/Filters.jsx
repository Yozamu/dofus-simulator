import { RestartAlt } from '@mui/icons-material';
import { Button, Drawer, Snackbar, styled } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import CategoriesFilter from './CategoriesFilter';
import LevelFilter from './LevelFilter';
import NameFilter from './NameFilter';
import StatisticsFilter from './StatisticsFilter';
import Slide from '@mui/material/Slide';
import { MOBILE_WIDTH_TRESHOLD } from '../../helpers/constants';

const Filters = ({ clientWidth, setFilters, availableCategories = [], initialFilters = {}, ...props }) => {
  const [name, setName] = useState(initialFilters.name || '');
  const [levelRange, setLevelRange] = useState(initialFilters.level || [1, 200]);
  const [categories, setCategories] = useState(initialFilters.categories?.split(',') || []);
  const [stats, setStats] = useState(initialFilters.stats || []);
  const [snackbarIsOpened, setSnackbarIsOpened] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!setFilters) return;
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
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
        {clientWidth > MOBILE_WIDTH_TRESHOLD && 'Reset'}
      </Button>
      <NameFilter name={name} setName={setName} />
      <br />
      <LevelFilter levelRange={levelRange} setLevelRange={setLevelRange} />
      <CategoriesFilter
        categories={categories}
        setCategories={setCategories}
        availableCategories={availableCategories}
      />
      <StatisticsFilter stats={stats} setStats={setStats} clientWidth={clientWidth} />
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
    width: ${(props) => (props.clientWidth > MOBILE_WIDTH_TRESHOLD ? 192 : 96)}px;
  }

  > div > div {
    padding: 6px;
  }
`;
