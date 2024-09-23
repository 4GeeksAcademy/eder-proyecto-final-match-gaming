import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import userImage from '../../img/search/Gamer.jpg'; // Imagen para usuarios
import emptyImage from '../../img/search/NoHayResultados.png'; // Imagen para videojuegos
import GameCardGrid from "../component/GameCardGrid.jsx";

const SearchPage = () => {
  const [searchType, setSearchType] = useState("Usuario");
  const [searchQuery, setSearchQuery] = useState("");
  const { store, actions } = useContext(Context); // Traemos el store y actions desde flux
  const [filters, setFilters] = useState({
    platform: "", // Filtro de plataforma
    type_game: "" // Filtro de tipo de juego
  });

  // Ejecuta la búsqueda cuando se cambia el searchType o los filtros
  useEffect(() => {
    if (searchType === "Videojuego") {
      actions.getFilteredGames(filters);
    }
  }, [searchType, filters]);

  // Filtra los resultados de videojuegos
  const filteredResults = store.searchedGames.filter(game =>
    searchType === "Videojuego" &&
    game.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    
    // Filtrado por plataforma
    (filters.platform === "" || game.platform.some(platform =>
      platform.toLowerCase().replace(/\s+/g, '') === filters.platform.toLowerCase().replace(/\s+/g, '')
    )) &&
    
    // Filtrado por tipo de juego
    (filters.type_game === "" || game.type_game.some(type =>
      type.toLowerCase().replace(/\s+/g, '') === filters.type_game.toLowerCase().replace(/\s+/g, '')
    ))
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
              onClick={() => actions.getFilteredGames({ ...filters, name: searchQuery })}
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

          {/* Filtros adicionales (plataforma y tipo de juego) */}
          {searchType === "Videojuego" && (
            <div className="d-flex mb-3">
              {/* Filtro de plataforma */}
              <div className="flex-grow-1 me-2">
                <label className="form-label" style={{ color: "#FFFFFF", fontFamily: "Poppins", fontSize: "18px" }}>
                  Seleccione plataforma
                </label>
                <select
                  className="form-select"
                  value={filters.platform}
                  onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
                  style={{ fontFamily: "Poppins", fontSize: "20px", color: "#FFFFFF", backgroundColor: "#797979", border: "none" }}
                >
                  <option value="">Seleccione la plataforma</option>
                  <option value="xbox">Xbox</option>
                  <option value="steam">Steam</option>
                  <option value="play station">Play Station</option>
                  {/* Agrega más plataformas según sea necesario */}
                </select>
              </div>

              {/* Filtro de tipo de juego */}
              <div className="flex-grow-1">
                <label className="form-label" style={{ color: "#FFFFFF", fontFamily: "Poppins", fontSize: "18px" }}>
                  Seleccione tipo de juego
                </label>
                <select
                  className="form-select"
                  value={filters.type_game}
                  onChange={(e) => setFilters({ ...filters, type_game: e.target.value })}
                  style={{ fontFamily: "Poppins", fontSize: "20px", color: "#FFFFFF", backgroundColor: "#797979", border: "none" }}
                >
                  <option value="">Seleccione el género</option>
                  <option value="shooter">Shooter</option>
                  <option value="action">Action</option>
                  <option value="adventure">Adventure</option>
                  <option value="sports">Sports</option>
                  <option value="strategy">Strategy</option>
                  <option value="rpg">RPG</option>
                  {/* Agrega más tipos de juego según sea necesario */}
                </select>
              </div>
            </div>
          )}
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
