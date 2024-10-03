import React from "react";
import "../../styles/team.css";

const ProfileCard = ({ name, jobTitle, image, description, overlayText, externalLink }) => {
  return (
    <div className="card card_team_custom bg-container border-card-match-gamers">
      <div className="card-body mt-5 mb-5 text-center">
        <img
          src={image}
          className="rounded-circle mb-3"
          alt={`${name} avatar`}
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{jobTitle}</p>
        <p className="card-text">Fav games: {description}</p>
      </div>
      <div className="custom_card_team card-overlay">
        <p>{overlayText}</p>
        <div className="custom-buttom-connect">
          <a href={externalLink} target="_blank" rel="noopener noreferrer">Connect</a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
