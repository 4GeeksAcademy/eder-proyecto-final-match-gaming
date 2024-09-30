import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
// import { useParams } from "react-router-dom";

export const GameDetails = () => {
  const {store, actions}=useContext(Context)
  // const { id } = useParams(); // Obtener el id de la URL
  // const [game, setGame] = useState(null);
  // const [error, setError] = useState(null); // Para manejar errores

  // useEffect(() => {
    // const fetchGameDetails = async () => {
    //   try {
    //     console.log("Este es el id: ", id);
    //     const url = `${process.env.BACKEND_URL}/api/search/${id}`;
    //     console.log("Fetching from URL: ", url);
  
    //     const response = await fetch(url);
  
    //     const data = await response.json();
    //     console.log("Esto es data: ", data);
  
    //     if (!data) {
    //       throw new Error("No se encontraron datos");
    //     }
  
    //     setGame(data);
    //   } catch (error) {
    //     console.error("Error fetching game details:", error);
    //   }
    // };
  
    // fetchGameDetails();
  //   console.log("Soy useEffect: ")
  // }, [id]);
  
  

  // // Mostrar un mensaje si hay error
  // if (error) {
  //   return <div>Error al cargar los detalles del juego: {error}</div>;
  // }

  // // Mostrar un mensaje de carga mientras no se tenga el juego
  // if (!game) {
  //   return <div>Cargando...</div>;
  // }

  // // Verificación adicional para evitar errores de acceso a propiedades nulas o indefinidas
  // const {
  //   background_image,
  //   name,
  //   platform = [], // Si platform es undefined, usa un array vacío
  //   type_game = [], // Si type_game es undefined, usa un array vacío
  //   rating,
  //   released
  // } = game;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={background_image || "ruta-a-una-imagen-por-defecto.png"} // Muestra una imagen por defecto si no hay `background_image`
            alt={`Portada del videojuego ${store.currentGameDetail.name}`}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{store.currentGameDetail.name || "Nombre no disponible"}</h2>
          <p><strong>Plataformas:</strong> {store.currentGameDetail.platform.length ? store.currentGameDetail.platform.join(", ") : "No disponible"}</p>
          <p><strong>Género:</strong> {store.currentGameDetail.type_game.length ? store.currentGameDetail.type_game.join(", ") : "No disponible"}</p>
          <p><strong>Rating:</strong> {store.currentGameDetail.rating || "No disponible"}</p>
          <p><strong>Fecha de lanzamiento:</strong> {store.currentGameDetail.released ? new Date(store.currentGameDetail.released).toLocaleDateString() : "No disponible"}</p>
        </div>
      </div>
    </div>
  );
};

