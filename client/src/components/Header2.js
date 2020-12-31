import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../actions";
import { OverlayTrigger, Popover } from "react-bootstrap";
import NotificationItem from "./NotificationItem";
import { Link } from "react-router-dom";
import {
  createAlertNotifications,
  getNotificationCount,
} from "./../utils/notificationsParser";

import { authModalTypes } from "../utils/enums";
import AuthModal from "./auth/AuthModal";
import SearchBar from "./searchBar/SearchBar";

class Header2 extends Component {
  componentDidMount() {
    try {
      this.props.fetchNotifications();

      setInterval(() => {
        this.props.fetchNotifications();
      }, 15000);
    } catch (error) {
      console.log(error);
    }
  }

  renderModal() {
    if (!this.props.auth.authModal) return;
    return <AuthModal />;
  }

  handleLogout() {
    this.props.logoutUser();
    const { history } = this.props;
    if (history) history.push("/");
  }

  redirectToHome() {
    const { history } = this.props;
    if (history) history.push("/welcome");
  }

  renderContent() {
    if (this.props.auth.isLoading) {
      return;
    } else if (!this.props.auth.isAuthenticated) {
      return (
        <Fragment>
          <a
            className="link-unstyled header-links align-middle"
            onClick={() => this.props.alterAuthModal(authModalTypes.LOG_IN)}
          >
            Sign In
          </a>
          <a
            onClick={() => this.props.alterAuthModal(authModalTypes.SIGN_UP)}
            className="btn btn-sm text-white green-background btn-signup"
          >
            <div className="padding-lr">Get started</div>
          </a>
          {this.renderModal()}
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <div
            className="header-links align-middle"
            style={{
              display: "inline-block",
              width: "20rem",
            }}
          >
            <SearchBar />
          </div>
          <Link to="/" className="header-links align-middle link-unstyled">
            Explore
          </Link>
          <span className="link-unstyled header-links align-middle header-buttons">
            <i className="far fa-comment-dots"></i>
          </span>
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover>
                <Popover.Content>
                  <div className="notifications-overlay-header">
                    <strong>Notifications</strong>
                  </div>
                  <div
                    style={{
                      maxHeight: "400px",
                      height: "100%",
                      overflow: "hidden",
                      overflowY: "scroll",
                    }}
                  >
                    {createAlertNotifications(this.props.notifications.alerts)}
                  </div>
                  <div className="notifications-overlay-footer">
                    <strong>See all</strong>
                  </div>
                </Popover.Content>
              </Popover>
            }
            rootClose
            onHide={() => this.redirectToHome()}
          >
            <span className="link-unstyled header-links align-middle header-buttons">
              <i className="far fa-bell"></i>
              <span className="notifications-num">
                {getNotificationCount(this.props.notifications.alerts)}
              </span>
            </span>
          </OverlayTrigger>

          <a
            className="btn btn-sm upgrade-button"
            onClick={() => this.handleLogout()}
          >
            Upgrade
          </a>
        </Fragment>
      );
    }
  }

  render() {
    return (
      <div className="container sticky-top bg-white" id="header">
        <header>
          <div className="d-flex justify-content-between align-middle banner">
            <a
              className="text-black link-unstyled align-self-center logo-font logo-size"
              href="/"
            >
              <div id="logo-text">Patchwork</div>
              <div id="logo-icon">P</div>
            </a>

            <div className="align-self-center">{this.renderContent()}</div>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  notifications: state.notifications,
});

export default withRouter(connect(mapStateToProps, actions)(Header2));
