import { useCallback, useEffect, useState } from 'react';

const STUFF_ITEMS = [
  'Chapeau',
  'Cape',
  'Ceinture',
  'Bottes',
  'Amulette',
  'Anneaux',
  'Bouclier',
  'Arme',
  'Trophées',
  'Familier',
];

const StuffPage = () => {
  const [items, setItems] = useState({});

  const getData = async (stuff, slot) => {
    if (!stuff[slot]) return;
    const res = await fetch(`/api/items/${slot}/${stuff[slot]}`);
    return res.json();
  };

  useEffect(() => {
    const stuff = JSON.parse(localStorage.getItem('stuff'));
    const promises = [];
    for (let slot of STUFF_ITEMS) {
      promises.push(getData(stuff, slot));
    }
    Promise.all(promises).then((values) => {
      const newItems = {};
      values.forEach((value, index) => {
        newItems[STUFF_ITEMS[index]] = value ? value.data : [];
      });
      setItems(newItems);
    });
  }, []);

  return (
    <ul>
      Stuff page
      {Object.entries(items).map(([key, val]) => (
        <li key={key}>
          {key}:{JSON.stringify(val)}
        </li>
      ))}
    </ul>
  );
};

export default StuffPage;
