import { useMediaQuery } from "react-responsive";
import React from "react";
import { Button } from "react-bootstrap";

const UserHeader = ({ profile }) => {
  const isMobile = useMediaQuery({ maxWidth: 576 });
  if (!profile) return null;
  console.log(profile);
  return (
    <header className="profile-header">
      <div className="profile-spacing">
        <div style={{ flexGrow: 1, flexBasis: 0 }}>
          <div className="profile-img-wrapper"></div>
        </div>
        <section className="profile-text-wrapper">
          <div className="profile-row-spacer no-justify">
            <h3>{profile.firstName + " " + profile.lastName}</h3>
            <div className="follow-btn">
              <Button
                size="sm"
                style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
              >
                {" "}
                Follow{" "}
              </Button>
            </div>
          </div>
          {!isMobile && UserNumbersInfo()}
          <div className="profile-row-spacer">Bio</div>
        </section>
      </div>
      {isMobile && UserNumbersInfo()}
    </header>
  );
};

function UserNumbersInfo() {
  return (
    <div className="profile-row-spacer">
      <div className="user-info">
        <span className="user-info-number">56</span> posts
      </div>
      <div className="user-info">
        <span className="user-info-number">5</span> followers
      </div>
      <div className="user-info">
        <span className="user-info-number">82</span> following
      </div>
    </div>
  );
}

export default UserHeader;
