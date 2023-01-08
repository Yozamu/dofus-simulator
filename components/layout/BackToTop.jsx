import { ArrowUpward } from '@mui/icons-material';
import { Fab, styled } from '@mui/material';

const BackToTop = ({ parent, bottom, right, ...props }) => {
  const backToTop = () => {
    parent?.scrollIntoView({ behavior: 'smooth' }) ?? window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <Fab color="primary" aria-label="Revenir en haut" className={props.className} onClick={backToTop}>
      <ArrowUpward />
    </Fab>
  );
};

export default styled(BackToTop)`
  position: fixed;
  bottom: ${(props) => props.bottom ?? '32'}px;
  right: ${(props) => props.right ?? '8'}px;
`;
