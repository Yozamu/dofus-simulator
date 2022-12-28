import { TextField } from '@mui/material';

const NameFilter = ({ name, setName }) => {
  return (
    <div>
      <TextField
        label="Nom"
        variant="standard"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </div>
  );
};

export default NameFilter;
