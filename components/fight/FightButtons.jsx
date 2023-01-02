import { Button, styled } from '@mui/material';

const FightButtons = ({
  isFighting,
  startFight,
  stopFight,
  finishTurn,
  chooseEnemy,
  damageEntity,
  importData,
  exportData,
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

  const Fighting = () => (
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
      <Button onClick={() => damageEntity(1, 10)} variant="contained">
        -10% monstre
      </Button>
    </div>
  );
  return <div className={props.className}>{isFighting ? <Fighting /> : <NotFighting />}</div>;
};

export default styled(FightButtons)`
  .fight-buttons {
    margin-top: 20px;
    text-align: center;
  }

  .fight-buttons > button:first-of-type {
    margin-right: 30px;
    font-weight: bold;
  }

  button {
    margin: 4px;
  }
`;
