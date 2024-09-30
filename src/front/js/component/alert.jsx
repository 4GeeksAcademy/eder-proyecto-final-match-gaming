import React from "react";
import PropTypes from "prop-types";
import "../../styles/alert.css";

export const Modal = ({ title, message, onClose, actions }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header text-center">
          <h5>{title}</h5>
        </div>
        <div className="modal-body text-white">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};





