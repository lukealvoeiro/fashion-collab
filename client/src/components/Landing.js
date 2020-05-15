import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Landing extends Component {
  render() {
    if (this.props.auth.user) {
      return <Redirect to="/" />;
    }
    return (
      <p className="mission-statement p20">
        Defining the future of fashion through collaboration
      </p>
    );
  }
}

function mapStateToProps(state) {
  //return object that will be passed to the Header as props
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Landing);
