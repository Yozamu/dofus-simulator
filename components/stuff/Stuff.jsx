import { styled } from '@mui/material';
import { useEffect, useState } from 'react';
import StuffCharacteristics from './StuffCharacteristics';
import StuffSets from './StuffSets';
import StuffShowcase from './StuffShowcase';
import StuffStats from './StuffStats';
import { STUFF_ITEMS } from '../../helpers/constants';
import { normalizeStatName } from '../../helpers/utils';
import { setLocalStorageStuff } from '../../helpers/localstorage';

const Stuff = ({ localStuff, localCharacteristics, ...props }) => {
  const [items, setItems] = useState({});
  const [sets, setSets] = useState({});
  const [characteristics, setCharacteristics] = useState(localCharacteristics);
  const [stuff, setStuff] = useState(localStuff);

  const getItemData = async (stuff, slot) => {
    if (!stuff[slot]) return;
    const res = await fetch(`/api/items/${slot}/${stuff[slot]}`);
    return res.json();
  };

  const getSetData = async (setId) => {
    const res = await fetch(`/api/sets?setId=${setId}`);
    return res.json();
  };

  const importData = (data) => {
    setStuff(data);
  };

  useEffect(() => {
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
      setLocalStorageStuff(newItems);
    });
  }, [stuff]);

  useEffect(() => {
    if (Object.keys(items).length < 1) return;
    const setIds = {};
    for (let [, slotArray] of Object.entries(items)) {
      for (let item of slotArray) {
        const setId = item.setId;
        if (!setId) continue;
        setIds[setId] ? setIds[setId].push(item.ankamaId) : (setIds[setId] = [item.ankamaId]);
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
        if (value.data && setIds[value.data.ankamaId].length > 1) {
          const { ankamaId, bonus, items, ...set } = value.data;
          const currentSet = setIds[ankamaId];
          let actualBonus = bonus[currentSet.length - 2];
          actualBonus = actualBonus.map((stat) => {
            const separatorIndex = stat.indexOf('%') >= 0 ? stat.indexOf('%') : stat.indexOf(' ');
            const amount = stat.slice(0, separatorIndex);
            const statName = normalizeStatName(stat.slice(separatorIndex).trim());
            return [statName, amount];
          });
          const updatedItems = items.map((item) => [...item, currentSet.indexOf(+item[0][0]) >= 0]);
          newSets[ankamaId] = {
            ...set,
            items: updatedItems,
            bonus: actualBonus,
            amountEquipped: currentSet.length,
          };
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
          setItems={setItems}
          characteristics={characteristics}
          setCharacteristics={setCharacteristics}
          importData={importData}
          stuff={stuff}
        />
        <StuffStats characteristics={characteristics} setCharacteristics={setCharacteristics} />
      </div>
      <StuffSets sets={sets} />
    </div>
  );
};

export default styled(Stuff)`
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
