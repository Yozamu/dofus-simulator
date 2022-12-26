import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Dofus simulator</title>
      </Head>
      <main className={styles.main}>
        <div>Todo</div>
        <Link href="/equipment">Equipment</Link>
        <Link href="/admin">Admin</Link>
      </main>
    </>
  );
}
