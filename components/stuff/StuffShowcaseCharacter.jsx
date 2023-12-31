import { Button, Dialog, DialogTitle, styled } from '@mui/material';
import { useState } from 'react';
import { DOFUS_CLASSES } from '../../helpers/constants';
import { setLocalStorageCharacteristics } from '../../helpers/localstorage';
import ReactGA from 'react-ga4';

const ClassSelectionDialog = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleClassClick = (value) => {
    onClose(value.toLowerCase());
    ReactGA.event({ category: 'Stuff page', action: 'Character selection', label: value });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Choix de la classe</DialogTitle>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {DOFUS_CLASSES.map((classe) => (
          <Button
            style={{ margin: '5px', padding: '0', border: '1px solid' }}
            key={classe}
            onClick={() => handleClassClick(classe)}
          >
            <img src={`/images/classes-icons/${classe.toLowerCase()}Icon.png`} alt={classe} width={64} height={64} />
          </Button>
        ))}
      </div>
    </Dialog>
  );
};

const StuffShowcaseCharacter = ({ characteristics, setCharacteristics, ...props }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { classe } = characteristics;

  const handleClose = (value) => {
    value && setLocalStorageCharacteristics('classe', value);
    setCharacteristics({ ...characteristics, classe: value });
    setDialogOpen(false);
  };

  return (
    <div className={props.className}>
      <img
        src={`/images/classes/${classe ?? 'pandawa'}.png`}
        alt="Character background"
        width={192}
        height={192}
        priority
      />
      <Button variant="outlined" onClick={() => setDialogOpen(true)}>
        Changer classe
      </Button>
      <ClassSelectionDialog selectedValue={classe} open={dialogOpen} onClose={handleClose} />
    </div>
  );
};

export default styled(StuffShowcaseCharacter)`
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
