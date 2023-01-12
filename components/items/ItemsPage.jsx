import { CircularProgress, styled } from '@mui/material';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import usePrevious from '../../hooks/usePrevious';
import Filters from '../filters/Filters';
import BackToTop from '../layout/BackToTop';
import ItemList from './ItemList';

const ItemsPage = ({ query = {}, title, availableCategories, itemHeight, ...props }) => {
  const [items, setItems] = useState(props.items);
  const [itemCount, setItemCount] = useState(props.count);
  const [isFetching, setIsFetching] = useState(false);
  const { type, ...queryRest } = query;
  const initialFilters = { level: [1, 200], ...queryRest };
  const [filters, setFilters] = useState(initialFilters);
  const prevFilters = usePrevious(filters);

  const getQueryParams = useCallback(
    (shouldReset) => {
      const queryParams = [`type=${type}`, `offset=${shouldReset ? 0 : items.length}`];
      Object.entries(filters).map(([key, val]) => {
        queryParams.push(`${key}=${val}`);
      });
      return queryParams.join('&');
    },
    [items.length, type, filters]
  );

  const fetchItems = useCallback(
    async (shouldReset) => {
      if (isFetching) return;
      setIsFetching(true);
      const queryParams = getQueryParams(shouldReset);
      const res = await fetch(`/api/items?${queryParams}`);
      const json = await res.json();
      setItems((currItems) => (shouldReset ? json.data : currItems.concat(json.data)));
      setItemCount(json.count);
      if (shouldReset) window.scrollTo(0, 0);
      setIsFetching(false);
    },
    [getQueryParams, isFetching]
  );

  const handleScroll = useCallback(async () => {
    const itemsLeftToFetch = itemCount - items.length;
    const hasScrolledEnough = window.innerHeight + window.scrollY >= document.body.offsetHeight;
    if (itemsLeftToFetch > 0 && hasScrolledEnough) {
      fetchItems(false);
    }
  }, [fetchItems, items.length, itemCount]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (prevFilters && prevFilters !== filters) {
      fetchItems(true);
    }
  }, [fetchItems, prevFilters, filters]);

  return (
    <>
      <Head>
        <title>Dofus Simulator - {title}</title>
      </Head>
      <div className={`${props.className} wrapper`}>
        <Filters setFilters={setFilters} initialFilters={initialFilters} availableCategories={availableCategories} />
        <ItemList className="items" items={items} category={type} itemHeight={itemHeight} />
        {isFetching && (
          <div className="progress">
            <CircularProgress />
          </div>
        )}
        <BackToTop />
      </div>
    </>
  );
};

export default styled(ItemsPage)`
  .items {
    margin-left: 200px;
  }

  .progress {
    text-align: center;
  }
`;
