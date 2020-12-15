import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";
import CardContainer from "./CardContainer";
import UserHeader from "./userHeader";

class UserPosts extends Component {
  componentWillMount() {
    this.setState({
      id: this.props.match.params.id,
    });
    this.props.fetchUserPosts(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps === undefined) {
      return false;
    }

    if (this.state.id !== this.props.match.params.id) {
      this.props.fetchUserPosts(this.props.match.params.id);
      this.setState({ id: this.props.match.params.id });
    }
  }

  render() {
    const { posts, userInfo, currUserId } = this.props;
    let numPosts = null;
    if (posts) numPosts = posts.length;

    return (
      <Fragment>
        <UserHeader
          profile={userInfo}
          posts={numPosts}
          currUserId={currUserId}
        />
        <CardContainer />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    currUserId: state.auth.user._id,
    userInfo: state.posts.correspondingTo,
    posts: state.posts.list,
  };
}

export default connect(mapStateToProps, actions)(UserPosts);
