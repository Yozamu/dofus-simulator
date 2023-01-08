import { computeDamage } from './formulas';
import { getRandomIntInclusive } from './utils';

const initBaseStats = (stats) => {
  const baseStats = { ...stats };
  stats.basestats = baseStats;
  stats.viemax = stats.vie;
  stats.buffs = [];
};

const getAdditionalEnemyStats = (enemy) => {
  const stats = {
    vie: enemy.statistics[0].PV.min,
    pa: enemy.statistics[1].PA.min,
    pm: enemy.statistics[2].PM.min,
    '%résistanceterre': enemy.resistances[0].Terre.min,
    '%résistanceair': enemy.resistances[1].Air.min,
    '%résistancefeu': enemy.resistances[2].Feu.min,
    '%résistanceeau': enemy.resistances[3].Eau.min,
    '%résistanceneutre': enemy.resistances[4].Neutre.min,
  };
  if (enemy.statistics.length > 3) {
    // Updated monster data with characs
    stats.force = enemy.statistics[3].Force.min;
    stats.intelligence = enemy.statistics[4].Intelligence.min;
    stats.chance = enemy.statistics[5].Chance.min;
    stats.agilité = enemy.statistics[6].Agilité.min;
    stats.sagesse = enemy.statistics[7].Sagesse.min;
  }
  return stats;
};

export const initFightersStats = (character, enemy) => {
  const { classe, level, ...stats } = character;
  if (classe) stats.name = classe[0].toUpperCase() + classe.slice(1);
  const additionalStats = getAdditionalEnemyStats(enemy);
  const enemyStats = {
    ...Object.keys(stats).reduce((acc, val) => ({ ...acc, [val]: 0 })),
    name: enemy.name,
    ...additionalStats,
  };
  initBaseStats(stats);
  initBaseStats(enemyStats);
  return [stats, enemyStats];
};

const applySpellEffect = (
  [totalDamage, totalHeal],
  spell,
  effect,
  caster,
  target,
  casterCopy,
  targetCopy,
  isCrit,
  damageType,
  addNotification
) => {
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
  } else if (totalDamage < target.vie) {
    const rawDamageLine = { type: element, min: amount.min, max: amount.max };
    const damage = Math.min(
      target.vie,
      computeDamage(rawDamageLine, caster, target, isCrit, false, damageType === 'melee', [])
    );
    addNotification(
      `<span style='padding-left: 20px'>${target.name} <span style='color: var(--element-${element})'>-${damage}</span> PV</span>`
    );
    if (type == 'damage' || type == 'steal') totalDamage += damage;
    else if (type == 'heal') totalHeal += damage;
    if (type == 'steal') totalHeal += Math.floor(damage / 2);
    totalHeal = Math.min(totalHeal, caster.viemax - caster.vie);
    if (totalHeal > 0) addNotification(`<span style='padding-left: 20px'>${caster.name} +${totalHeal} PV</span>`);
  }
  return [totalDamage, totalHeal];
};

export const castSpellOnEntity = (caster, target, spell, damageType, addNotification) => {
  let totalDamage = 0,
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
    [totalDamage, totalHeal] = applySpellEffect(
      [totalDamage, totalHeal],
      spell,
      effect,
      caster,
      target,
      casterCopy,
      targetCopy,
      isCrit,
      damageType,
      addNotification
    );
  });
  casterCopy.vie += totalHeal;
  casterCopy.pa -= spell.cost;
  targetCopy.vie -= totalDamage;
  return [casterCopy, targetCopy];
};

const getBuffsForStat = (buffs, stat) => {
  let res = 0;
  buffs.forEach((buff) => {
    if (stat === buff.stat) res += buff.amount;
  });
  return res;
};

export const resetEntityStatsAfterTurn = (entity) => {
  const entityCopy = { ...entity };
  entityCopy.buffs = entityCopy.buffs.filter((buff) => --buff.duration > 0);
  for (let [stat, value] of Object.entries(entity.basestats)) {
    if (stat.includes('vie') || stat === 'buffs' || stat == 'name') continue;
    entityCopy[stat] = value + getBuffsForStat(entityCopy.buffs, stat);
  }
  return entityCopy;
};
