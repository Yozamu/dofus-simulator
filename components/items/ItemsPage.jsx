import { styled } from '@mui/material';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { EQUIPMENT } from '../../helpers/constants';
import Filters from '../filters/Filters';
import ItemList from './ItemList';

const ItemsPage = ({ query, title, availableCategories, ...props }) => {
  const [items, setItems] = useState(props.items);
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(async () => {
    if (isFetching) return;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setIsFetching(true);
      const queryParams = [`offset=${items.length}`];
      Object.entries(query).map(([key, val]) => {
        queryParams.push(`${key}=${val}`);
      });
      const res = await fetch(`/api/items?${queryParams.join('&')}`);
      const data = await res.json();
      setItems(items.concat(data.data));
      setIsFetching(false);
    }
  }, [isFetching, query, items]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <>
      <Head>
        <title>Dofus Simulator - {title}</title>
      </Head>
      <div className={`${props.className} wrapper`}>
        <Filters setItems={setItems} availableCategories={availableCategories} />
        <ItemList className="items" items={items} category={EQUIPMENT} />
      </div>
    </>
  );
};

export default styled(ItemsPage)`
  .items {
    margin-left: 200px;
  }
`;
