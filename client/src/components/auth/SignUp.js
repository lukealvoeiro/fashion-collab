import { Modal, Button } from "react-bootstrap";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import * as actions from "../../actions/index";
import { authModalTypes } from "../../utils/enums";

class SignUp extends Component {
  render() {
    return (
      <Fragment>
        <p className="modal-text-auth block">
          Create an account to explore your interests, follow trends, and
          connect with like-minded individuals. Show the world what fashion is
          through your eyes!
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
              Sign up with Google
            </a>
          </div>
          <div className="block oauth-btn-wrapper">
            <a className="btn btn-sm upgrade-button oauth-btn" href="#">
              <img
                className="oauth-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg"
              ></img>
              Sign up with Facebook
            </a>
          </div>

          <div className="block oauth-btn-wrapper">
            <a
              className="btn btn-sm upgrade-button oauth-btn"
              href="#"
              onClick={() =>
                this.props.alterAuthModal(authModalTypes.SIGN_UP_FORM)
              }
            >
              <img
                className="oauth-icon"
                src="https://webstockreview.net/images250_/email-icon-png-9.png"
              />
              Sign up with Email
            </a>
          </div>
        </div>
        <p className="switch-auth-type">
          Already have an account?{" "}
          <Link
            onClick={() => this.props.alterAuthModal(authModalTypes.LOG_IN)}
            className="link-unstyled green-bold"
          >
            Log In
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

export default connect(null, actions)(SignUp);
