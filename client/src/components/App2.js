import React, { Component } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUserPosts } from "../actions/posts";
import * as actions from "../actions";

import CardContainer from "./post/CardContainer";
import UserPosts from "./post/UserPosts";
import ExplorePosts from "./post/explorePosts";
import Header2 from "./Header2";
import Landing from "./Landing";
import CreatePostForm from "./post/new/CreatePostForm";
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
              <PrivateRoute
                exact
                path="/posts/new"
                component={CreatePostForm}
              />
              <PrivateRoute path="/u/:id" component={UserPosts} />
              <PrivateRoute exact path="/" component={ExplorePosts} />
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
