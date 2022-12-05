import { makeAutoObservable } from 'mobx';
import { INotification } from '../types/types';
import { green } from '../utils/consts';

export default class NotificationStore {
  notifications: INotification[];

  constructor() {
    this.notifications = [];
    makeAutoObservable(this);
  }

  set newNotifications(notifications: INotification[]) {
    this.notifications = notifications;
  }

  message(
    message: string | string[] = 'notification...',
    color = green,
    timeout = 3000,
    image = '',
  ) {
    const notification: INotification = {
      id: Date.now(),
      color,
      timeout,
      image,
    };
    if (Array.isArray(message)) {
      if (message.length === 1) {
        const [lineOne] = message;
        notification.messageLineOne = lineOne;
      }
      const [lineOne, lineTwo] = message;
      notification.messageLineOne = lineOne;
      notification.messageLineTwo = lineTwo;
    } else {
      notification.messageLineOne = message;
    }
    this.notifications = [notification, ...this.notifications];
  }

  removeNotification(id: number) {
    this.notifications = this.notifications.filter((n) => n.id !== id);
  }

  clearNotifications() {
    this.notifications = [];
  }

  get all() {
    return this.notifications;
  }
}
