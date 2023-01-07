import Head from 'next/head';
import Stuff from '../components/stuff/Stuff';

const StuffPage = () => {
  let characteristics = JSON.parse(localStorage.getItem('characteristics'));
  if (!characteristics) {
    setLocalStorageCharacteristics('classe', 'pandawa');
    setLocalStorageCharacteristics('niveau', 200);
    for (let stat of MAIN_STATS) {
      setLocalStorageCharacteristics(stat.toLowerCase(), 0);
    }
    characteristics = JSON.parse(localStorage.getItem('characteristics'));
  }

  return (
    <>
      <Head>
        <title>Dofus Simulator - Stuff</title>
      </Head>
      <Stuff localStuff={JSON.parse(localStorage.getItem('stuff')) || {}} localCharacteristics={characteristics} />
    </>
  );
};

export default StuffPage;
