import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Button, Alert } from "react-bootstrap";

import { EMAIL_RE } from "../../utils/regularExpressions";
import * as actions from "../../actions/index";
import { authModalTypes } from "../../utils/enums";
import AuthFormField from "./AuthFormField";

const LOG_IN_FORM_FIELDS = [
  { label: "Email", name: "email", type: "text" },
  { label: "Password", name: "password", type: "password" },
];
class LogInForm extends Component {
  state = {};

  renderFields() {
    return _.map(LOG_IN_FORM_FIELDS, (item) => {
      return (
        <Field
          key={item.name}
          component={AuthFormField}
          type="text"
          name={item.name}
          label={item.label}
          type={item.type}
        />
      );
    });
  }

  render() {
    const { error, handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="auth-form-container">
        <form
          onSubmit={handleSubmit(() =>
            this.props.signInUser(this.props.form.values)
          )}
        >
          {this.renderFields()}
          {error && <Alert variant="danger">{error}</Alert>}
          <div
            className="mt-3"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              type="button"
              variant="secondary"
              disabled={submitting}
              onClick={() => this.props.alterAuthModal(authModalTypes.LOG_IN)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="success"
              disabled={submitting || pristine}
            >
              Log In
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { form: state.form.loginForm };
}

function validateEmptyFields(values, errors) {
  _.forEach(LOG_IN_FORM_FIELDS, ({ name, label }) => {
    if (!values[name]) {
      errors[name] = "You must provide a " + label.toLowerCase();
    }
  });
}

function validate(values) {
  // we perform validation of values object, which is what the submit button returns (a json)
  const errors = {};
  if (EMAIL_RE.test(values.email) === false && values.email !== "") {
    errors.email = "This email is invalid" || "";
  }
  validateEmptyFields(values, errors);
  return errors;
}

LogInForm = connect(mapStateToProps, actions)(LogInForm);

export default reduxForm({
  validate,
  form: "loginForm",
})(LogInForm);
