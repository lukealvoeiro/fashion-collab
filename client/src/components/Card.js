import React, { Component } from "react";

class Card extends Component {
  state = {
    isLiked: this.props.isLiked
  };

  likePost = () => {
    this.setState(prevState => ({ isLiked: !prevState.isLiked }));
    // need to add event handling here
  };

  goToUser = userId => {
    // route to user that corresponds to userId's page
  };

  render() {
    const { isLiked } = this.state;

    return (
      // <div class="col-xs-6 col-sm-12 col-md-4 col-lg-4 col-xl-3">
      <div className="card">
        {/* <div class="card-header">username</div> */}
        <img className="card-img-top" src={derp()} alt="Card" />
        <div className="card-body card-padding">
          <div className="card-text">
            <p className="display-inline card-username">username</p>Some quick
            example text for ya'll to see
          </div>
          <a
            onClick={this.likePost}
            href="#"
            className="card-like-btn align-middle link-unstyled"
          >
            <i className={`fa${isLiked ? "s card-liked" : "r"} fa-heart`}></i>
          </a>
          <div></div>
        </div>
      </div>
      // </div>
    );
  }
}

function derp() {
  var array = [
    "https://i.ytimg.com/vi/Bor5lkRyeGo/hqdefault.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Tampa_FL_Sulphur_Springs_Tower_tall_pano01.jpg/568px-Tampa_FL_Sulphur_Springs_Tower_tall_pano01.jpg",
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1671&q=80",
    "https://images.unsplash.com/photo-1554797589-7241bb691973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80"
  ];
  return array[Math.floor(Math.random() * array.length)];
}

export default Card;
