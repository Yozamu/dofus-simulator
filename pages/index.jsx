import { getTodos } from '../helpers/data';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Typography } from '@mui/material';

const HomePage = ({ todos = {} }) => {
  // const todoCategories = Object.keys(todos);
  return (
    <>
      <Head>
        <title>Dofus Simulator</title>
      </Head>
      <main className={styles.main}>
        {/* <div className="container">
          <Typography variant="h5">Todos</Typography>
          <hr />
          <ul>
            {todoCategories.map((category, i) => {
              const res = [<li key={category}>{category[0].toUpperCase() + category.slice(1)}</li>];
              const todoList = todos[category].map((todo) => <li key={todo}>{todo}</li>);
              res.push(<ul key={i}>{todoList}</ul>);
              return res;
            })}
          </ul>
        </div> */}
        <div className="container">
          <Typography variant="h5">Accueil</Typography>
          <hr />
          <p>Le site, encore incomplet, propose néanmoins les features suivantes :</p>
          <ul>
            <li>Choix d'un personnage avec sa page de caractéristiques</li>
            <li>Liste des items, filtres, et possibilités de les équiper</li>
            <li>Simulation de combat (utiliser le Pandawa et l'Abrakleur Clair comme ennemi)</li>
            <li>Outil d'assistance à la forgemagie avec calcul du puits restant</li>
          </ul>
        </div>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const res = await getTodos();
  return {
    props: {
      todos: res,
    },
  };
}

export default HomePage;
