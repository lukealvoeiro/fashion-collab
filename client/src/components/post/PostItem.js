import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions";
import { getS3File } from "../../utils/files";

class PostItem extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      isLiked: props.post.isLiked,
    };
  }

  isLiked() {
    const { likedBy } = this.props.post;
    if (likedBy.indexOf(this.props.currentUserID) >= 0) return true;
    return false;
  }

  likePost() {
    console.log({ "about to be liked by": this.props.currentUserID });
    this.setState((prevState) => ({
      isLiked: !prevState.isLiked,
    }));
    this.props.likePost({
      userId: this.props.currentUserID,
      postId: this.props.post._id,
    });
  }

  render() {
    const { description, image, createdOn } = this.props.post;
    const { firstName, lastName } = this.props.post._user;
    return (
      <div className="card">
        <img className="card-img-top" src={getS3File(image)} alt="Card" />
        <div className="card-body card-padding">
          <div className="card-text">
            <p className="display-inline card-username">
              {firstName + " " + lastName}
            </p>
            <p>{description}</p>
          </div>
          <a
            href="#"
            className="card-like-btn align-middle link-unstyled"
            onClick={() => {
              this.likePost();
            }}
          >
            <i
              className={`fa${
                this.state.isLiked ? "s card-liked" : "r"
              } fa-heart`}
            ></i>
          </a>
          <div></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentUserID: state.auth.user._id };
}

export default connect(mapStateToProps, actions)(PostItem);
