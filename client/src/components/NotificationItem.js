import React, { Component } from "react";

const ACTIVITY_TYPES = {
  FOLLOW: "started following you",
  LIKE: "has liked your",
  POST: "has a new post",
  COMMENTED: "commented on a",
  MENTION: "mentioned you in a",
};

class NotificationItem extends Component {
  renderText() {
    if (this.props.text) {
      return this.props.text;
    }
    return (
      " " +
      ACTIVITY_TYPES[this.props.activityType] +
      " " +
      (this.props.objectType.toLowerCase() || "") +
      " "
    );
  }

  render() {
    const imgUrl = {
      backgroundImage: `url("${this.props.sendingUser.profileImg}")`,
      height: 30,
      width: 30,
    };
    return (
      <div className="notifications-item">
        <span className="notifications-img">
          <i className="fas circle-img" style={imgUrl}></i>
        </span>
        <span className="display-inline notifications-text">
          <strong>{`${this.props.sendingUser.firstName} ${this.props.sendingUser.lastName}`}</strong>
          {this.renderText()}
        </span>
      </div>
    );
  }
}

export default NotificationItem;
