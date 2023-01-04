import { Button, styled, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getFormattedStatName, getSpellActionTypeName } from '../../helpers/utils';

const FightSpells = ({ character, fightingEntities, castSpell, isFighting, ...props }) => {
  const [spells, setSpells] = useState([]);

  const handleSpellClick = (spell) => {
    if (!isFighting) return;
    castSpell(fightingEntities[0], fightingEntities[spell.target], spell);
  };

  useEffect(() => {
    fetch(`/api/spells?classe=${character.classe}`)
      .then((res) => res.json())
      .then((json) => setSpells(json.data));
  }, [character]);

  const TooltipEffectList = ({ effects }) => (
    <ul>
      {effects.map((effect, i) => (
        <li key={i}>
          <Typography variant="body2">
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
        Coût: {spell.cost} <Image src="/images/ui/stats/pa.png" alt="PA" width={32} height={32} />
        {spell.critique ? `Critique: ${spell.critique}%` : ''}
      </Typography>
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
                <span>
                  <Button
                    disabled={spell.cost > fightingEntities[0].pa}
                    onClick={() => {
                      handleSpellClick(spell);
                    }}
                  >
                    <Image
                      src={`/images/spells/${character.classe}/${spell._id}.png`}
                      alt={spell.name}
                      width={55}
                      height={55}
                    />
                  </Button>
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

  button {
    padding: 0;
  }

  button:disabled {
    opacity: 20%;
  }
`;
