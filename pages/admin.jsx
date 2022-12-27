import { Button } from '@mui/material';
import Head from 'next/head';

const AdminPage = () => {
  const updateData = () => {
    fetch('/api/update-data', {
      method: 'PUT',
    });
  };

  return (
    <>
      <Head>
        <title>Dofus simulator - Admin</title>
      </Head>
      <Button onClick={updateData} variant="outlined">
        Update data
      </Button>
    </>
  );
};

export default AdminPage;
