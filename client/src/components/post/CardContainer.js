import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PostItem from "./PostItem";
import { connect } from "react-redux";

//to load cards:
import _ from "lodash";
import SearchBar from "../searchBar/SearchBar";

class CardContainer extends Component {
  renderPosts() {
    return _.map(this.props.posts, (post) => {
      return <PostItem key={post._id} post={post} />;
    });
  }

  state = {};
  render() {
    return (
      <Fragment>
        <div class="card-columns">{this.renderPosts()}</div>
        <div className="new-post-button">
          <Link to="/posts/new">
            <span class="fa-stack fa-2x br-buttons">
              <i class="fas fa-circle fa-stack-2x fa-inverse"></i>
              <i class="fas fa-plus fa-stack-1x"></i>
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
