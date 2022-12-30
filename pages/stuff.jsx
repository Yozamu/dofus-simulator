import { Grid, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import StuffCharacteristics from '../components/stuff/StuffCharacteristics';
import StuffShowcase from '../components/stuff/StuffShowcase';
import StuffStats from '../components/stuff/StuffStats';

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
    <Grid container spacing={2} className={props.className}>
      <Grid item xs={4}>
        <ul>
          Stuff page
          {Object.entries(items).map(([key, val]) => (
            <li key={key}>
              {key}:{JSON.stringify(val)}
            </li>
          ))}
        </ul>
        <StuffCharacteristics />
      </Grid>
      <Grid item xs={4}>
        <div>xs=6</div>
        <StuffShowcase items={items} />
      </Grid>
      <Grid item xs={4}>
        <div>xs=3</div>
        <StuffStats />
      </Grid>
    </Grid>
  );
};

export default styled(StuffPage)`
  margin-top: 50px;
`;
