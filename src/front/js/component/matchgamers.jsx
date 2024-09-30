import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { HomePlayer } from "./home_players.jsx";
import {MatchPeople} from "../component/match_results/match_people.jsx"

export const MatchGamers = () => {

  const {actions, store} = useContext(Context)

  useEffect(() => {
    store.recommendedGames = []
    store.usersByGame = []
    actions.getRecommendedGames_gameSelection(1).then(() => {
      actions.getUsersByGame(store.recommendedGames[0].id)
    }).then(() => {

      console.log(store.usersByGame)
    })
  },[])
  
  return (
    <>
      <section className="py-5 bg-black">
        <div className="container rounded shadow">
          <div className="custom-bg-gamers">
            <h1 className="custom-title-2">Match Gamers</h1>
            <div className="row">
              <div className="col-lg-4">
              <div className="card border-card-match-gamers bg-black">
                      {store.recommendedGames && store.recommendedGames.length > 0 ? (
                          <img src={store.recommendedGames[0].background_image} className="card-img-top rounded" alt={store.recommendedGames[0].name} style={{height: '408px', objectFit: 'cover'}}/>
                        ) : (
                          <div className="text-center py-5">
                              <p className="text-white">Cargando imagen...</p>
                          </div>
                      )}
                      <h5 className="text-white text-center text-uppercase pt-2 pb-1">{store.recommendedGames && store.recommendedGames.length > 0 ? store.recommendedGames[0].name : "Loading"}</h5>
                  </div>
              </div>
              <div className="col-lg-8 text-white">
                {store.usersByGame && store.usersByGame.length > 0 ? (
                  (store.usersByGame.map(user => 
                    <MatchPeople key={user.id} username={user.username} imagen={user.profile_img_url} first_name={user.first_name} schedule={user.schedule} region={user.region} id={user.id}/>
                  ))
                ) : (
                  <div className="text-center py-5">
                              <p className="text-white">No match</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
