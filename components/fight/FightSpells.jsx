import { Button, styled, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getFormattedStatName, getSpellActionTypeName } from '../../helpers/utils';

const FightSpells = ({ character, fightingEntities, castSpell, isFighting, turn, ...props }) => {
  const [spells, setSpells] = useState([]);

  useEffect(() => {
    const spellsCopy = [...spells];
    spellsCopy.map(
      (spell) =>
        (spell.currentValues = {
          timesPerTurn: 0,
          timesPerTarget: 0,
          cooldown: turn <= 1 ? 0 : spell.currentValues.cooldown - 1,
        })
    );
    setSpells(spellsCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn]);

  const isSpellOnCooldown = (spell) => {
    const { timesPerTurn, timesPerTarget, cooldown } = spell.currentValues;
    const isPerTargetLimitReached = spell.timesPerTurn > 0 && timesPerTurn >= spell.timesPerTurn;
    const isPerTurnLimitReached = spell.timesPerTarget > 0 && timesPerTarget >= spell.timesPerTarget;
    return isPerTargetLimitReached || isPerTurnLimitReached || cooldown > 0;
  };

  const handleSpellClick = (spell) => {
    if (!isFighting || isSpellOnCooldown(spell)) return;
    const { timesPerTurn, timesPerTarget } = spell.currentValues;
    const spellsCopy = [...spells];
    const spellIndex = spells.findIndex((s) => s._id === spell._id);
    const updatedSpell = {
      ...spellsCopy[spellIndex],
      currentValues: { timesPerTurn: timesPerTurn + 1, timesPerTarget: timesPerTarget + 1, cooldown: spell.cooldown },
    };
    spellsCopy.splice(spellIndex, 1, updatedSpell);
    setSpells(spellsCopy);
    castSpell(fightingEntities[0], fightingEntities[spell.target], spell);
  };

  useEffect(() => {
    if (!character.classe) return;
    const commonSpells = [];
    if (character.arme) {
      const { ankamaId, cost, critChance, effects, critEffects, name, timesPerTurn } = character.arme;
      commonSpells.push({
        _id: ankamaId,
        name,
        icon: `/images/weapons/${ankamaId}.png`,
        cost,
        crit: critChance,
        target: 1,
        timesPerTurn,
        timesPerTarget: timesPerTurn,
        cooldown: 0,
        effects,
        critEffects,
        currentValues: {
          timesPerTurn: 0,
          timesPerTarget: 0,
          cooldown: 0,
        },
      });
    }

    fetch(`/api/spells?classe=${character.classe}`)
      .then((res) => res.json())
      .then((json) =>
        setSpells(
          commonSpells.concat(
            json.data.map((spell) => ({
              ...spell,
              icon: `/images/spells/${character.classe}/${spell._id}.png`,
              currentValues: {
                timesPerTurn: 0,
                timesPerTarget: 0,
                cooldown: 0,
              },
            }))
          )
        )
      );
  }, [character]);

  const TooltipEffectList = ({ effects }) => (
    <ul>
      {effects.map((effect, i) => (
        <li key={i}>
          <Typography variant="body1">
            {effect.type === 'buff'
              ? `${effect.amount} ${getFormattedStatName(effect.stat)} (${effect.duration} tours)`
              : `${effect.amount.min} - ${effect.amount.max} (${getSpellActionTypeName(effect.type)} ${
                  effect.element
                })`}
          </Typography>
        </li>
      ))}
    </ul>
  );

  const TooltipContent = ({ spell }) => (
    <div>
      <Typography variant="h6">
        {spell.name}
        <hr />
      </Typography>
      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
        Coût: {spell.cost} <img src="/images/ui/stats/pa.png" alt="PA" width={32} height={32} />
        {spell.crit ? `Critique: ${Math.round(spell.crit)}%` : ''}
      </Typography>
      <Typography variant="body1">
        {spell.cooldown > 0
          ? `Cooldown: ${spell.cooldown} tours`
          : `Lancers par tour: ${Math.min(spell.timesPerTarget, spell.timesPerTurn)}`}
      </Typography>
      <hr />
      <Typography variant="body1">Effets de base</Typography>
      <TooltipEffectList effects={spell.effects} />
      {spell.critEffects && (
        <>
          <Typography variant="body1">Effets critiques</Typography>
          <TooltipEffectList effects={spell.critEffects} />
        </>
      )}
    </div>
  );

  return (
    <div className={props.className}>
      <div className="container">
        <Typography variant="h6">Spells</Typography>
        <div className="spells">
          {spells.map((spell) => (
            <div key={spell._id}>
              <Tooltip placement="top" enterDelay={500} disableInteractive title={<TooltipContent spell={spell} />}>
                <span style={{ position: 'relative' }}>
                  <Button
                    disabled={spell.cost > fightingEntities[0].pa || isSpellOnCooldown(spell)}
                    onClick={() => {
                      handleSpellClick(spell);
                    }}
                  >
                    <img src={spell.icon} alt={spell.name} width={55} height={55} />
                  </Button>
                  {spell.currentValues.cooldown > 0 && (
                    <Typography variant="h6" className="spell-cooldown">
                      {spell.currentValues.cooldown}
                    </Typography>
                  )}
                </span>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default styled(FightSpells)`
  .container {
    width: 500px;
  }

  .spells {
    display: flex;
  }

  .spell-cooldown {
    position: absolute;
    top: -16px;
    right: 8px;
  }

  button {
    padding: 0;
  }

  button:disabled {
    opacity: 20%;
  }
`;
