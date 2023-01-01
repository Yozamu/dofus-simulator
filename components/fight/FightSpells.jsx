import { Button, styled, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getSpellActionTypeName } from '../../helpers/utils';

const FightSpells = ({ character, ...props }) => {
  const [spells, setSpells] = useState([]);

  useEffect(() => {
    fetch(`/api/spells?classe=${character.classe}`)
      .then((res) => res.json())
      .then((json) => setSpells(json.data));
  }, [character]);

  const TooltipContent = ({ spell }) => (
    <div>
      <Typography variant="h6">
        {spell.name}
        <hr />
      </Typography>
      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
        Coût: {spell.cost} <Image src="/images/ui/stats/pa.png" alt="PA" width={32} height={32} />
      </Typography>
      <ul>
        {spell.effects.map((effect, i) => (
          <li key={i}>
            <Typography variant="body2">
              {effect.amount.min} - {effect.amount.max} ({getSpellActionTypeName(effect.type)} {effect.element})
            </Typography>
          </li>
        ))}
      </ul>
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
                <Button>
                  <Image
                    src={`/images/spells/${character.classe}/${spell._id}.png`}
                    alt={spell.name}
                    width={55}
                    height={55}
                  />
                </Button>
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
`;
