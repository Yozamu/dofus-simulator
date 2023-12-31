import { TextField } from '@mui/material';

const NameFilter = ({ name, setName, ...props }) => {
  return (
    <div>
      <TextField
        id="name"
        label="Nom"
        variant="standard"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        {...props}
      />
    </div>
  );
};

export default NameFilter;
