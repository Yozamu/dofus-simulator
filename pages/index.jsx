import { Button } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Dofus Simulator</title>
      </Head>
      <main className={styles.main}>
        <div>Todo</div>
        <Link href="/admin">
          <Button>Admin</Button>
        </Link>
      </main>
    </>
  );
}
