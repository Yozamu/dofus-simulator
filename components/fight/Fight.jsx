import { styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { computeDamage } from '../../helpers/formulas';
import { getRandomIntInclusive } from '../../helpers/utils';
import FightButtons from './FightButtons';
import Fighter from './Fighter';
import FightNotifications from './FightNotifications';
import FightSpells from './FightSpells';
import MonsterChoice from './MonsterChoice';

const Fight = ({ monsters, character, ...props }) => {
  const [isFigthing, setIsFighting] = useState(false);
  const [usedCharacter, setUsedCharacter] = useState(character);
  const [enemy, setEnemy] = useState(null);
  const [turn, setTurn] = useState(0);
  const [damageType, setDamageType] = useState('distance');
  const [fightingEntities, setFightingEntities] = useState([{}, {}]);
  const [notifications, setNotifications] = useState([]);
  const [monsterDialogOpen, setMonsterDialogOpen] = useState(false);

  useEffect(() => {
    if (!enemy) return;
    initStats();
  }, [enemy]);

  useEffect(() => {
    const enemy = monsters.find((monster) => monster.ankamaId === 494);
    setEnemy(enemy);
  }, [monsters]);

  const handleMonsterChoiceClose = (value) => {
    if (!value) return;
    setEnemy(value);
    setMonsterDialogOpen(false);
  };

  const addNotification = (notification) => {
    const newNotifications = notifications;
    newNotifications.length > 100 ?? newNotifications.shift();
    newNotifications.push(notification);
    setNotifications(newNotifications);
  };

  const importData = () => {
    console.log('TODO: import data');
    // import all stats as query
    // setUsedCharacter, setEnemy
  };

  const exportData = () => {
    console.log('TODO: export data');
    console.log(usedCharacter, enemy);
  };

  const chooseEnemy = () => {
    setMonsterDialogOpen(true);
  };

  const initBaseStats = (stats) => {
    const baseStats = { ...stats };
    stats.basestats = baseStats;
    stats.viemax = stats.vie;
    stats.buffs = [];
  };

  const initStats = () => {
    const { classe, level, ...stats } = usedCharacter;
    stats.name = classe[0].toUpperCase() + classe.slice(1);
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
    initBaseStats(stats);
    initBaseStats(enemyStats);
    setFightingEntities([stats, enemyStats]);
  };

  const getBuffsForStat = (buffs, stat) => {
    let res = 0;
    buffs.forEach((buff) => {
      if (stat === buff.stat) res += buff.amount;
    });
    return res;
  };

  const resetEntityStatsAfterTurn = (entity) => {
    const entityCopy = { ...entity };
    entityCopy.buffs = entityCopy.buffs.filter((buff) => --buff.duration > 0);
    for (let [stat, value] of Object.entries(entity.basestats)) {
      if (stat.includes('vie') || stat === 'buffs' || stat == 'name') continue;
      entityCopy[stat] = value + getBuffsForStat(entityCopy.buffs, stat);
    }
    return entityCopy;
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
    let totalDamage = 0,
      totalSteal = 0,
      totalHeal = 0;
    const isCrit = getRandomIntInclusive(1, 100) <= caster['%critique'] + (spell.crit || -1000);
    let castedSpellNotif = `${caster.name} lance ${spell.name}`;
    let usedEffects = spell.effects;
    if (isCrit) {
      castedSpellNotif += ' <b>(Coup Critique!)</b>';
      usedEffects = spell.critEffects;
    }
    addNotification(castedSpellNotif);
    const casterCopy = { ...caster };
    const targetCopy = caster === target ? casterCopy : { ...target };
    usedEffects.forEach((effect) => {
      const { type, element, amount, duration, stat } = effect;
      if (type === 'buff') {
        target.buffs.push({
          duration,
          stat: stat,
          amount,
          name: spell.name,
        });
        addNotification(
          `<span style='padding-left: 20px'>${target.name} ${amount > 0 ? '+' : '-'}${Math.abs(
            amount
          )} ${stat} (${duration} tour(s))</span>`
        );
        target === caster ? (casterCopy[stat] += amount) : (targetCopy[stat] += amount);
      } else {
        const rawDamageLine = { type: element, min: amount.min, max: amount.max };
        const damage = computeDamage(rawDamageLine, caster, target, isCrit, false, damageType === 'melee', []);
        addNotification(
          `<span style='padding-left: 20px'>${target.name} <span style='color: var(--element-${element})'>-${damage}</span> PV</span>`
        );
        if (type == 'damage' || type == 'steal') totalDamage += damage;
        else if (type == 'heal') totalHeal += damage;
        if (type == 'steal') totalHeal += Math.floor(damage / 2);
      }
    });
    casterCopy.vie += totalSteal + totalHeal;
    casterCopy.pa -= spell.cost;
    targetCopy.vie -= Math.min(targetCopy.vie, totalDamage);
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
        {isFigthing ? <div>Tour {turn}</div> : <div>Combat arrêté</div>}
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
        exportData={exportData}
        damageType={damageType}
        setDamageType={setDamageType}
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

  .spells-and-notif {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .spells-and-notif > * {
    margin: 10px;
  }
`;
