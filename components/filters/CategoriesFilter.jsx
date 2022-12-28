import { Checkbox, ListItemText, MenuItem, Select } from '@mui/material';

const availableCategories = ['Amulette', 'Anneau', 'Coiffe'];

const CategoriesFilter = ({ categories, setCategories }) => {
  return (
    <div>
      <div>Catégorie</div>
      <Select
        multiple
        value={categories}
        onChange={(e) => {
          const value = e.target.value;
          setCategories(typeof value === 'string' ? value.split(',') : value);
        }}
      >
        {availableCategories.map((category) => (
          <MenuItem key={category} value={category}>
            <Checkbox checked={categories.indexOf(category) > -1} />
            <ListItemText primary={category} />
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default CategoriesFilter;
