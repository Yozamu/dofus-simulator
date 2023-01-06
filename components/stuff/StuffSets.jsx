import { styled } from '@mui/material';
import StuffSet from './StuffSet';

const StuffSets = ({ sets, ...props }) => {
  return (
    <div className={props.className}>
      {Object.entries(sets).map(([setId, set]) => (
        <StuffSet key={setId} set={set} />
      ))}
    </div>
  );
};

export default styled(StuffSets)`
  display: flex;
  align-items: center;
  flex-direction: column;

  & > div {
    margin: 10px;
    width: 75%;
  }
`;
