import React from "react";
import * as actions from "../../actions";
import { connect } from "react-redux";
import CardContainer from "./CardContainer";

const UserPosts = ({ fetchUserPosts, match }) => {
  fetchUserPosts(match.params.id);
  return <CardContainer />;
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(UserPosts);
