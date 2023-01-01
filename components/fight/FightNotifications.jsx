import { Button, styled, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';

const FightNotifications = ({ notifications, setNotifications, ...props }) => {
  const notificationsEnd = useRef(null);
  notificationsEnd.current && notificationsEnd.current.scrollIntoView({ behaviour: 'smooth' });

  return (
    <div className={props.className}>
      <div className="container">
        <div>
          <Typography variant="h6">Notifications</Typography>
          <Button onClick={() => setNotifications([])} variant="outlined">
            Effacer l'historique
          </Button>
        </div>
        <div className="messages">
          <ul>
            {notifications.map((notification, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: notification }} />
            ))}
          </ul>
          <div ref={notificationsEnd}></div>
        </div>
      </div>
    </div>
  );
};

export default styled(FightNotifications)`
  display: flex;
  justify-content: center;
  margin: 10px;

  & > div {
    width: 500px;
  }

  .container > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px;
  }

  .messages {
    background-color: var(--background-dark);
    height: 290px;
    overflow: auto;
  }

  ul {
    padding-left: 8px;
    list-style-type: none;
  }
`;
