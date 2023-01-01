import { Button, LinearProgress, styled } from '@mui/material';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import Fighter from './Fighter';

const Fight = ({ monsters, character, ...props }) => {
  const [isFigthing, setIsFighting] = useState(false);
  const [enemy, setEnemy] = useState({});
  const [turn, setTurn] = useState(0);
  const [fightingEntities, setFightingEntities] = useState([{}, {}]);

  const initBaseStats = (stats) => {
    stats.basevie = stats.vie;
    stats.maxvie = stats.vie;
    stats.basepa = stats.pa;
    stats.basepm = stats.pm;
  };

  const initStats = () => {
    const { classe, level, ...stats } = character;
    initBaseStats(stats);
    const enemyStats = {
      ...Object.keys(stats).reduce((acc, val) => ({ ...acc, [val]: 0 })),
      vie: enemy.statistics[0].PV.min,
      pa: enemy.statistics[1].PA.min,
      pm: enemy.statistics[2].PM.min,
      '%résistanceterre': enemy.resistances[0].Terre.min,
      '%résistanceair': enemy.resistances[1].Air.min,
      '%résistancefeu': enemy.resistances[2].Feu.min,
      '%résistanceeau': enemy.resistances[3].Eau.min,
      '%résistanceneutre': enemy.resistances[4].Neutre.min,
    };
    initBaseStats(enemyStats);
    setFightingEntities([stats, enemyStats]);
  };

  useEffect(() => {
    const enemy = monsters.find((monster) => monster.ankamaId === 494);
    setEnemy(enemy);
  }, [monsters]);

  const chooseEnemy = () => {
    console.log('choose enemy', monsters, character, enemy);
    console.log('and ', fightingEntities[0], fightingEntities[1]);
  };

  const finishTurn = () => {
    setFightingEntities([
      { ...fightingEntities[0], pa: fightingEntities[0].basePa, pm: fightingEntities[0].basePm },
      { ...fightingEntities[0], pa: fightingEntities[1].basePa, pm: fightingEntities[1].basePm },
    ]);
    setTurn(turn + 1);
  };

  const startFight = () => {
    initStats();
    setIsFighting(true);
    setTurn(1);
  };

  const stopFight = () => {
    setIsFighting(false);
    setTurn(0);
  };

  const damageEntity = (entity, percent) => {
    const entities = [...fightingEntities];
    entities[entity].vie -= Math.floor(entities[entity].maxvie * percent * 0.01);
    setFightingEntities(entities);
  };

  const NonFightButtons = () => (
    <div className="fight-buttons">
      <Button onClick={startFight} variant="contained">
        Lancer le combat
      </Button>
      <Button onClick={chooseEnemy} variant="contained">
        Choisir monstre
      </Button>
    </div>
  );

  const FightButtons = () => (
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

  return (
    <div className={props.className}>
      <i>Combattre permet de tester un stuff sur un ennemi, mais celui-ci ne rendra pas les coups</i>
      <div className="fighters">
        <Fighter
          entity={fightingEntities[0]}
          isFighting={isFigthing}
          imagePath={`/images/classes/${character.classe}.png`}
        />
        {isFigthing ? <div>Tour {turn}</div> : <div>Combat arrêté</div>}
        <Fighter
          entity={fightingEntities[1]}
          isFighting={isFigthing}
          imagePath={`/images/monsters/${enemy.ankamaId}.png`}
        />
      </div>
      {isFigthing ? <FightButtons /> : <NonFightButtons />}
    </div>
  );
};

export default styled(Fight)`
  margin-top: 10px;

  .fighters {
    margin-top: 50px;
    display: flex;
    justify-content: space-evenly;
  }

  .fight-buttons {
    margin-top: 20px;
    text-align: center;
  }

  button {
    margin: 4px;
  }
`;
