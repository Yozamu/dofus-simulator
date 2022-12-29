import { styled, ToggleButton } from '@mui/material';
import Image from 'next/image';

const availableStatistics = [
  { name: 'vitalité' },
  { name: 'sagesse' },
  { name: 'force' },
  { name: 'intelligence' },
  { name: 'chance' },
  { name: 'agilité' },
  { name: 'pa' },
  { name: 'pm' },
  { name: 'portée' },
  { name: '% critique' },
  { name: 'invocations' },
  { name: 'initiative' },
].map((stat) => ({ ...stat, icon: stat.name.replace('% ', '') }));

const StatisticsFilter = ({ stats = [], setStats, ...props }) => {
  const handleStatToggle = (stat) => {
    if (stats.includes(stat)) {
      setStats(stats.filter((statistic) => statistic !== stat));
    } else {
      setStats([...stats, stat]);
    }
  };

  return (
    <div className={props.className}>
      {availableStatistics.map((stat) => (
        <ToggleButton
          color="primary"
          key={stat.name}
          selected={stats.includes(stat.name)}
          onChange={(e) => handleStatToggle(stat.name)}
          value={stat.name}
        >
          <Image src={`/images/ui/stats/${stat.icon}.png`} alt={stat} width={24} height={24} />
          {stat.name}
        </ToggleButton>
      ))}
    </div>
  );
};

export default styled(StatisticsFilter)`
  button {
    padding: 2px;
    width: 150px;
    justify-content: flex-start;
  }
`;
