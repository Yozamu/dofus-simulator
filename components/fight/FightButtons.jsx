import { FileDownload, UploadFile } from '@mui/icons-material';
import { Button, MenuItem, Radio, Select, styled } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { generateDownloadURL, handleFileUpload } from '../../helpers/files';
import ReactGA from 'react-ga4';

const GA_CATEGORY = 'Fight page';

const FightButtons = ({
  isFighting,
  startFight,
  stopFight,
  finishTurn,
  chooseEnemy,
  damageEntity,
  importData,
  character,
  damageType,
  setDamageType,
  enemySpells,
  castSpell,
  fightingEntities,
  ...props
}) => {
  const [fileDownloadUrl, setFileDownloadUrl] = useState('');
  const [selectedEnemySpell, setSelectedEnemySpell] = useState('');
  const doFileDownload = useRef(null);

  useEffect(() => {
    if (fileDownloadUrl !== '') {
      doFileDownload.current.click();
      URL.revokeObjectURL(fileDownloadUrl);
      setFileDownloadUrl('');
      ReactGA.event({ category: GA_CATEGORY, action: 'Export stats' });
    }
  }, [fileDownloadUrl]);

  const exportData = () => {
    setFileDownloadUrl(generateDownloadURL(character));
  };

  const castEnemySpell = () => {
    const spell = enemySpells.find((spell) => spell.ankamaId === selectedEnemySpell);
    if (!spell || fightingEntities[1].pa < spell.cost) return;
    castSpell(fightingEntities[1], fightingEntities[spell.target], spell);
  };

  const handleImport = (e) => {
    if (handleFileUpload(e, importData)) {
      ReactGA.event({ category: GA_CATEGORY, action: 'Import stats' });
    }
  };

  const NotFighting = () => (
    <div className="fight-buttons">
      <Button onClick={startFight} variant="contained">
        Lancer le combat
      </Button>
      <Button onClick={chooseEnemy} variant="contained">
        Choisir monstre
      </Button>
      <Button variant="contained" component="label" startIcon={<UploadFile />} sx={{ margin: '4px' }}>
        Importer données
        <input type="file" accept=".json" hidden onChange={(e) => handleImport(e)} />
      </Button>
      <Button onClick={exportData} variant="contained" startIcon={<FileDownload />}>
        Exporter données
      </Button>
      <a className="hidden" download="stats.json" href={fileDownloadUrl} ref={doFileDownload}>
        download
      </a>
    </div>
  );

  const Fighting = () => {
    const handleChange = (e) => {
      setDamageType(e.target.value);
    };

    const damageTypes = [
      { icon: <img src="/images/ui/stats/dommagesmêlée.png" alt="melee" width={32} height={32} />, name: 'melee' },
      {
        icon: <img src="/images/ui/stats/dommagesdistance.png" alt="distance" width={32} height={32} />,
        name: 'distance',
      },
    ];

    const EnemySpells = () => (
      <div className="enemy-spells">
        <Select value={selectedEnemySpell} onChange={(e) => setSelectedEnemySpell(e.target.value)}>
          {enemySpells.map((spell) => (
            <MenuItem key={spell.ankamaId} value={spell.ankamaId}>
              {spell.name}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={() => castEnemySpell()} variant="contained">
          <img src="/images/ui/weapons.png" alt="Attaque ennemie" width={32} height={32} />
        </Button>
      </div>
    );

    const NoEnemySpellButton = () => (
      <Button onClick={() => damageEntity(0, 10)} variant="contained">
        -10% personnage
      </Button>
    );

    return (
      <div className="fight-buttons">
        <Button onClick={stopFight} variant="contained">
          Arrêter le combat
        </Button>
        <Button onClick={finishTurn} variant="contained">
          Finir le tour
        </Button>
        {enemySpells ? <EnemySpells /> : <NoEnemySpellButton />}
        <div className="damage-type">
          {damageTypes.map((dmgType) => (
            <Radio
              key={dmgType.name}
              className={damageType === dmgType.name ? 'checked-damage-type' : ''}
              icon={dmgType.icon}
              checkedIcon={dmgType.icon}
              value={dmgType.name}
              checked={damageType === dmgType.name}
              name="radio-damage-type"
              onChange={handleChange}
            />
          ))}
        </div>
      </div>
    );
  };
  return <div className={props.className}>{isFighting ? <Fighting /> : <NotFighting />}</div>;
};

export default styled(FightButtons)`
  .fight-buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .fight-buttons > button:first-of-type {
    margin-right: 30px;
    font-weight: bold;
  }

  button {
    margin: 4px;
  }

  .damage-type {
    height: 42px;
  }

  .checked-damage-type {
    background-color: rgba(var(--main-rgb), 0.25);
  }

  .enemy-spells {
    display: flex;
    align-items: center;
    height: 42px;
    div {
      width: 200px;
      height: 40px;
      display: flex;
      align-items: center;
    }
    button {
      height: 40px;
    }
  }
`;
