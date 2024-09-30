import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";

// import userImage from '../../img/search/Gamer.jpg'; // Imagen para usuarios
import emptyImage from '../../img/search/not-found.jpeg'; // Imagen para videojuegos
import GameCardGrid from "../component/GameCardGrid.jsx";
import UserCardGrid from "../component/UserCardGrid.jsx"; // Asegúrate de tener un componente para mostrar los usuarios

const SearchPage = () => {
  const [searchType, setSearchType] = useState("Usuario"); // Cambia "Usuario" a "Usuarios" si es necesario
  const [searchQuery, setSearchQuery] = useState("");
  const { store, actions } = useContext(Context);
  const [filters, setFilters] = useState({
    platform: "", // Filtro de plataforma
    type_game: "", // Filtro de tipo de juego
    region: "", // Filtro de región (para usuarios)
    schedule: "", // Filtro de horario (para usuarios)
  });



  useEffect(() => {
    if (searchType === "Videojuego") {
      actions.getFilteredGames({ name: searchQuery, ...filters });
    } else if (searchType === "Usuario") {
      actions.getFilteredUsers({ username: searchQuery, ...filters });
    }
  }, [searchType, filters, searchQuery]);

   //const [filteredResults,setfilteredResults]= useState(searchType === "Videojuego" ?store.searchedGames :store.filteredUsers)

  const filteredResults = searchType === "Videojuego"
    ? store.searchedGames
    // .filter(game =>
    //     game.name.toLowerCase().includes(searchQuery.toLowerCase())
        //  &&
        // (filters.platform === "" || game.platform.some(platform =>
        //   platform.toLowerCase().replace(/\s+/g, '') === filters.platform.toLowerCase().replace(/\s+/g, '')
        // )) &&
        // (filters.type_game === "" || game.type_game.some(type =>
        //   type.toLowerCase().replace(/\s+/g, '') === filters.type_game.toLowerCase().replace(/\s+/g, '')
        // ))
      // ) 
    : store.filteredUsers
    // .filter(user =>  
    //     user.username.toLowerCase().includes(searchQuery.toLowerCase()) 
      //   &&
      //   (filters.region === "" || user.region === filters.region) && // Filtrar por región
      // (filters.schedule === "" || user.schedule === filters.schedule) &&
      // (filters.type_game === "" || user.type_game === filters.type_game) &&
      // (filters.platform === "" || user.platform === filters.platform) // Filtrar por horario
      // );
      

  return (
    <div className="container-fluid" style={{ backgroundColor: "#16171C", paddingTop: "5px", marginTop: "100px" }}>
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="d-flex justify-content-start" style={{ width: "50%", margin: "0 auto", marginLeft: "46%" }}>
            <label className="form-label" style={{ color: "#FFFFFF", fontFamily: "Poppins", fontSize: "18px" }}>
              Escribe tu Usuario/Videojuego
            </label>
          </div>
          <div className="d-flex mb-3">
            <select
              className="form-select"
              value={searchType}
              onChange={(e) => {setSearchType(e.target.value);setFilters({
                platform: "", // Filtro de plataforma
                type_game: "", // Filtro de tipo de juego
                region: "", // Filtro de región (para usuarios)
                schedule: "", // Filtro de horario (para usuarios)
              })}}
              //onChange={(e) => e.target.value === "Usuario" ? setfilteredResults(store.filteredUsers) : setfilteredResults(store.searchedGames)}
              style={{ fontFamily: "Poppins", fontSize: "20px", color: "#FFFFFF", backgroundColor: "#797979", border: "none", marginRight: "10px" }}
            >
              <option value="Usuario">Usuario</option>,
              <option value="Videojuego">Videojuego</option>
            </select>

            <input
              type="text"
              className="form-control"
              placeholder={`Buscar ${searchType}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ fontFamily: "Poppins", fontSize: "20px", color: "#FFFFFF", backgroundColor: "#797979", border: "none", marginRight: "10px" }}
            />
            <button
              className="btn"
              onClick={() => {
                if (searchType === "Videojuego") {
                  actions.getFilteredGames({ ...filters, name: searchQuery });
                } else {
                  actions.getFilteredUsers({ name: searchQuery, ...filters });
                }
              }}
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
              <div className="flex-grow-1 me-2">
                <select
                  className="form-select"
                  // value={filters.platform}
                  onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
                  style={{ fontFamily: "Poppins", fontSize: "20px", color: "#FFFFFF", backgroundColor: "#797979", border: "none" }}
                >
                  <option value="">Seleccione la plataforma</option>
                  <option value="XBOX">Xbox</option>
                  <option value="STEAM">Steam</option>
                  <option value="PLAY">Play Station</option>
                  <option value="SWITCH ">Switch</option>
                </select>
              </div>

              <div className="flex-grow-1">
                <select
                  className="form-select"
                  // value={filters.type_game}
                  onChange={(e) => setFilters({ ...filters, type_game: e.target.value })}
                  style={{ fontFamily: "Poppins", fontSize: "20px", color: "#FFFFFF", backgroundColor: "#797979", border: "none" }}
                >
                  <option value="">Seleccione el género</option>
                  <option value="SHOOTER">Shooter</option>
                  <option value="ACTION">Action</option>
                  <option value="ADVENTURE">Adventure</option>
                  <option value="SPORTS">Sports</option>
                  <option value="STRATEGY">Strategy</option>
                  <option value="RPG">RPG</option>
                </select>
              </div>
            </div>
          )}

          {searchType === "Usuario" && (
            <div className="d-flex mb-3">
              {/* Filtro de región */}
              <div className="flex-grow-1 me-2">
                <select
                  className="form-select"
                  value={filters.region}
                  onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                  style={{ fontFamily: "Poppins", fontSize: "20px", color: "#FFFFFF", backgroundColor: "#797979", border: "none" }}
                >
                  <option value="">Región</option>
                  <option value="SA">South America</option>
                  <option value="NA">North America</option>
                </select>
              </div> 

              {/* Filtro de tipo de juego */}
              <div className="flex-grow-1 me-2">
                <select
                  className="form-select"
                  value={filters.type_game}
                  onChange={(e) => setFilters({ ...filters, type_game: e.target.value })}
                  style={{ fontFamily: "Poppins", fontSize: "20px", color: "#FFFFFF", backgroundColor: "#797979", border: "none" }}
                >
                  <option value="">Género</option>
                  <option value="SHOOTER">Shooter</option>
                  <option value="ACTION">Action</option>
                  <option value="ADVENTURE">Adventure</option>
                  <option value="SPORTS">Sports</option>
                  <option value="STRATEGY">Strategy</option>
                  <option value="RPG">Rpg</option>
                </select>
              </div>

              {/* Filtro de plataforma */}
              <div className="flex-grow-1 me-2">
                <select
                  className="form-select"
                  value={filters.platform}
                  onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
                  style={{ fontFamily: "Poppins", fontSize: "20px", color: "#FFFFFF", backgroundColor: "#797979", border: "none" }}
                >
                  <option value="">Plataforma</option>
                  <option value="XBOX">Xbox</option>
                  <option value="STEAM">Steam</option>
                  <option value="PLAY">Play Station</option>
                </select>
              </div>

               {/* Filtro de horario */}
               <div className="flex-grow-1 me-2">
                <select
                  className="form-select"
                  value={filters.schedule}
                  onChange={(e) => setFilters({ ...filters, schedule: e.target.value })}
                  style={{ fontFamily: "Poppins", fontSize: "20px", color: "#FFFFFF", backgroundColor: "#797979", border: "none" }}
                >
                  <option value="">Horario</option>
                  <option value="MORNING">Morning</option>
                  <option value="AFTERNOON">Afternoon</option>
                  <option value="EVENING">Evening</option>
                </select>
              </div>
            </div>
          )}

          {/* Mostrar resultados */}
          <div className="row justify-content-center mt-3">
            {searchType === "Videojuego" && filteredResults.length > 0 ? (
              <GameCardGrid games={filteredResults} />
            ) : searchType === "Usuario" && filteredResults.length > 0 ? (
              <UserCardGrid users={filteredResults} />
            ) : (
              <div className="text-center">
                <img src={emptyImage} alt="No hay resultados" style={{ width: "50%", height: "50%", objectFit: "contain", marginTop: "5px"}} />
                <p className="text-white">No hay resultados para la búsqueda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
