import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Dofus Simulator</title>
      </Head>
      <main className={styles.main}>
        <div>Rien à voir par ici</div>
      </main>
    </>
  );
}
