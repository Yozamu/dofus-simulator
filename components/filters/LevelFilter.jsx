import { Slider, styled } from '@mui/material';

const LevelFilter = ({ levelRange, setLevelRange, ...props }) => {
  return (
    <div className={props.className}>
      <div>Niveau</div>
      <Slider
        value={levelRange}
        onChange={(e, newVal) => {
          setLevelRange(newVal);
        }}
        min={1}
        max={200}
        valueLabelDisplay="auto"
      />
      <div className="level-range">
        <span>{levelRange[0]}</span>
        <span>{levelRange[1]}</span>
      </div>
    </div>
  );
};

export default styled(LevelFilter)`
  .level-range {
    display: flex;
    justify-content: space-between;
  }
`;
