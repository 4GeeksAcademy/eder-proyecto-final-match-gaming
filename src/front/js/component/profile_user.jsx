import React from "react";
import PropTypes from "prop-types";

export const UserProfileCard = ({
  profile_img_url,
  username,
  first_name,
  last_name,
  description,
  steam_id,
  discord_id,
}) => {
  return (
    <div className="row align-items-start">
      <div className="col-12 col-md-2 text-center mb-3 mb-md-0">
        <img
          src={profile_img_url}
          className="img-thumbnail circular-image"
          alt=""
        />
      </div>
      <div className="col-12 col-md-8 mb-4">
        <h3>
          <span className="ms-5">{username}</span>
        </h3>
        <div className="personal-data mt-2">
          <p className="ms-5">
            <strong>
              {first_name} {last_name}
            </strong>
          </p>
        </div>
        <div className="description mt-2 ms-5">
          <span>{description}</span>
        </div>
        <div className="social-links mt-4 ms-5">
          <p className="d-flex justify-content-start flex-wrap">
            <a
              href={steam_id}
              target="_blank"
              rel="noopener noreferrer"
              className="me-3"
            >
              <i className="fab fa-steam fa-2x"></i>
            </a>
            <a
              href={discord_id}
              target="_blank"
              rel="noopener noreferrer"
              className="me-3"
            >
              <i className="fab fa-discord fa-2x"></i>
            </a>
            <a href={discord_id} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitch fa-2x"></i>
            </a>
          </p>
        </div>
      </div>
      <div className="col-12 col-md-2 d-flex justify-content-center align-items-start py-3">
        <button type="button" className="btn custom-button me-5">
          Connect
        </button>
      </div>
    </div>
  );
};

UserProfileCard.propTypes = {
  profile_img_url: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  steam_id: PropTypes.string,
  discord_id: PropTypes.string,
};
