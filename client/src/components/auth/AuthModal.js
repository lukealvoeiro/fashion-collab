import { Modal } from "react-bootstrap";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { authModalTypes } from "../../utils/enums";
import LogIn from "./LogIn";
import LogInForm from "./LogInForm";
import SignUp from "./SignUp";
import SignUpForm from "./SignUpForm";

export class AuthModal extends Component {
  renderTitle() {
    if (
      this.props.authModal === authModalTypes.LOG_IN ||
      this.props.authModal === authModalTypes.LOG_IN_FORM
    )
      return "Welcome back!";
    else return "Join patchwork.";
  }

  renderBody() {
    switch (this.props.authModal) {
      case authModalTypes.LOG_IN:
        return <LogIn />;
      case authModalTypes.LOG_IN_FORM:
        return <LogInForm />;
      case authModalTypes.SIGN_UP:
        return <SignUp />;
      case authModalTypes.SIGN_UP_FORM:
        return <SignUpForm />;
    }
  }

  render() {
    return (
      <Modal
        show={true}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        centered
        animation={false}
        onHide={() => this.props.alterAuthModal(null)}
      >
        <Modal.Header closeButton className="text-center">
          <div className="modal-title-patchwork">{this.renderTitle()}</div>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center modal-auth-body">{this.renderBody()}</div>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  authModal: state.auth.authModal,
});

export default connect(mapStateToProps, actions)(AuthModal);
