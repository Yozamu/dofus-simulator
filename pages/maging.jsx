import { Button, Slider, TextField, Typography, styled } from '@mui/material';
import Head from 'next/head';
import CharacteristicChip from '../components/maging/CharacteristicChip';
import { useState } from 'react';

const MagingPage = ({ className }) => {
  const chips = [
    { label: 'Initiative', shortLabel: 'Ini', icon: 'initiative', weight: 0.1 },
    { label: 'Vitalité', shortLabel: 'Vita', icon: 'vitalité', weight: 0.2 },
    { label: 'Pods', shortLabel: 'Pods', icon: 'pods', weight: 0.25 },
    { label: 'Caractéristiques primaires', shortLabel: 'Elem', icon: 'force', weight: 1 },
    { label: 'Puissance, Puissance pièges, Résistance fixe', shortLabel: 'Pui / Res', icon: 'puissance', weight: 2 },
    { label: 'Sagesse, Prospection', shortLabel: 'Sa / Prospe', icon: 'sagesse', weight: 3 },
    { label: 'Tacle, Fuite', shortLabel: 'Tac / Fui', icon: 'tacle', weight: 4 },
    { label: 'Dommages élémentaires, Chasse', shortLabel: 'Do elem / Chasse', icon: 'dommagesterre', weight: 5 },
    { label: 'Résistance élémentaire %', shortLabel: 'Ré %', icon: 'résistanceterre', weight: 6 },
    { label: 'Retrait PA / PM, Esquive PA / PM', shortLabel: 'Ret/Esq PA/PM', icon: 'retraitpa', weight: 7 },
    { label: 'Critique, Soin, Renvoi', shortLabel: 'Cri / So', icon: 'critique', weight: 10 },
    {
      label: 'Dommages %, Résistance % (mêlée, distance)',
      shortLabel: 'Do % / Res % spé',
      icon: 'dommagesdistance',
      weight: 15,
    },
    { label: 'Dommages', shortLabel: 'Do', icon: 'dommages', weight: 20 },
    { label: 'Invocation', shortLabel: 'Invoc', icon: 'invocations', weight: 30 },
    { label: 'Portée', shortLabel: 'PO', icon: 'portée', weight: 51 },
    { label: 'PM', shortLabel: 'PM', icon: 'pm', weight: 90 },
    { label: 'PA', shortLabel: 'PA', icon: 'pa', weight: 100 },
  ];
  const [puits, setPuits] = useState(0);
  const [selectedChip, setSelectedChip] = useState(null);
  const [addedValue, setAddedValue] = useState(0);
  const sliderStep = selectedChip ? Math.max(1, 1 / selectedChip.weight) : 1;
  const sliderRange = 20 * sliderStep;

  const updatePuits = () => {
    if (!selectedChip) return;
    setPuits((prevPuits) => prevPuits - addedValue * selectedChip.weight);
    setAddedValue(0);
    setSelectedChip(null);
  };

  const handleChipClick = (chip, e) => {
    const added = e ? -1 : 1;
    if (selectedChip && chip.label === selectedChip.label) {
      setPuits((prevPuits) => prevPuits - added * selectedChip.weight);
      setSelectedChip(null);
    } else setSelectedChip(chip);
  };

  return (
    <>
      <Head>
        <title>Dofus Simulator - Forgemagie</title>
      </Head>
      <div className={`${className} container`}>
        <Typography variant="h5">Forgemagie</Typography>
        <hr />
        <div className="puits">
          <Typography variant="h6">{puits}</Typography>
          <em>Puits actuel</em>
        </div>
        <div className="chips">
          {chips?.map((chip) => (
            <CharacteristicChip
              label={chip.label}
              shortLabel={chip.shortLabel}
              icon={`/images/ui/stats/${chip.icon}.png`}
              isSelected={selectedChip?.label === chip.label}
              onClick={() => handleChipClick(chip)}
              onAuxClick={(e) => handleChipClick(chip, e)}
              weight={chip.weight}
            />
          ))}
        </div>
        <Slider
          defaultValue={addedValue}
          step={sliderStep}
          marks
          min={-sliderRange}
          max={sliderRange}
          onChange={(e, val) => setAddedValue(val)}
          value={addedValue}
        />
        <div className="slider-values">
          <div>Min: -{sliderRange}</div>
          <div>
            Valeur ajoutée
            <TextField
              type="number"
              onChange={(e) => setAddedValue(e.target.value)}
              size="small"
              value={addedValue}
              style={{ width: 100 }}
            />
          </div>
          <div>Max: {sliderRange}</div>
        </div>
        <Button variant="contained" onClick={updatePuits}>
          Actualiser le puits
        </Button>
      </div>
    </>
  );
};

export default styled(MagingPage)`
  width: 50%;
  margin: auto;
  text-align: center;

  .puits {
    background-color: var(--background-lighter);
    border: solid 1px black;
    margin: 8px;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 10px 0;
  }

  .slider-values {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    align-items: center;

    div {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
`;
