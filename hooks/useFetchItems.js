import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { buildQueryParamsUrl } from '../helpers/utils';

const useFetchItems = (type) => {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);

  const router = useRouter();
  const query = { type, ...router.query };

  useEffect(() => {
    const params = buildQueryParamsUrl(query);
    fetch(`/api/items?${params}`)
      .then((res) => res.json())
      .then((json) => {
        setItems(json.data);
        setCount(json.count);
      });
  }, []);

  return [items, count, query];
};

export default useFetchItems;
