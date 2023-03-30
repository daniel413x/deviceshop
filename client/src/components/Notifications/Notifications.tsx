import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Notification from './Notification';
import { INotification } from '../../types/types';
import Context from '../../context/context';

function Notifications() {
  const { notifications } = useContext(Context);
  return (
    <div
      className="notifications-container"
      id="notifications-container"
    >
      {notifications.all.map((notification: INotification) => (
        <Notification
          key={notification.id}
          messageLineOne={notification.messageLineOne}
          messageLineTwo={notification.messageLineTwo}
          color={notification.color}
          id={notification.id}
          timeout={notification.timeout}
          image={notification.image}
        />
      ))}
    </div>
  );
}

export default observer(Notifications);
