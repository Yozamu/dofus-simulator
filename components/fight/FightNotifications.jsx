import { Button, styled, Typography } from '@mui/material';
import { useRef } from 'react';

const FightNotifications = ({ notifications, setNotifications, ...props }) => {
  const notificationsEnd = useRef(null);
  if (notificationsEnd.current) notificationsEnd.current.scrollTop = notificationsEnd.current.scrollHeight;

  return (
    <div className={props.className}>
      <div className="container">
        <div>
          <Typography variant="h6">Notifications</Typography>
          <Button onClick={() => setNotifications([])} variant="outlined">
            Effacer l'historique
          </Button>
        </div>
        <div className="messages" ref={notificationsEnd}>
          <ul>
            {notifications.map((notification, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: notification }} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default styled(FightNotifications)`
  display: flex;
  justify-content: center;

  & > div {
    width: 500px;
  }

  .container > div:first-of-type {
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
    margin-bottom: 20px;
    list-style-type: none;
  }

  li {
    padding: 1px;
  }
`;
