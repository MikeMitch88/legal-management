/**
 * Notification Toast Component
 * Displays notifications in the UI
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import './NotificationToast.css';

const NotificationToast = () => {
  const { notifications, removeNotification } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
        >
          <div className="notification-content">
            <strong>{notification.title}</strong>
            <p>{notification.message}</p>
          </div>
          <button
            className="notification-close"
            onClick={() => removeNotification(notification.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;
