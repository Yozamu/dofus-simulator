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
      <button onClick={updateData}>Update data</button>
    </>
  );
};

export default AdminPage;
