import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
      postId: this.props.post._id,
    });
  }

  render() {
    const { description, image } = this.props.post;
    const { firstName, lastName, _id } = this.props.post._user;
    const imageSrc = getS3File(image);
    return (
      <div className="card">
        <img className="card-img-top" src={imageSrc} alt="Card" />
        <div className="card-body card-padding">
          <div className="card-text">
            <Link
              className="display-inline card-username link-unstyled"
              to={"/u/" + _id}
            >
              {firstName + " " + lastName}
            </Link>
            <p>{description}</p>
          </div>
          <a
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
