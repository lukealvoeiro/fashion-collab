import { Modal, Button } from "react-bootstrap";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import * as actions from "../../actions/index";
import { authModalTypes } from "../../utils/enums";

class LogIn extends Component {
  render() {
    return (
      <Fragment>
        <p className="modal-text-auth block">
          Sign back in to continue exploring your interests and connect with
          like-minded individuals.
        </p>
        <div className="flex-column">
          <div className="block oauth-btn-wrapper">
            <a
              className="btn btn-sm upgrade-button oauth-btn"
              href="/auth/google"
            >
              <img
                className="oauth-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              ></img>
              Log in with Google
            </a>
          </div>
          <div className="block oauth-btn-wrapper">
            <a className="btn btn-sm upgrade-button oauth-btn" href="#">
              <img
                className="oauth-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg"
              />
              Log in with Facebook
            </a>
          </div>

          <div className="block oauth-btn-wrapper">
            <a
              className="btn btn-sm upgrade-button oauth-btn"
              href="#"
              onClick={() =>
                this.props.alterAuthModal(authModalTypes.LOG_IN_FORM)
              }
            >
              <img
                className="oauth-icon"
                src="https://webstockreview.net/images250_/email-icon-png-9.png"
              />
              Log in with Email
            </a>
          </div>
        </div>
        <p className="switch-auth-type">
          Don't have an account?{" "}
          <Link
            onClick={() => this.props.alterAuthModal(authModalTypes.SIGN_UP)}
            className="link-unstyled green-bold"
          >
            Sign Up
          </Link>
        </p>
        <div className="no-ads-wrapper">
          <p className="small-break">No Ads.</p>
          <p className="small-break">No Data Tracking.</p>
          <p className="small-break">No Bullshit.</p>
        </div>
      </Fragment>
    );
  }
}

export default connect(null, actions)(LogIn);
