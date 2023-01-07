import { Button, Radio, styled } from '@mui/material';
import Image from 'next/image';

const FightButtons = ({
  isFighting,
  startFight,
  stopFight,
  finishTurn,
  chooseEnemy,
  damageEntity,
  importData,
  exportData,
  damageType,
  setDamageType,
  ...props
}) => {
  const NotFighting = () => (
    <div className="fight-buttons">
      <Button onClick={startFight} variant="contained">
        Lancer le combat
      </Button>
      <Button onClick={chooseEnemy} variant="contained">
        Choisir monstre
      </Button>
      <Button onClick={importData} variant="contained">
        Importer données
      </Button>
      <Button onClick={exportData} variant="contained">
        Exporter données
      </Button>
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
