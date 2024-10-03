import React from "react";
import PropTypes from "prop-types";

export const CardComponentGames = ({ imageSrc, title }) => {
  const cardStyle = {
    border: "1px solid #8c67f6",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
    backgroundColor: "#000", // Fondo negro para la tarjeta
  };

  const cardImgStyle = {
    width: "100%",
    height: "250px",
    objectFit: "cover",
  };

  const cardBodyStyle = {
    padding: "15px",
    textAlign: "center",
  };

  const cardTitleStyle = {
    fontSize: "1.2em",
    fontWeight: "bold",
    color: "#fff",
  };

  return (
    <div className="card-recommended card" style={cardStyle}>
      <img src={imageSrc} style={cardImgStyle} alt={title} />
      <div className="card-body" style={cardBodyStyle}>
        <h4 className="card-title" style={cardTitleStyle}>
          {title}
        </h4>
      </div>
    </div>
  );
};

CardComponentGames.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
