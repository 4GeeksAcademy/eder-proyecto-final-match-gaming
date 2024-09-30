import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.statusText} - ${errorText}`);
  }
  return response.json();
};

export const FavoriteGames = ({ userId }) => {
  const [games, setGames] = useState([]);
  const [availableGames, setAvailableGames] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const fetchFavoriteGames = async () => {
      try {
        const data = await fetchData(
          `${process.env.BACKEND_URL}/api/favorites/${userId}`
        );
        if (isMounted.current) setGames(data.user_games || []);
      } catch (error) {
        if (isMounted.current)
          console.error("Error al obtener los juegos favoritos:", error);
      }
    };

    fetchFavoriteGames();
    return () => {
      isMounted.current = false;
    };
  }, [userId]);

  useEffect(() => {
    isMounted.current = true;
    const fetchRecommendedGames = async () => {
      try {
        const data = await fetchData(
          `${process.env.BACKEND_URL}/api/games_all`
        );
        if (isMounted.current) setAvailableGames(data);
      } catch (error) {
        if (isMounted.current)
          console.error("Error al obtener los juegos recomendados:", error);
      }
    };

    fetchRecommendedGames();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleGameAction = async (gameId, action) => {
    const url =
      action === "add"
        ? `${process.env.BACKEND_URL}/api/favorites`
        : `${process.env.BACKEND_URL}/api/favorites_remove?id=${userId}&id_game=${gameId}`;
    const options =
      action === "add"
        ? {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id_user: parseInt(userId),
              fav_ids: [gameId],
            }),
          }
        : { method: "DELETE" };

    try {
      await fetchData(url, options);
      if (isMounted.current) {
        setGames((prev) =>
          action === "add"
            ? [...prev, availableGames.find((game) => game.id === gameId)]
            : prev.filter((game) => game.id !== gameId)
        );
      }
    } catch (error) {
      if (isMounted.current)
        console.error(
          `Error al ${action === "add" ? "agregar" : "eliminar"} el juego:`,
          error
        );
    }
  };

  const isFavorite = (gameId) => games.some((game) => game.id === gameId);
  const combinedGames = [
    ...games,
    ...availableGames.filter((game) => !isFavorite(game.id)),
  ];

  return (
    <div className="favorite-games">
      <h4>Juegos</h4>
      <ul className="list-group mt-3">
        {combinedGames.length > 0 ? (
          combinedGames.map((game) => (
            <li
              key={game.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <img
                  src={game.background_image}
                  alt={game.name}
                  style={{ width: "50px", marginRight: "10px" }}
                />
                {game.name}
              </div>
              <button
                type="button"
                className={`btn btn-sm ${
                  isFavorite(game.id) ? "btn-danger" : "btn-primary"
                }`}
                onClick={() =>
                  handleGameAction(
                    game.id,
                    isFavorite(game.id) ? "remove" : "add"
                  )
                }
              >
                {isFavorite(game.id)
                  ? "Eliminar de Favoritos"
                  : "Agregar a Favoritos"}
              </button>
            </li>
          ))
        ) : (
          <li className="list-group-item">No hay juegos recomendados</li>
        )}
      </ul>
    </div>
  );
};

FavoriteGames.propTypes = {
  userId: PropTypes.string.isRequired,
};
