import { styled } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { castSpellOnEntity, initFightersStats, resetEntityStatsAfterTurn } from '../../helpers/fight';
import FightButtons from './FightButtons';
import Fighter from './Fighter';
import FightNotifications from './FightNotifications';
import FightSpells from './FightSpells';
import MonsterChoice from './MonsterChoice';

const Fight = ({ monsters, character, ...props }) => {
  const [isFigthing, setIsFighting] = useState(false);
  const [usedCharacter, setUsedCharacter] = useState(character);
  const [enemy, setEnemy] = useState(monsters.find((monster) => monster.ankamaId === 494));
  const [enemySpells, setEnemySpells] = useState(null);
  const [turn, setTurn] = useState(0);
  const [damageType, setDamageType] = useState('distance');
  const [fightingEntities, setFightingEntities] = useState([{}, {}]);
  const [notifications, setNotifications] = useState([]);
  const [monsterDialogOpen, setMonsterDialogOpen] = useState(false);

  const updateSelectedEnemy = (selectedEnemy) => {
    fetch(`/api/monsters/${selectedEnemy.ankamaId}/spells`)
      .then((res) => res.json())
      .then((json) => {
        setEnemy(selectedEnemy);
        setEnemySpells(json.data);
      });
  };

  const initStats = useCallback(() => {
    const [stats, enemyStats] = initFightersStats(usedCharacter, enemy);
    setFightingEntities([stats, enemyStats]);
  }, [enemy, usedCharacter]);

  const handleMonsterChoiceClose = (value) => {
    if (!value) return;
    updateSelectedEnemy(value);
    setMonsterDialogOpen(false);
  };

  const addNotification = (notification) => {
    const newNotifications = notifications;
    newNotifications.length > 100 ?? newNotifications.shift();
    newNotifications.push(notification);
    setNotifications(newNotifications);
  };

  const importData = (data) => {
    setUsedCharacter(data);
  };

  const chooseEnemy = () => {
    setMonsterDialogOpen(true);
  };

  const finishTurn = () => {
    const characterCopy = resetEntityStatsAfterTurn(fightingEntities[0]);
    const enemyCopy = resetEntityStatsAfterTurn(fightingEntities[1]);
    setFightingEntities([characterCopy, enemyCopy]);
    addNotification(`<b style="color:var(--main)">Début du tour ${turn + 1}</b>`);
    setTurn(turn + 1);
  };

  const startFight = () => {
    initStats();
    setIsFighting(true);
    setTurn(1);
    addNotification('<b style="color:var(--main)">Début du combat</b>');
  };

  const stopFight = () => {
    initStats();
    setIsFighting(false);
    setTurn(0);
    addNotification('<b style="color:var(--main)">Fin du combat</b>');
  };

  const damageEntity = (entity, percent) => {
    const entities = [...fightingEntities];
    const damage = Math.floor(entities[entity].viemax * percent * 0.01);
    entities[entity].vie -= damage;
    addNotification(`Dommages infligés à <i>${entities[entity].name}</i>: ${damage}`);
    setFightingEntities(entities);
    checkForDeath(entities[entity]);
  };

  const checkForDeath = (entity) => {
    if (entity.vie < 1) {
      addNotification(`${entity.name} est mort !`);
      stopFight();
    }
  };

  const castSpell = (caster, target, spell) => {
    const [casterCopy, targetCopy] = castSpellOnEntity(caster, target, spell, damageType, addNotification);
    checkForDeath(targetCopy);
    const newFightingEntities = [];
    newFightingEntities.push(
      fightingEntities[0] === target ? targetCopy : fightingEntities[0] === caster ? casterCopy : fightingEntities[0]
    );
    newFightingEntities.push(
      fightingEntities[1] === target ? targetCopy : fightingEntities[1] === caster ? casterCopy : fightingEntities[1]
    );
    setFightingEntities(newFightingEntities);
  };

  return (
    <div className={props.className}>
      <i>Combattre permet de tester un stuff sur un ennemi, mais celui-ci ne rendra pas les coups</i>
      <div className="fighters">
        <Fighter
          entity={fightingEntities[0]}
          isFighting={isFigthing}
          imagePath={`/images/classes/${usedCharacter.classe}.png`}
        />
        <div className="between-fighters">{isFigthing ? <>Tour {turn}</> : <>Combat arrêté</>}</div>
        <Fighter
          entity={fightingEntities[1]}
          isFighting={isFigthing}
          imagePath={`/images/monsters/${enemy?.ankamaId || '494'}.png`}
          scaleX={-1}
        />
      </div>
      <FightButtons
        isFighting={isFigthing}
        startFight={startFight}
        stopFight={stopFight}
        finishTurn={finishTurn}
        chooseEnemy={chooseEnemy}
        damageEntity={damageEntity}
        importData={importData}
        character={usedCharacter}
        damageType={damageType}
        setDamageType={setDamageType}
        enemySpells={enemySpells}
        castSpell={castSpell}
        fightingEntities={fightingEntities}
      />
      <div className="spells-and-notif">
        <FightSpells
          character={usedCharacter}
          fightingEntities={fightingEntities}
          castSpell={castSpell}
          isFighting={isFigthing}
          turn={turn}
        />
        <FightNotifications notifications={notifications} setNotifications={setNotifications} />
        <MonsterChoice
          monsters={monsters}
          open={monsterDialogOpen}
          onClose={handleMonsterChoiceClose}
          selectedValue={enemy}
        />
      </div>
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

  .between-fighters {
    width: 150px;
    text-align: center;
  }

  .spells-and-notif {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .spells-and-notif > * {
    margin: 10px;
  }
`;
