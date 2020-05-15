import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (auth.isLoading === true) {
        return;
      } else {
        if (!auth.isAuthenticated) {
          return <Redirect to="/welcome" />;
        } else {
          return <Component {...props} />;
        }
      }
    }}
  />
);

function mapStateToProps(state) {
  console.log("Is Authenticated:", state.auth.isAuthenticated);
  return {
    auth: state.auth
  };
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));
