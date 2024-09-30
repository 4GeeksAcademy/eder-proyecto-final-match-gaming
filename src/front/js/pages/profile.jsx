import React from "react";
import { useParams } from "react-router-dom";
import "../../styles/profile.css";
import { UserInformation } from "../component/profile_details.jsx";

export const Profile = () => {
  const { userId } = useParams();

  return (
    <section id="profile" className="bg-black">
      <div className="container" style={{ marginTop: "112px" }}>
        <section id="profile_background">
          <div
            className="container gradient-background-profile text-center"
            style={{ minHeight: "160px" }}
          ></div>
        </section>
        <section id="profile_user_information">
          <div className="container background-user-information">
            <UserInformation userId={userId} />
          </div>
        </section>
      </div>
    </section>
  );
};
