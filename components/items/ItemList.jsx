import { styled } from '@mui/material';
import Item from './Item';

const ItemList = ({ items, ...props }) => {
  return (
    <div className={props.className}>
      <ul className="items-list">
        {items.map((item) => (
          <li key={item._id}>
            <Item item={item} category={props.category} />
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
`;
