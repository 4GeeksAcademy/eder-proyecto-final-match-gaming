import React from "react";
import "../../styles/profile.css";
import { UserInformation } from "../component/profile_details.jsx";
import imgperfil from "../../img/perfil/perfil-1.png";

export const Profile = () => {
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
            <UserInformation />
          </div>
        </section>
      </div>
    </section>
  );
};
