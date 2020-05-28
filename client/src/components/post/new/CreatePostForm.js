import React, { Component, Fragment } from "react";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

import DescriptionField from "./DescriptionField";
import ImageFileInput from "./ImageFileInput";
import * as actions from "../../../actions/index";
import ImageDropzone from "./ImageDropzone";

const imageIsRequired = (value) => (!value ? "Required" : undefined);

class CreatePostForm extends Component {
  onFormCancel() {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const { error, handleSubmit, submitting, pristine } = this.props;
    return (
      <form
        onSubmit={handleSubmit(async () => {
          const { history, newPost, form } = this.props;
          await newPost(form.values, history);
        })}
        className="create-post"
      >
        <h5>Create post</h5>
        <Field
          name="file"
          component={ImageDropzone}
          validate={imageIsRequired}
        />

        <Field name="description" component={DescriptionField} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            type="button"
            variant="secondary"
            disabled={submitting}
            onClick={() => {
              this.onFormCancel();
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="success"
            disabled={pristine || submitting}
          >
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { form: state.form.newPostForm };
}

function validate(values) {
  const errors = {};
  if (!values.file) errors.file = "You have not selected a file";
  return errors;
}

CreatePostForm = connect(mapStateToProps, actions)(CreatePostForm);

export default reduxForm({
  validate,
  form: "newPostForm",
})(CreatePostForm);
