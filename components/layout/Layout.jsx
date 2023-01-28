import Navbar from './Navbar';
import { useContext } from 'react';
import { WindowContext } from './WindowContext';

const Layout = (props) => {
  const { clientWidth } = useContext(WindowContext);

  return (
    <>
      <Navbar clientWidth={clientWidth} />
      {props.children}
    </>
  );
};

export default Layout;
