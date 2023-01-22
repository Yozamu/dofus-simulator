import { CircularProgress } from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Fight from '../components/fight/Fight';

const FightPage = () => {
  const [stats, setStats] = useState(null);
  const [monsters, setMonsters] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const storageStats = JSON.parse(localStorage.getItem('stats'));
    storageStats && setStats(storageStats);
    fetch('/api/monsters')
      .then((res) => res.json())
      .then((json) => {
        setMonsters(json.data);
        setCount(json.count);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Dofus Simulator - Combattre</title>
      </Head>
      {count > 0 ? (
        stats ? (
          <Fight monsters={monsters} character={stats} />
        ) : (
          <div>Pas de données. Veuillez aller sur la page de stuff pour initialiser votre personnage</div>
        )
      ) : (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default FightPage;
