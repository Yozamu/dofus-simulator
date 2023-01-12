import { styled } from '@mui/material';
import { DAMAGE_STATS, PRIMARY_STATS, RESISTANCE_STATS, SECONDARY_STATS } from '../../helpers/constants';
import { getSpellActionTypeFromName, normalizeStatName } from '../../helpers/utils';
import { computeAddedStatFromCharacteristics } from '../../helpers/formulas';
import StuffCharacteristicsAccordion from './StuffCharacteristicsAccordion';
import { useEffect, useState } from 'react';
import { setLocalStorageFinalStats } from '../../helpers/localstorage';

const StuffCharacteristics = ({ items, sets, characteristics, ...props }) => {
  const statsValues = {};
  Object.entries(items).map(([, items]) => {
    items.map((item) => {
      item.statistics?.map((statistic) => {
        const statRange = statistic[Object.keys(statistic)[0]];
        const statValue = statRange.max || statRange.min;
        const statName = normalizeStatName(Object.keys(statistic)[0]);
        statsValues[statName] ? (statsValues[statName] += statValue) : (statsValues[statName] = statValue);
      });
    });
  });
  Object.values(sets).map((set) => {
    set.bonus.map((statistic) => {
      const [statName, statValue] = statistic;
      statsValues[statName] ? (statsValues[statName] += +statValue) : (statsValues[statName] = +statValue);
    });
  });
  Object.entries(characteristics).map(([statistic, statValue]) => {
    statsValues[statistic] ? (statsValues[statistic] += statValue) : (statsValues[statistic] = statValue);
  });

  const computeStatFromItemsAndCharacteristics = (stat) => {
    let characteristicsValue = characteristics.stat || 0;
    let statName = normalizeStatName(stat);
    let itemsValue = statsValues[statName] || 0;
    let addedValue = computeAddedStatFromCharacteristics(statName, statsValues);
    return characteristicsValue + itemsValue + addedValue;
  };

  const primaryStats = PRIMARY_STATS.map((stat) => ({
    name: stat,
    value: computeStatFromItemsAndCharacteristics(stat),
  }));

  const secondaryStats = SECONDARY_STATS.map((stat) => ({
    name: stat,
    value: computeStatFromItemsAndCharacteristics(stat),
  }));

  const damageStats = DAMAGE_STATS.map((stat) => ({
    name: stat,
    value: computeStatFromItemsAndCharacteristics(stat),
  }));

  const resistanceStats = RESISTANCE_STATS.map((stat) => ({
    name: stat,
    value: computeStatFromItemsAndCharacteristics(stat),
  }));

  const getFormatedWeapon = (weapon) => {
    const { characteristics, statistics } = weapon;
    let [cost, , crit] = characteristics.map((characteristic) => Object.values(characteristic)[0]);
    cost = cost.split(' ');
    crit = crit.split(' ');
    const timesPerTurn = +cost[1].replace('(', '');
    cost = +cost[0];
    const critChance = (crit[0].split('/')[0] / crit[0].split('/')[1]) * 100;
    const critBonus = +crit[1].replace(/[()+]/g, '');
    const effectLines = statistics
      .filter((stat) => Object.keys(stat)[0].startsWith('('))
      .map((line) => {
        const [rawName, rawValue] = Object.entries(line)[0];
        const name = rawName.replace(/[()]/g, '');
        const type = getSpellActionTypeFromName(name.split(' ')[0]);
        const element = name.split(' ')[1].toLowerCase();
        return { type, element, amount: { min: rawValue.min, max: rawValue.max } };
      });
    const critEffects = effectLines.map((line) => {
      const { min, max } = line.amount;
      return { ...line, amount: { min: min + critBonus, max: max + critBonus } };
    });
    const formatedWeapon = {
      name: weapon.name,
      ankamaId: weapon.ankamaId,
      cost,
      timesPerTurn,
      critChance,
      effects: effectLines,
      critEffects,
    };
    return formatedWeapon;
  };

  useEffect(() => {
    const mergedStats = [...primaryStats, ...secondaryStats, ...damageStats, ...resistanceStats].map((val) => ({
      [normalizeStatName(val.name)]: val.value,
    }));
    const weapon = items.Arme?.length > 0 ? getFormatedWeapon(items.Arme[0]) : null;
    const finalStats = [{ classe: characteristics.classe }, { arme: weapon }, ...mergedStats];
    setLocalStorageFinalStats(JSON.stringify(Object.assign({}, ...finalStats)));
  }, [primaryStats, secondaryStats, damageStats, resistanceStats, characteristics.classe, items.Arme]);

  return (
    <div className={props.className}>
      <StuffCharacteristicsAccordion
        defaultExpanded={true}
        section="primary"
        title="Statistiques primaires"
        stats={primaryStats}
      />
      <StuffCharacteristicsAccordion section="secondary" title="Statistiques secondaires" stats={secondaryStats} />
      <StuffCharacteristicsAccordion section="damage" title="Dommages" stats={damageStats} />
      <StuffCharacteristicsAccordion section="resistance" title="Résistances" stats={resistanceStats} />
    </div>
  );
};

export default styled(StuffCharacteristics)`
  width: 500px;

  hr {
    border: 1px solid var(--background-lighter);
    width: 90%;
  }

  .stat-section {
    display: flex;
    flex-wrap: wrap;
  }

  .stat-line {
    display: flex;
    justify-content: space-between;
    min-width: 220px;
    flex-basis: 45%;
  }

  .stat-line:nth-of-type(odd) {
    margin-right: auto;
  }
`;
