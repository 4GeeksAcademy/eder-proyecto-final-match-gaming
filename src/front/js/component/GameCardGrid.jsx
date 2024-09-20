import React from "react";
import emptyImage from '../../img/search/NoHayResultados.png'; // Imagen para videojuegos

const GameCardGrid = ({ games }) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        {games.map((game, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card" style={{ backgroundColor: "#1E1E1E", color: "#FFFFFF", width: "100%", margin: "10px" }}>
              <img
                src={game.background_image ? game.background_image : emptyImage}
                className="card-img-top"
                alt={`Portada del videojuego ${game.name}`}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body" style={{ height: "150px", display: "flex", flexDirection: "column", marginBottom:"10px" }}>
                <h5 className="card-title" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "10px" }}>
                  {game.name}
                </h5>
                <p className="card-text" style={{ flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "normal" }}>
                  Plataformas: {game.platform.join(", ")}<br />
                  Género: {game.type_game.join(", ")}<br />
                  Rating: {game.rating}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameCardGrid;
