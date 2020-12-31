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
  if (res.length < 1) {
    console.log("this is happening");
    return (
      <div className="notifications-item" style={{ justifyContent: "center" }}>
        No new notifications!
      </div>
    );
  }
  return res;
}

export function getNotificationCount(notifications) {
  let counter = 0;
  console.log(notifications);
  for (let i = 0; i < notifications.length; i++) {
    if (notifications[i].isUnread) counter++;
  }
  if (counter > 50) return "50+";
  return counter;
}

export function createMessagesNotifications(notificationsArr) {}
