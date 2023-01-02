import { styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { computeDamage } from '../../helpers/formulas';
import { getRandomIntInclusive } from '../../helpers/utils';
import FightButtons from './FightButtons';
import Fighter from './Fighter';
import FightNotifications from './FightNotifications';
import FightSpells from './FightSpells';

const Fight = ({ monsters, character, ...props }) => {
  const [isFigthing, setIsFighting] = useState(false);
  const [enemy, setEnemy] = useState({});
  const [turn, setTurn] = useState(0);
  const [fightingEntities, setFightingEntities] = useState([{}, {}]);
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const newNotifications = notifications;
    newNotifications.length > 100 ?? newNotifications.shift();
    newNotifications.push(notification);
    setNotifications(newNotifications);
  };

  const importData = () => {};

  const exportData = () => {};

  const initBaseStats = (stats) => {
    stats.basevie = stats.vie;
    stats.maxvie = stats.vie;
    stats.basepa = stats.pa;
    stats.basepm = stats.pm;
  };

  const initStats = () => {
    const { classe, level, ...stats } = character;
    stats.name = classe[0].toUpperCase() + classe.slice(1);
    initBaseStats(stats);
    const enemyStats = {
      ...Object.keys(stats).reduce((acc, val) => ({ ...acc, [val]: 0 })),
      name: enemy.name,
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
      { ...fightingEntities[0], pa: fightingEntities[0].basepa, pm: fightingEntities[0].basepm },
      { ...fightingEntities[1], pa: fightingEntities[1].basepa, pm: fightingEntities[1].basepm },
    ]);
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
    setIsFighting(false);
    setTurn(0);
    addNotification('<b style="color:var(--main)">Fin du combat</b>');
  };

  const damageEntity = (entity, percent) => {
    const entities = [...fightingEntities];
    const damage = Math.floor(entities[entity].maxvie * percent * 0.01);
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
    let totalDamage = 0,
      totalSteal = 0,
      totalHeal = 0;
    const isCrit = getRandomIntInclusive(1, 100) <= caster['%critique'] + spell.critique;
    let castedSpellNotif = `${caster.name} lance ${spell.name}`;
    let usedEffects = spell.effects;
    if (isCrit) {
      castedSpellNotif += ' <b>(Coup Critique!)</b>';
      usedEffects = spell.critEffects;
    }
    addNotification(castedSpellNotif);
    usedEffects.forEach((effect) => {
      const { type, element, amount } = effect;
      const rawDamageLine = { type: element, min: amount.min, max: amount.max };
      const damage = computeDamage(rawDamageLine, caster, target, isCrit, false, false, []);
      addNotification(
        `<span style='padding-left: 20px'>${target.name} <span style='color: var(--element-${element})'>-${damage}</span> PV</span>`
      );
      if (type == 'damage' || type == 'steal') totalDamage += damage;
      else if (type == 'heal') totalHeal += damage;
      if (type == 'steal') totalHeal += Math.floor(damage / 2);
    });
    const casterCopy = { ...caster };
    const targetCopy = { ...target };
    casterCopy.vie += totalSteal + totalHeal;
    casterCopy.pa -= spell.cost;
    targetCopy.vie -= Math.min(targetCopy.vie, totalDamage);
    checkForDeath(targetCopy);
    if (target === fightingEntities[1]) {
      setFightingEntities([casterCopy, targetCopy]);
    } else {
      setFightingEntities([targetCopy, casterCopy]);
    }
  };

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
        exportData={exportData}
      />
      <div className="spells-and-notif">
        <FightSpells
          character={character}
          fightingEntities={fightingEntities}
          castSpell={castSpell}
          isFighting={isFigthing}
        />
        <FightNotifications notifications={notifications} setNotifications={setNotifications} />
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

  .spells-and-notif {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .spells-and-notif > * {
    margin: 10px;
  }
`;
