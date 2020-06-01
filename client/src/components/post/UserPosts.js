import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Button } from "react-bootstrap";

import * as actions from "../../actions";
import CardContainer from "./CardContainer";
import UserHeader from "./userHeader";

class UserPosts extends Component {
  componentDidMount() {
    this.props.fetchUserPosts(this.props.match.params.id);
  }

  render() {
    return (
      <Fragment>
        <UserHeader profile={this.props.userInfo} />
        <CardContainer />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { userInfo: state.posts.correspondingTo };
}

export default connect(mapStateToProps, actions)(UserPosts);
