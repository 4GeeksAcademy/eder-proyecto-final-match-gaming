import React, { useContext, useEffect } from "react";
import logo from "../../img/logo/logo-marca.png"
import { GameSelected } from "../component/match_results/game_selected.jsx";
import { MatchPeople } from "../component/match_results/match_people.jsx";
import "../../styles/genre_selection.css"
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";

export const MatchResults = () => {

    const params = useParams()
    const {actions, store} = useContext(Context)

    useEffect(() => {
        actions.getSpecificGame(params.id_game).then(()=> {
            actions.getUsersByGame(params.id_game)
        })
    },[])

    return(
        <div className="d-flex flex-column min-vh-100 pb-3" style={{backgroundColor: "#16171C", color: "#fff"}}>
        <img src={logo} alt="Logo" style={{width: '40%', height: '80px', margin: '10px', objectFit: 'contain'}} />
            <div className="container text-center my-auto mt-5">
                <div className="row">
                    <h2 className="mb-5 fw-bold">Match Results</h2>
                    <div className="col-md-4 mb-2 d-flex justify-content-center">
                        <GameSelected name={store.specificGame.name} imagen={store.specificGame.background_image}/>
                    </div>
                    <div className="col-md-8 mb-2 d-flex px-0">
                        <div className=" border-0 rounded p-2 m-2 w-100 text-start">
                            <div className="container px-0">
                                <div className="row">
                                    <h4 className="">Results:</h4>
                                </div>
                                {store.usersByGame && store.usersByGame.length > 0 ? (
                                store.usersByGame.map(user => (
                                    <MatchPeople key={user.id} username={user.username} imagen={user.profile_img_url} first_name={user.first_name} schedule={user.schedule} region={user.region} id={user.id}/>
                                ))
                                ) : (
                                    <p>No users found</p> 
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}