import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import userImage from '../../img/search/Gamer.jpg'; // Imagen para usuarios
import emptyImage from '../../img/search/NoHayResultados.png'; // Imagen para videojuegos
import GameCardGrid from "../component/GameCardGrid.jsx";

const SearchPage = () => {
  const [searchType, setSearchType] = useState("Usuario");
  const [searchQuery, setSearchQuery] = useState("");
  const { store, actions } = useContext(Context); // Traemos el store y actions desde flux
  const [filters, setFilters] = useState({});

  // Ejecuta la búsqueda cuando se cambia el searchType
  useEffect(() => {
    if (searchType === "Videojuego") {
      actions.getFilteredGames(filters);
    }
  }, [searchType, filters]);

  // Filtra los resultados de videojuegos
  const filteredResults = store.searchedGames.filter(game =>
    searchType === "Videojuego" && game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid" style={{ backgroundColor: "#16171C", paddingTop: "5px", marginTop: "100px" }}>
      {/* Barra de búsqueda */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="d-flex justify-content-start" style={{ width: "50%", margin: "0 auto", marginLeft: "46%"  }}>
            <label className="form-label" style={{ color: "#FFFFFF", fontFamily: "Poppins", fontSize: "18px" }}>
              Busca tu Usuario/Videojuego
            </label>
          </div>
          <div className="d-flex mb-3">
            {/* Dropdown */}
            <select
              className="form-select"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              style={{ fontFamily: "Poppins", fontSize: "20px", color: "#FFFFFF", backgroundColor: "#797979", border: "none", marginRight: "10px" }}
            >
              <option value="Usuario">Usuario</option>
              <option value="Videojuego">Videojuego</option>
            </select>
  
            {/* Input de búsqueda */}
            <input
              type="text"
              className="form-control"
              placeholder={`Buscar ${searchType}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ fontFamily: "Poppins", fontSize: "20px", color: "#FFFFFF", backgroundColor: "#797979", border: "none", marginRight: "10px" }}
            />
            {/* Botón de búsqueda */}
            <button
              className="btn"
              onClick={() => actions.getFilteredGames({ name: searchQuery })}
              style={{
                background: "linear-gradient(to right, #8C67F6 0%, #523C90 100%)",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
                fontSize: "16px",
                fontFamily: "Poppins",
                textAlign: "center"
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
  
      {/* Resultados de búsqueda */}
      <div className="row justify-content-center flex-grow-1">
        <div className="col-md-8">
          <div className="d-flex flex-wrap">
            {filteredResults.length === 0 ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh", marginLeft: "auto", marginRight: "auto" }}>
                <p style={{ color: "#FFFFFF", textAlign: "center" }}>No se encontraron resultados para "{searchQuery}".</p>
                <img
                  src={emptyImage}
                  alt="Sin resultados"
                  style={{ width: "300px", height: "auto", display: "block", margin: "0 auto" }}
                />
              </div>
            ) : (
              <GameCardGrid games={filteredResults} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default SearchPage;

