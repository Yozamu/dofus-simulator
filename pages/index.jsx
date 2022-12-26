import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  const updateData = () => {
    fetch('/api/update-data', {
      method: 'PUT',
    });
  };

  return (
    <>
      <Head>
        <title>Dofus simulator</title>
      </Head>
      <main className={styles.main}>
        <div>Todo</div>
        <Link href="/equipment">Equipment</Link>
        <button onClick={updateData}>Update data</button>
      </main>
    </>
  );
}
