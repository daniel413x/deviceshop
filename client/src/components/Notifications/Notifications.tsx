import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Notification from './Notification';
import { INotification } from '../../types/types';
import Context from '../../context/context';

function Notifications() {
  const [classes, setClasses] = useState<string>('');
  const { notifications } = useContext(Context);
  const close = () => {
    setClasses('close');
    const timer = setTimeout(() => {
      setClasses('');
    }, 1111);
    return () => clearTimeout(timer);
  };
  useEffect(() => {
    if (notifications.all.length > 0) {
      return setClasses('show');
    }
    return close();
  }, [notifications.all]);
  return (
    <div className={`notifications-container ${classes}`} id="notifications-container">
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
