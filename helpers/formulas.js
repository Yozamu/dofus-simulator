const computeVieValue = (stats) => (stats.niveau || 200) * 5 + 50 + stats['vitalité'];

const computeInitiativeValue = (stats) => stats.force + stats.chance + stats.intelligence + stats['agilité'];

const computeTacleValue = (stats) => Math.floor(stats['agilité'] / 10);

const computeRetraitValue = (stats) => Math.floor(stats.sagesse / 10);

const computeProspectionValue = (stats) => Math.floor(100 + stats.chance / 100);

export const computeAddedStatFromCharacteristics = (stat, stats) => {
  switch (stat) {
    case 'vie':
      return computeVieValue(stats);
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
    default:
      return 0;
  }
};
