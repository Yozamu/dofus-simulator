import { Avatar, Chip, Tooltip, styled } from '@mui/material';

const CharacteristicChip = ({ shortLabel, label, icon, isSelected, onClick, weight, ...props }) => {
  return (
    <Tooltip className={props.className} disableInteractive enterDelay={500} placement="top" title={label}>
      <Chip
        avatar={<Avatar alt={label} src={icon} />}
        label={`${shortLabel} (${weight})`}
        color={isSelected ? 'primary' : 'default'}
        onClick={onClick}
      />
    </Tooltip>
  );
};

export default styled(CharacteristicChip)`
  margin: 4px;
  width: 180px;
`;
