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
    <section className="py-5 min-vh-100" style={{ backgroundColor: "#222328"}}>
      <div
        className="container rounded shadow-sm"
        style={{
          marginTop: "100px",
          fontFamily: "Poppins",
        }}
      >
        {/* <h1 className="text-danger">{store.currentGameDetail.name}</h1> */}
      <div className="row d-flex justify-content-center my-auto mt-5"
      style={{ backgroundColor: "#1c1c1f", padding: "20px", borderRadius: "10px", marginTop: "20px"}}
      >
        <div className="col-md-6">
          <img
            src={store.currentGameDetail.background_image } // Muestra una imagen por defecto si no hay `background_image`
            alt={`Portada del videojuego ${store.currentGameDetail.name}`}
            style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "10px" }}
          />
        </div>
        <div className="col-md-6 text-light px-4">
          <h1 className="py-0 mt-2"
            style={{
              // background: "linear-gradient(to right, #8C67F6 0%, #523C90 100%)",
              // WebkitBackgroundClip: "text",
              // WebkitTextFillColor: "transparent"
              color: "#8c67f6"
            }}
          >
            {store.currentGameDetail.name || "Nombre no disponible"}
          </h1>
          <hr></hr>
          <p className="mt-4 fs-4"><strong>Plataformas:</strong> {store.currentGameDetail.platform.length ? store.currentGameDetail.platform.join(", ") : "No disponible"}</p>
          <p className="fs-4"><strong>Género:</strong> {store.currentGameDetail.type_game.length ? store.currentGameDetail.type_game.join(", ") : "No disponible"}</p>
          <p className="fs-4"><strong>Rating:</strong> {store.currentGameDetail.rating || "No disponible"}</p>
          <p className="fs-4"><strong>Fecha de lanzamiento:</strong> {store.currentGameDetail.released ? new Date(store.currentGameDetail.released).toLocaleDateString() : "No disponible"}</p>
        </div>
      </div>
    </div>
    </section>
  );
};
