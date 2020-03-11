import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Landing extends Component {
  render() {
    if (!this.props.user) {
      return <Redirect to="/surveys" />;
    }
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Emaily!</h1>Collect feedback from your users
      </div>
    );
  }
}

function mapStateToProps(state) {
  //return object that will be passed to the Header as props
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Landing);
