import { styled } from '@mui/material';
import { DAMAGE_STATS, PRIMARY_STATS, RESISTANCE_STATS, SECONDARY_STATS } from '../../helpers/constants';
import { normalizeStatName } from '../../helpers/utils';
import { computeAddedStatFromCharacteristics } from '../../helpers/formulas';
import StuffCharacteristicsAccordion from './StuffCharacteristicsAccordion';

const StuffCharacteristics = ({ items, characteristics, ...props }) => {
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

  .stat-line:nth-child(odd) {
    margin-right: auto;
  }
`;
