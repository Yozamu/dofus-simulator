import { styled } from '@mui/material';
import Item from './Item';

const ItemList = ({ items, category, itemHeight = 500, ...props }) => {
  return (
    <div className={props.className}>
      <ul className="items-list">
        {items.map((item, i) => (
          <li key={item._id}>
            <Item item={item} category={category} height={itemHeight} index={i} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default styled(ItemList)`
  .items-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    list-style-type: none;
  }

  .items-list > li {
    flex-basis: 21%;
  }
`;
