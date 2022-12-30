import { Button, styled } from '@mui/material';
import Image from 'next/image';
import StuffShowcaseSlot from './StuffShowcaseSlot';

const StuffShowcase = ({ items, ...props }) => {
  return (
    <div className={props.className}>
      <div>
        <StuffShowcaseSlot type="Amulette" />
        <StuffShowcaseSlot type="Bouclier" />
        <StuffShowcaseSlot type="Anneaux" />
        <StuffShowcaseSlot type="Ceinture" />
        <StuffShowcaseSlot type="Bottes" />
      </div>
      <div>CHARACTER</div>
      <div>
        <StuffShowcaseSlot type="Chapeau" />
        <StuffShowcaseSlot type="Arme" />
        <StuffShowcaseSlot type="Anneaux" />
        <StuffShowcaseSlot type="Cape" />
        <StuffShowcaseSlot type="Familier" />
      </div>
      <div>
        <StuffShowcaseSlot type="Trophées" />
        <StuffShowcaseSlot type="Trophées" />
        <StuffShowcaseSlot type="Trophées" />
        <StuffShowcaseSlot type="Trophées" />
        <StuffShowcaseSlot type="Trophées" />
        <StuffShowcaseSlot type="Trophées" />
      </div>
    </div>
  );
};

export default styled(StuffShowcase)`
  .item-background {
    background-size: 64px;
    width: 64px;
    height: 64px;
    border: 1px solid var(--background-lighter);
  }
`;
