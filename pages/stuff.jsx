import { styled } from '@mui/material';
import { useEffect, useState } from 'react';
import StuffCharacteristics from '../components/stuff/StuffCharacteristics';
import StuffSets from '../components/stuff/StuffSets';
import StuffShowcase from '../components/stuff/StuffShowcase';
import StuffStats from '../components/stuff/StuffStats';
import { MAIN_STATS, STUFF_ITEMS } from '../helpers/constants';
import { setLocalStorageCharacteristics } from '../helpers/localstorage';
import { normalizeStatName } from '../helpers/utils';

const StuffPage = (props) => {
  const [items, setItems] = useState({});
  const [sets, setSets] = useState({});
  const [characteristics, setCharacteristics] = useState({});

  const getItemData = async (stuff, slot) => {
    if (!stuff[slot]) return;
    const res = await fetch(`/api/items/${slot}/${stuff[slot]}`);
    return res.json();
  };

  const getSetData = async (setId) => {
    const res = await fetch(`/api/sets?setId=${setId}`);
    return res.json();
  };

  useEffect(() => {
    let characteristics = JSON.parse(localStorage.getItem('characteristics'));
    if (!characteristics) {
      setLocalStorageCharacteristics('classe', 'pandawa');
      setLocalStorageCharacteristics('niveau', 200);
      for (let stat of MAIN_STATS) {
        setLocalStorageCharacteristics(stat.toLowerCase(), 0);
      }
      characteristics = JSON.parse(localStorage.getItem('characteristics'));
    }
    setCharacteristics(characteristics);
    const stuff = JSON.parse(localStorage.getItem('stuff')) || {};
    const promises = [];
    for (let slot of STUFF_ITEMS) {
      promises.push(getItemData(stuff, slot));
    }
    Promise.all(promises).then((values) => {
      const newItems = {};
      values.forEach((value, index) => {
        newItems[STUFF_ITEMS[index]] = value ? value.data : [];
      });
      setItems(newItems);
    });
  }, []);

  useEffect(() => {
    const setIds = {};
    for (let [, slotArray] of Object.entries(items)) {
      for (let item of slotArray) {
        const setId = item.setId;
        if (!setId) continue;
        setIds[setId] = setIds[setId] ? setIds[setId] + 1 : 1;
      }
    }
    const promises = [];
    for (let [setId, count] of Object.entries(setIds)) {
      if (count <= 1) continue;
      promises.push(getSetData(setId));
    }
    Promise.all(promises).then((values) => {
      const newSets = {};
      values.forEach((value) => {
        if (value.data && setIds[value.data.ankamaId] > 1) {
          const { ankamaId, bonus, ...set } = value.data;
          let actualBonus = bonus[setIds[ankamaId] - 2];
          actualBonus = actualBonus.map((stat) => {
            const separatorIndex = stat.indexOf('%') >= 0 ? stat.indexOf('%') : stat.indexOf(' ');
            const amount = stat.slice(0, separatorIndex);
            const statName = normalizeStatName(stat.slice(separatorIndex).trim());
            return [statName, amount];
          });
          newSets[ankamaId] = { ...set, bonus: actualBonus, amountEquipped: setIds[ankamaId] };
        }
      });
      setSets(newSets);
    });
  }, [items]);

  return (
    <div>
      <div className={props.className}>
        <StuffCharacteristics items={items} sets={sets} characteristics={characteristics} />
        <StuffShowcase
          items={items}
          sets={sets}
          setItems={setItems}
          characteristics={characteristics}
          setCharacteristics={setCharacteristics}
        />
        <StuffStats characteristics={characteristics} setCharacteristics={setCharacteristics} />
      </div>
      <StuffSets sets={sets} />
    </div>
  );
};

export default styled(StuffPage)`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;

  & > * {
    margin: 5px auto;
  }

  & > *:nth-of-type(1) {
    flex-basis: 30%;
  }

  & > *:nth-of-type(2) {
    flex-basis: 20%;
  }

  & > *:nth-of-type(3) {
    flex-basis: 15%;
  }
`;
