import { styled } from '@mui/material';

const ItemCharacteristics = ({ characteristics, className }) => {
  return (
    <ul className={className}>
      {characteristics.map((characteristic, index) =>
        Object.entries(characteristic).map(([key, val]) => (
          <li key={index}>
            <img src="/images/ui/stats/other.png" alt={key} className="icon" width={24} height={24} />
            <span>
              {key.replace(/[0-9]|-/g, '')}: {val}
            </span>
          </li>
        ))
      )}
    </ul>
  );
};

export default styled(ItemCharacteristics)`
  padding: 0;
  list-style-type: none;
`;
