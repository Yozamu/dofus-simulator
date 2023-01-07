import { Card, CardActionArea, CardContent, CardMedia, Slide, Snackbar, styled } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { setLocalStorageStuffItem } from '../../helpers/localstorage';
import ItemContent from './ItemContent';

const Item = (props) => {
  const [snackbarIsOpened, setSnackbarIsOpened] = useState(false);

  const { item, category, className } = props;

  const updateStuff = () => {
    setLocalStorageStuffItem(item, category);
    setSnackbarIsOpened(true);
  };

  return (
    <Card className={className}>
      <CardActionArea onClick={updateStuff}>
        <CardMedia>
          <Image
            className="item-image"
            src={`/images/${category}/${item.ankamaId}.png`}
            alt={item.name}
            width={64}
            height={64}
          />
        </CardMedia>
        <CardContent className="card-content">
          <ItemContent item={item} />
        </CardContent>
      </CardActionArea>
      <Snackbar
        open={snackbarIsOpened}
        autoHideDuration={1000}
        onClose={() => setSnackbarIsOpened(false)}
        message={`Stuff mis à jour avec: ${item.name}`}
        TransitionComponent={Slide}
      />
    </Card>
  );
};

export default styled(Item)`
  margin: 10px;
  color: var(--foreground);
  background-color: var(--background-light);

  .item-image {
    position: absolute;
    right: 0px;
  }

  button {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    min-width: 320px;
    height: ${(props) => props.height}px;
  }

  .card-content {
    width: 100%;
  }
`;
