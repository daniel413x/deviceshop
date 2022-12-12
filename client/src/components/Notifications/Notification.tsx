import React, { useState, useEffect, useContext } from 'react';
import { INotification } from '../../types/types';
import Context from '../../context/context';

function Notification({
  messageLineOne,
  messageLineTwo,
  color,
  timeout,
  image,
  id,
}: INotification) {
  const { notifications } = useContext(Context);
  const [classes, setClasses] = useState<string>('');
  const close = () => {
    setClasses('');
    const timer = setTimeout(() => {
      notifications.removeNotification(id);
    }, 520);
    return () => clearTimeout(timer);
  };
  useEffect(() => {
    setClasses('show');
    const timer = setTimeout(() => close(), timeout);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={`notification ${color} ${classes}`}>
      {image && (
      <img
        alt={`${messageLineOne} ${messageLineTwo}`}
        src={`${process.env.REACT_APP_API_URL}${image}`}
      />
      )}
      <div className="body">
        <span className="line-one">
          {messageLineOne}
        </span>
        {messageLineTwo && (
          <span className="line-two">
            {messageLineTwo}
          </span>
        )}
      </div>
    </div>
  );
}

export default Notification;
