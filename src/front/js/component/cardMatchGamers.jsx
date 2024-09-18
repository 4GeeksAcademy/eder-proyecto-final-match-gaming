import React from "react";
import PropTypes from "prop-types";

export const CardComponentUser = ({
  imageSrc,
  username,
  buttonText,
  onButtonClick,
}) => {
  return (
    <section id="MatchGames">
      <div className="card custom-card mb-2 bg-black border-card-match-gamers">
        <div className="row g-0 align-items-center" style={{ height: "auto" }}>
          <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-start">
            <img
              src={imageSrc}
              className="img-fluid rounded-circle my-2 m-5"
              alt={username}
              width={60}
              height={60}
            />
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-start justify-content-md-start">
            <div className="card-body text-center text-md-start">
              <h5 className="card-title text-white">{username}</h5>
            </div>
          </div>
          <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end p-2 p-md-4">
            <button
              className="btn custom-button-card-gamers"
              onClick={onButtonClick}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

CardComponentUser.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  // title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
