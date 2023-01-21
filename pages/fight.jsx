import Head from 'next/head';
import { useEffect, useState } from 'react';
import Fight from '../components/fight/Fight';
import { getMonsters } from './api/monsters';

const FightPage = ({ monsters }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const storageStats = JSON.parse(localStorage.getItem('stats'));
    storageStats && setStats(storageStats);
  }, []);

  return (
    <>
      <Head>
        <title>Dofus Simulator - Combattre</title>
      </Head>
      {stats ? <Fight monsters={monsters} character={stats} /> : <div>Pas de données</div>}
    </>
  );
};

export async function getServerSideProps() {
  const res = getMonsters();
  return {
    props: {
      monsters: res.data,
    },
  };
}

export default FightPage;
