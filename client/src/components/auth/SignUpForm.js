import _ from "lodash";
import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Button, Alert } from "react-bootstrap";

import AuthFormField from "./AuthFormField";
import { EMAIL_RE } from "../../utils/regularExpressions";
import * as actions from "../../actions/index";
import { authModalTypes } from "../../utils/enums";

const SIGN_UP_FORM_FIELDS = [
  { label: "First Name", name: "first_name", type: "text" },
  { label: "Last Name", name: "last_name", type: "text" },
  { label: "Email", name: "email", type: "text" },
  { label: "Password", name: "password", type: "password" },
  { label: "Repeat Password", name: "password2", type: "password" },
];

export class SignUpForm extends Component {
  renderFields() {
    return _.map(SIGN_UP_FORM_FIELDS, (item) => {
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
            this.props.signUpUser(this.props.formValues)
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
              onClick={() => this.props.alterAuthModal(authModalTypes.SIGN_UP)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="success"
              disabled={submitting || pristine}
            >
              Create user
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { formValues: state.form.signupForm.values };
}

function validate(values) {
  // we perform validation of values object, which is what the submit button returns (a json)
  const errors = {};
  if (EMAIL_RE.test(values.email) === false && values.email !== "") {
    errors.email = "This email is invalid" || "";
  }
  if (values.password !== values.password2) {
    errors.password2 = "The passwords entered do not match";
  }
  validateEmptyFields(values, errors);
  return errors;
}

async function asyncValidate(values) {
  const errors = {};
  console.log("executing async validation");
  const res = await axios.get("/api/user", {
    params: {
      email: values.email,
    },
  });
  console.log(res);
  if (res.data) {
    throw {
      email: "This email has already been used. Please enter another one",
    };
  }
}

function validateEmptyFields(values, errors) {
  _.forEach(SIGN_UP_FORM_FIELDS, ({ name, label }) => {
    if (!values[name]) {
      errors[name] = "You must provide a " + label.toLowerCase();
      if (name === "password2")
        errors[name] = "You must provide your password again";
    }
  });
}

SignUpForm = connect(mapStateToProps, actions)(SignUpForm);

export default reduxForm({
  validate,
  asyncValidate,
  asyncBlurFields: ["email"],
  form: "signupForm",
})(SignUpForm);
