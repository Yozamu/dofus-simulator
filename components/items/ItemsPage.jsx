import { styled } from '@mui/material';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import usePrevious from '../../hooks/usePrevious';
import Filters from '../filters/Filters';
import ItemList from './ItemList';

const ItemsPage = ({ query = {}, title, availableCategories, ...props }) => {
  const [items, setItems] = useState(props.items);
  const [itemCount, setItemCount] = useState(props.count);
  const [isFetching, setIsFetching] = useState(false);
  const { type, ...queryRest } = query;
  const [filters, setFilters] = useState({ level: [1, 200], ...queryRest });
  const prevFilters = usePrevious(filters);

  const getQueryParams = useCallback(
    (shouldReset) => {
      const queryParams = [`type=${type}`, `offset=${shouldReset ? 0 : items.length}`];
      Object.entries(filters).map(([key, val]) => {
        queryParams.push(`${key}=${val}`);
      });
      return queryParams.join('&');
    },
    [items, type, filters]
  );

  const fetchItems = useCallback(
    async (shouldReset) => {
      if (isFetching) return;
      setIsFetching(true);
      const queryParams = getQueryParams(shouldReset);
      const res = await fetch(`/api/items?${queryParams}`);
      const json = await res.json();
      setItems(shouldReset ? json.data : items.concat(json.data));
      setItemCount(json.count);
      setIsFetching(false);
    },
    [getQueryParams, isFetching, items]
  );

  const handleScroll = useCallback(async () => {
    const itemsLeftToFetch = itemCount - items.length;
    const hasScrolledEnough = window.innerHeight + window.scrollY >= document.body.offsetHeight;
    if (itemsLeftToFetch > 0 && hasScrolledEnough) {
      fetchItems(false);
    }
  }, [fetchItems, items, itemCount]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (prevFilters && prevFilters !== filters) {
      fetchItems(true);
      window.scrollTo(0, 0);
    }
  }, [fetchItems, prevFilters, filters]);

  return (
    <>
      <Head>
        <title>Dofus Simulator - {title}</title>
      </Head>
      <div className={`${props.className} wrapper`}>
        <Filters setFilters={setFilters} availableCategories={availableCategories} />
        <ItemList className="items" items={items} category={type} />
      </div>
    </>
  );
};

export default styled(ItemsPage)`
  .items {
    margin-left: 200px;
  }
`;
