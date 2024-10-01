import React from "react";
import "../../styles/team.css";

const ProfileCard = ({ name, jobTitle, image, description }) => {
  return (
    <div className="card  bg-container">
      <div className="card-body mt-3 mb-3 text-center">
        <img
          src={image}
          className="rounded-circle mb-3"
          alt={`${name} avatar`}
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{jobTitle}</p>
        <p className="card-text">{description}</p>
        <button className="btn btn-primary">Connect</button>
      </div>
    </div>
  );
};

export default ProfileCard;