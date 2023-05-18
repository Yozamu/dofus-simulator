import { Avatar, Chip, Tooltip, styled } from '@mui/material';
import { useEffect } from 'react';

const CharacteristicChip = ({ shortLabel, label, icon, isSelected, weight, ...props }) => {
  const chipId = `chip-${shortLabel}`;

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const chipElement = document.getElementById(chipId);
    chipElement.addEventListener('contextmenu', handleContextMenu);
    return () => {
      chipElement.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <Tooltip className={props.className} disableInteractive enterDelay={500} placement="top" title={label}>
      <Chip
        id={chipId}
        avatar={<Avatar alt={label} src={icon} />}
        label={`${shortLabel} (${weight})`}
        color={isSelected ? 'primary' : 'default'}
        {...props}
      />
    </Tooltip>
  );
};

export default styled(CharacteristicChip)`
  margin: 4px;
  width: 180px;
`;
