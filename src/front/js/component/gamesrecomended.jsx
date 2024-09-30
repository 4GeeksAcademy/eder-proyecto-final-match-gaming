import React, { useEffect, useContext, useState } from "react";
import { CardComponentGames } from "../component/cardGamesRecomended.jsx";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Gamesrecomended = () => {
  const { store, actions } = useContext(Context);
  const [visibleGames, setVisibleGames] = useState(3); 

  const navigate = useNavigate()

  useEffect(() => {
    actions.getGamesRecomended(15);
  }, []); 

  const handleViewMore = () => {
    setVisibleGames((prev) => prev + 3); 
  };

  const handleCardClick = (game) => {
    actions.fillCurrentGame(game)
    navigate('/game-details');
  };

  const gamesAvailable = store.games && Array.isArray(store.games) ? store.games : [];


  return (
    <section className="py-5 bg-black">
      <div className="container rounded shadow">
        <div className="custom-bg-gamers">
          <h1 className="custom-title-2"> Games Recommended </h1>
          <div className="row mt-5">
            {gamesAvailable.length > 0 ? (
              gamesAvailable.slice(0, visibleGames).map((game, index) => ( 
                <div
                  key={index}
                  className="col-12 col-md-4 mb-4 custom-card-games-recomended" onClick={() => handleCardClick(game)}
                >
                  <CardComponentGames
                    imageSrc={
                      game.background_image || "https://via.placeholder.com/150"
                    }
                    title={game.name}
                  />
                </div>
              ))
            ) : (
              <p>No games available</p>
            )}
          </div>
          {visibleGames < gamesAvailable.length && ( 
            <div className="col-12 text-center d-flex justify-content-center mt-5 mb-4">
              <button type="button" className="btn custom-button" onClick={handleViewMore}>
                View more
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
