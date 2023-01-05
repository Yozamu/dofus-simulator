import Head from 'next/head';
import { useEffect, useState } from 'react';
import Fight from '../components/fight/Fight';
import { getMonsters } from './api/monsters';

const FightPage = ({ monsters, query }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    if (Object.keys(query).length > 0) {
      setStats(query);
    } else {
      const storageStats = JSON.parse(localStorage.getItem('stats'));
      storageStats && setStats(storageStats);
    }
  }, [query]);

  return (
    <>
      <Head>
        <title>Dofus Simulator - Combattre</title>
      </Head>
      {Object.keys(stats).length < 1 ? <div>Pas de données</div> : <Fight monsters={monsters} character={stats} />}
    </>
  );
};

export async function getServerSideProps(context) {
  const query = context.query;
  const req = { ...context.req, ...context.query };
  const res = await getMonsters(req);
  return {
    props: {
      monsters: res.data,
      query,
    },
  };
}

export default FightPage;
