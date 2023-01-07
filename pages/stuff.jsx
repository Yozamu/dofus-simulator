import Head from 'next/head';
import { useEffect, useState } from 'react';
import Stuff from '../components/stuff/Stuff';
import { MAIN_STATS } from '../helpers/constants';
import { setLocalStorageCharacteristics } from '../helpers/localstorage';

const StuffPage = () => {
  const [characteristics, setCharacteristics] = useState({});
  const [stuff, setStuff] = useState(null);

  useEffect(() => {
    let characs = JSON.parse(localStorage.getItem('characteristics'));
    if (!characs) {
      setLocalStorageCharacteristics('classe', 'pandawa');
      setLocalStorageCharacteristics('niveau', 200);
      for (let stat of MAIN_STATS) {
        setLocalStorageCharacteristics(stat.toLowerCase(), 0);
      }
      characs = JSON.parse(localStorage.getItem('characteristics'));
    }
    setCharacteristics(characs);
    setStuff(JSON.parse(localStorage.getItem('stuff')) || {});
  }, []);

  return (
    <>
      <Head>
        <title>Dofus Simulator - Stuff</title>
      </Head>
      {stuff && <Stuff localStuff={stuff} localCharacteristics={characteristics} />}
    </>
  );
};

export default StuffPage;
