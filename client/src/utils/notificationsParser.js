import NotificationItem from "../components/NotificationItem";
import React from "react";

export function createAlertNotifications(notificationsArr) {
  let res = [];
  if (notificationsArr) {
    for (let i = 0; i < notificationsArr.length; i++) {
      let currentNotification = notificationsArr[i];
      res.push(
        <NotificationItem
          key={i}
          activityType={currentNotification.activityType}
          objectType={currentNotification.objectType}
          link={currentNotification.objectUrl}
          isUnread={currentNotification.isUnread}
          timeSent={currentNotification.timeSent}
          text={currentNotification.text}
          sendingUser={currentNotification._senderId}
        />
      );
    }
  }
  return res;
}

export function createMessagesNotifications(notificationsArr) {}
