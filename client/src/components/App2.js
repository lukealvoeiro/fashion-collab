import React, { Component } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import CardContainer from "./CardContainer";
import Header2 from "./Header2";
import Landing from "./Landing";
import PrivateRoute from "./PrivateRoute";

class App2 extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Header2 />
          <div className="container-fluid">
            <Switch>
              <PrivateRoute exact path="/" component={CardContainer} />
              <Route path="/welcome" component={Landing} />
            </Switch>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

function mapStateToProps(state) {
  //return object that will be passed to the Header as props
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(App2);
