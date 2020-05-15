import React, { Component } from "react";

class NotificationItem extends Component {
  state = {};
  render() {
    return (
      <div className="notifications-item">
        <span className="notifications-img">
          <i className="fas fa-user-circle"></i>
        </span>
        <p className="display-inline notifications-text">
          <strong> Luke</strong> has followed you
        </p>
      </div>
    );
  }
}

export default NotificationItem;
