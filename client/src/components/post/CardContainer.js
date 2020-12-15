import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";

import PostItem from "./PostItem";

class CardContainer extends Component {
  renderPosts() {
    return _.map(this.props.posts, (post) => {
      return <PostItem key={post._id} post={post} />;
    });
  }

  state = {};
  render() {
    const noPosts =
      this.props.posts.length == 0 ? (
        <div className="no-posts">No posts available</div>
      ) : null;
    return (
      <Fragment>
        <div className="card-columns">{this.renderPosts()}</div>
        {noPosts}
        <div className="new-post-button">
          <Link to="/posts/new">
            <span className="fa-stack fa-2x br-buttons">
              <i className="fas fa-circle fa-stack-2x fa-inverse"></i>
              <i className="fas fa-plus fa-stack-1x"></i>
            </span>
          </Link>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.list };
}

export default connect(mapStateToProps, null)(CardContainer);
