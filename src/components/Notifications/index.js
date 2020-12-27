import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleToggleVisible = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('/notifications');

      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          {
            addSuffix: true,
            locale: pt,
          }
        ),
      }));

      setNotifications(data);
    }

    loadNotifications();
  }, []);

  const hasUnreadNotifications = useMemo(
    () => !!notifications.find(notification => notification.read === false),
    [notifications]
  );

  /**
   * Update and mark the notification as read
   * @param {string} id
   */
  async function markNotificationAsRead(id) {
    // This will already mark the notification as read
    await api.put(`notifications/${id}`);

    const updatedNotifications = notifications.map(notification =>
      notification._id === id
        ? {
            ...notification,
            read: true,
          }
        : notification
    );

    setNotifications(updatedNotifications);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnreadNotifications}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button
                  onClick={() => markNotificationAsRead(notification._id)}
                  type="button"
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
