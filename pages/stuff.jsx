import { Grid, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import StuffCharacteristics from '../components/stuff/StuffCharacteristics';
import StuffShowcase from '../components/stuff/StuffShowcase';
import StuffStats from '../components/stuff/StuffStats';
import { setLocalStorageCharacteristics } from '../helpers/localstorage';

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

const StuffPage = (props) => {
  const [items, setItems] = useState({});
  const [characteristics, setCharacteristics] = useState({});

  const getData = async (stuff, slot) => {
    if (!stuff[slot]) return;
    const res = await fetch(`/api/items/${slot}/${stuff[slot]}`);
    return res.json();
  };

  useEffect(() => {
    let characteristics = JSON.parse(localStorage.getItem('characteristics'));
    if (!characteristics) {
      setLocalStorageCharacteristics('classe', 'pandawa');
      characteristics = { classe: 'pandawa' };
    }
    setCharacteristics(characteristics);
    const stuff = JSON.parse(localStorage.getItem('stuff')) || {};
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
    <div className={props.className}>
      <StuffCharacteristics items={items} characteristics={characteristics} />
      <StuffShowcase
        items={items}
        setItems={setItems}
        characteristics={characteristics}
        setCharacteristics={setCharacteristics}
      />
      <StuffStats characteristics={characteristics} setCharacteristics={setCharacteristics} />
    </div>
  );
};

export default styled(StuffPage)`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;

  & > *:nth-child(1) {
    flex-basis: 30%;
  }

  & > *:nth-child(2) {
    flex-basis: 20%;
  }

  & > *:nth-child(3) {
    flex-basis: 35%;
  }
`;
