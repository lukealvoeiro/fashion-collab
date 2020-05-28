import React from "react";
import * as actions from "../../actions";
import { connect } from "react-redux";
import CardContainer from "./CardContainer";

const ExplorePosts = ({ fetchAllPosts, currUserID }) => {
  fetchAllPosts();
  return <CardContainer />;
};

function mapStateToProps(state) {
  return { currUserID: state.auth.user._id };
}

export default connect(mapStateToProps, actions)(ExplorePosts);
