import { FileDownload, UploadFile } from '@mui/icons-material';
import { Button, Radio, styled } from '@mui/material';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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
  ...props
}) => {
  const [fileDownloadUrl, setFileDownloadUrl] = useState('');
  const doFileDownload = useRef(null);

  useEffect(() => {
    if (fileDownloadUrl !== '') {
      doFileDownload.current.click();
      URL.revokeObjectURL(fileDownloadUrl);
      setFileDownloadUrl('');
    }
  }, [fileDownloadUrl]);

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        return;
      }
      const { result } = evt.target;
      importData(JSON.parse(result));
    };
    reader.readAsText(file);
  };

  const exportData = () => {
    const data = JSON.stringify(character);
    const blob = new Blob([data]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    setFileDownloadUrl(fileDownloadUrl);
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
        <input type="file" accept=".json" hidden onChange={handleFileUpload} />
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
      { icon: <Image src="/images/ui/stats/dommagesmêlée.png" alt="melee" width={32} height={32} />, name: 'melee' },
      {
        icon: <Image src="/images/ui/stats/dommagesdistance.png" alt="distance" width={32} height={32} />,
        name: 'distance',
      },
    ];

    return (
      <div className="fight-buttons">
        <Button onClick={stopFight} variant="contained">
          Arrêter le combat
        </Button>
        <Button onClick={finishTurn} variant="contained">
          Finir le tour
        </Button>
        <Button onClick={() => damageEntity(0, 10)} variant="contained">
          -10% personnage
        </Button>
        <div>
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

  .checked-damage-type {
    background-color: rgba(var(--main-rgb), 0.25);
  }
`;
