import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';

const availableCategories = ['Amulette', 'Anneau', 'Coiffe'];

const CategoriesFilter = ({ categories, setCategories }) => {
  return (
    <div>
      <FormControl sx={{ m: 1, width: 180 }}>
        <InputLabel id="categories-label">Catégories</InputLabel>
        <Select
          labelId="categories-label"
          id="categories"
          multiple
          value={categories}
          onChange={(e) => {
            const value = e.target.value;
            setCategories(typeof value === 'string' ? value.split(',') : value);
          }}
          input={<OutlinedInput label="Catégories" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {availableCategories.map((category) => (
            <MenuItem key={category} value={category}>
              <Checkbox checked={categories.indexOf(category) > -1} />
              <ListItemText primary={category} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CategoriesFilter;
