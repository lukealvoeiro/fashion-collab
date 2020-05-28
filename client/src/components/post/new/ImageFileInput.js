import React, { Component } from "react";

export default class ImageFileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const {
      input: { onChange },
    } = this.props;
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({ image: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    onChange(event.target.files[0]);
  }

  render() {
    const {
      input: { value },
    } = this.props;
    const {
      input,
      label,
      meta: { error, touched },
    } = this.props;
    return (
      <div>
        <label>{label}</label>
        <input
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={this.handleChange}
        />
        <br></br>
        <small>{touched && error}</small>
        <img src={this.state.image}></img>
      </div>
    );
  }
}
