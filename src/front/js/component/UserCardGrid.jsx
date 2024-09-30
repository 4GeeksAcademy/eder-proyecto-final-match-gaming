import React from "react";
import emptyImage from '../../img/search/not-found.jpeg'; // Imagen para usuarios
import { useNavigate } from "react-router-dom";

const UserCardGrid = ({ users }) => {

  const navigate = useNavigate();

  const handleCardClick = (user) => {
    navigate(`/profile/${user.id}`)
  }

  return (
    <div className="container"> 
      <div className="row justify-content-center">
        {users.map((user, index) => (
          <div key={index} className="col-md-4 mb-4" onClick={() => handleCardClick(user)}>
            <div className="card" style={{ backgroundColor: "#1E1E1E", color: "#FFFFFF", width: "100%", margin: "10px" }}>
              <img
                src={user.profile_img_url ? user.profile_img_url : emptyImage} // Usando 'profile_img_url'
                className="card-img-top"
                alt={`Imagen de ${user.username}`}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body" style={{ height: "200px", display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                <h5 className="card-title" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "10px" }}>
                  {user.username}
                </h5>
                <p className="card-text" style={{ flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "normal" }}>
                  Plataforma: {user.platform.join(", ")}<br />
                  Tipo de juego: {user.type_game.join(", ")}<br />
                  Schedule: {user.schedule}<br />
                  Región: {user.region}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCardGrid;
