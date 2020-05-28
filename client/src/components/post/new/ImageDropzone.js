import React, { Component, Fragment } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import ImagePreview from "./imagePreview";
import Placeholder from "./placeholder";
import ShowError from "./showError";

class ImageDropzone extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      image: null,
    };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    console.log(files);
    const {
      input: { onChange },
    } = this.props;
    this.setState({ files });
    onChange(files[0]);
  }

  render() {
    const {
      meta: { error, touched },
    } = this.props;
    return (
      <div className="preview-container">
        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps }) => {
            if (!this.state.files[0]) {
              let style = `upload-container ${
                error && touched ? "has-error" : ""
              }`;
              return (
                <div {...getRootProps({ className: style })}>
                  <input {...getInputProps()} />
                  <Placeholder error={error} touched={touched} />
                </div>
              );
            } else {
              return (
                <div className="upload-container">
                  <ImagePreview imagefiles={this.state.files} />
                </div>
              );
            }
          }}
        </Dropzone>
        {touched && error && <ShowError error={error} />}
      </div>
    );
  }
}

export default ImageDropzone;
