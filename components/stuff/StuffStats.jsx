import { Checkbox, styled, TextField, Typography } from '@mui/material';
import { MAIN_STATS } from '../../helpers/constants';
import { setLocalStorageCharacteristics } from '../../helpers/localstorage';
import { normalizeImageName } from '../../helpers/utils';

const StuffStats = ({ characteristics, setCharacteristics, ...props }) => {
  let pointsLeft = (characteristics?.niveau || 200) * 5 - 5;
  const { classe, niveau, ...characs } = characteristics;
  Object.entries(characs).forEach(([stat, value]) => {
    switch (stat) {
      case stat.match(/^exo|parcho/)?.input:
        break;
      case 'niveau':
        break;
      case 'vitalité':
        pointsLeft -= value;
        break;
      case 'sagesse':
        pointsLeft -= 3 * value;
        break;
      default:
        let val = value,
          cost = 1;
        while (val > 0) {
          const substract = Math.min(val, 100);
          pointsLeft -= substract * cost;
          val -= substract;
          cost++;
        }
    }
  });

  const setParcho = (isChecked, stat) => {
    const val = isChecked ? 100 : 0;
    updateStat(stat, val);
  };

  const setExo = (isChecked, stat) => {
    const val = isChecked ? 1 : 0;
    updateStat(stat, val);
  };

  const updateStat = (stat, val) => {
    setLocalStorageCharacteristics(stat, +val);
    setCharacteristics({ ...characteristics, [stat]: +val });
  };

  const exos = ['pa', 'pm', 'portée'];

  return (
    <div className={props.className}>
      <div className="container">
        <div className="charac-level">
          <Typography variant="h6">Caractéristiques</Typography>
          <div>
            <div>Niveau</div>
            <TextField
              id="level-value"
              onChange={(e) => updateStat('niveau', e.target.value)}
              size="small"
              sx={{ minWidth: '80px', maxWidth: '80px' }}
              type="number"
              value={characteristics['niveau'] ?? 200}
            />
          </div>
        </div>
        <hr />
        <div>Forgemagie exotique</div>
        <div className="fm-exo">
          {exos.map((exo) => (
            <div key={exo}>
              <img src={`/images/ui/stats/${exo}.png`} alt={`exo ${exo}`} width={32} height={32} />
              <Checkbox
                checked={characteristics[`exo${exo}`] > 0}
                onChange={(e) => setExo(e.target.checked, `exo${exo}`)}
              />
            </div>
          ))}
        </div>
        <hr />
        <div className="character-stats">
          {MAIN_STATS.map((stat) => {
            const statName = stat.toLowerCase();
            return (
              <div key={stat}>
                <div>
                  <img
                    src={`/images/ui/stats/${normalizeImageName(stat)}.png`}
                    alt={stat}
                    className="icon"
                    width={32}
                    height={32}
                  />
                  {stat}
                </div>
                <TextField
                  id={`${stat}-value`}
                  onChange={(e) => updateStat(statName, e.target.value)}
                  size="small"
                  sx={{ minWidth: '80px', maxWidth: '80px' }}
                  type="number"
                  value={characteristics[statName] ?? 0}
                />
                <div className="stat-scroll">
                  <img src={`/images/ui/parchemins/${statName}Parchemin.png`} alt={stat} width={32} height={32} />
                  <Checkbox
                    checked={characteristics[`parcho${statName}`] > 0}
                    onChange={(e) => setParcho(e.target.checked, `parcho${statName}`)}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <hr />
        <div>Points restants: {pointsLeft}</div>
      </div>
    </div>
  );
};

export default styled(StuffStats)`
  hr {
    border: solid 1px var(--background-lighter);
  }

  .charac-level {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .charac-level div {
    display: flex;
    align-items: center;
    margin: 0 2px;
  }

  .character-stats > div {
    display: flex;
    align-items: center;
  }

  .character-stats > div > div:first-of-type {
    width: 150px;
  }

  .stat-scroll {
    margin: 0 0 0 20px;
    display: flex;
    align-items: center;
  }

  .fm-exo {
    display: flex;
    align-items: center;
  }

  .fm-exo img {
    vertical-align: middle;
  }
`;
