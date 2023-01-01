const computeVieValue = (stats) => (stats.niveau || 200) * 5 + 50 + stats['vitalité'] + (stats['parchovitalité'] || 0);

const computeMainStatValue = (stat, stats) => stats[`parcho${stat}`] || 0;

const computeInitiativeValue = (stats) => stats.force + stats.chance + stats.intelligence + stats['agilité'];

const computeTacleValue = (stats) => Math.floor(stats['agilité'] / 10);

const computeRetraitValue = (stats) => Math.floor(stats.sagesse / 10);

const computeProspectionValue = (stats) => Math.floor(100 + stats.chance / 100);

const computePaValue = (stats) => 6 + (stats.niveau > 99 ? 1 : 0) + (stats.exopa ? 1 : 0);
const computePmValue = (stats) => 3 + (stats.exopm ? 1 : 0);
const computePoValue = (stats) => (stats['exoportée'] ? 1 : 0);

export const computeAddedStatFromCharacteristics = (stat, stats) => {
  switch (stat) {
    case 'vie':
      return computeVieValue(stats);
    case 'vitalité':
    case 'sagesse':
    case 'force':
    case 'intelligence':
    case 'chance':
    case 'agilité':
      return computeMainStatValue(stat, stats);
    case 'initiative':
      return computeInitiativeValue(stats);
    case 'tacle':
    case 'fuite':
      return computeTacleValue(stats);
    case 'retraitpa':
    case 'retraitpm':
    case 'esquivepa':
    case 'esquivepm':
      return computeRetraitValue(stats);
    case 'prospection':
      return computeProspectionValue(stats);
    case 'pa':
      return computePaValue(stats);
    case 'pm':
      return computePmValue(stats);
    case 'portée':
      return computePoValue(stats);
    default:
      return 0;
  }
};

const getDamageMultiplier = (pow = 0, stat = 0) => (pow + stat + 100) / 100;
const getFixedDamage = (damage = 0, elemDamage = 0, critDamage = 0, isCrit) =>
  damage + elemDamage + isCrit ? critDamage : 0;
const getFixedRes = (fixedRes, critRes, isCrit) => (fixedRes + isCrit ? critRes : 0);
const getDamageWithRes = (damage, fixedRes, percentRes) => Math.floor(((damage - fixedRes) * (100 - percentRes)) / 100);
const getFinalDamage = (damage, ...bonuses) =>
  Math.floor(bonuses.reduce((acc, val) => acc * ((100 + val) / 100), damage));

export const computeDamage = (
  rawDamageLine = { min: 1, max: 2, type: 'force' },
  stats = {},
  targetStats,
  isCrit = false,
  isWeapon = false,
  isMelee = false,
  percentBonuses = []
) => {
  const { type, min, max } = rawDamageLine;
  const element = getStatCorrespondingElement(type);
  const multiplier = getDamageMultiplier(stats.puissance, stats[type]);
  const fixedDamage = getFixedDamage(stats.dommages, stats[`dommages${element}`], stats.dommagescritiques, isCrit);
  const damage = multiplier * getRandomIntInclusive(min, max) + fixedDamage;
  let fixedRes = 0,
    percentRes = 0;
  if (targetStats) {
    fixedRes = getFixedRes(targetStats[`résistance${element}`], targetStats['résistancecritique'], isCrit);
    percentRes = targetStats[`%résistance${element}`];
  }
  const damageWithRes = getDamageWithRes(damage, fixedRes, percentRes);
  const finalDamage = getFinalDamage(
    damageWithRes,
    isWeapon ? stats['%dommagesarmes'] : 0,
    stats['%dommagessorts'],
    isMelee ? stats['%dommagesmelee'] : stats['%dommagesdistance'],
    ...percentBonuses
  );
  return Math.max(0, finalDamage);
};
