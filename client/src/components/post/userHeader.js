import { useMediaQuery } from "react-responsive";
import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { followUser, unfollowUser } from "../../actions/user";

const UserHeader = ({
  profile,
  posts,
  followUser,
  unfollowUser,
  currUserId,
}) => {
  console.log(profile);
  const isMobile = useMediaQuery({ maxWidth: 576 });
  if (!profile) return null;

  const renderFollowButtons = () => {
    if (profile._id !== currUserId) {
      if (!profile.followers.includes(currUserId))
        return (
          <div className="follow-btn">
            <Button
              size="sm"
              style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
              onClick={() => followUser(profile._id)}
            >
              {" Follow "}
            </Button>
          </div>
        );
      else
        return (
          <div className="follow-btn">
            <Button
              variant="light"
              size="sm"
              style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
              onClick={() => unfollowUser(profile._id)}
            >
              {" Unfollow "}
            </Button>
          </div>
        );
    }
  };

  const UserNumbersInfo = (
    <div className="profile-row-spacer">
      <div className="user-info">
        <span className="user-info-number">{posts}</span> posts
      </div>
      <div className="user-info">
        <span className="user-info-number">{profile.followers.length}</span>{" "}
        followers
      </div>
      <div className="user-info">
        <span className="user-info-number">{profile.following.length}</span>{" "}
        following
      </div>
    </div>
  );
  return (
    <header className="profile-header">
      <div className="profile-spacing">
        <div style={{ flexGrow: 1, flexBasis: 0 }}>
          <div
            className="profile-img-wrapper"
            style={{
              backgroundImage:
                "https://miro.medium.com/max/480/0*WK_vAxJo4O7Kdq3j.png",
            }}
          >
            <img></img>
          </div>
        </div>
        <section className="profile-text-wrapper">
          <div className="profile-row-spacer no-justify">
            <h3>{profile.firstName + " " + profile.lastName}</h3>
            {renderFollowButtons()}
          </div>
          {!isMobile && UserNumbersInfo}
          <div className="profile-row-spacer">Bio</div>
        </section>
      </div>
      {isMobile && UserNumbersInfo}
    </header>
  );
};

export default connect(null, { followUser, unfollowUser })(UserHeader);
