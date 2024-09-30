import React, { useContext, useEffect, useState } from "react";
import logo from "../../img/logo/logo-marca.png"
import { MatchGame } from "../component/match_game/game_match.jsx";
import { Context } from "../store/appContext.js";
import "../../styles/genre_selection.css"

export const SearchMatch = () => {

    const {actions, store} = useContext(Context)
    const [gameName, setGameName] = useState("")
    const [platform, setPlatform] = useState("")
    const [typeGame, setTypeGame] = useState("")

    useEffect(() => {
        store.usersByGame = []
        store.specificGame = []
        store.searchedGames = []
        setGameName("")
    },[])

    const getData = async (e) => {
        e.preventDefault()

        const searchData = {
            name: gameName,
            platform: platform,
            type_game: typeGame
        };

        await actions.getFilteredGames(searchData);
        
    }

    const handlePlatformSelect = (platform) => {
        setPlatform(platform);
    };


    const handleTypeGameSelect = (type) => {
        setTypeGame(type);
    };





    return(
        <div className="d-flex flex-column min-vh-100 pb-3" style={{backgroundColor: "#16171C", color: "#fff"}}>
            <img  src={logo} alt="Logo" style={{width: '40%', height: '80px', margin: '10px', objectFit: "contain"}} />
            <div className="container text-center my-auto mt-5">
                <div className="row">
                    <h2 className="mb-5 fw-bold">Match</h2>
                    <div className="col-md-10 mb-2">
                        <form class="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                            <input type="text" className="form-control bg-dark text-white rounded-3 p-2 border-0" style={{ fontSize: "14px" }} placeholder="Game" onChange={(e) => setGameName(e.target.value)}/>
                        </form>
                    </div>
                    <div className="col-md-2 mb-2 d-flex">
                        <button className="text-white btn btn-dark w-100" onClick={getData} type="submit">search</button>
                    </div>
                </div>
                <div className="container-fluid d-flex ps-0 center-mobile">
                    <div className="row">
                    <div className="col-6 d-flex align-items-center mt-1">
                            <div className="me-2">Platform:</div>
                            <select 
                                className="form-select bg-dark text-white" 
                                value={platform} 
                                onChange={(e) => handlePlatformSelect(e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="PLAY">PlayStation</option>
                                <option value="XBOX">Xbox</option>
                                <option value="SWITCH">Nintendo Switch</option>
                                <option value="STEAM">Steam</option>
                            </select>
                        </div>

                        <div className="col-6 d-flex align-items-center mt-1">
                            <div className="me-2">Genre:</div>
                            <select 
                                className="form-select bg-dark text-white" 
                                value={typeGame} 
                                onChange={(e) => handleTypeGameSelect(e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="ACTION">Action</option>
                                <option value="ADVENTURE">Adventure</option>
                                <option value="RPG">RPG</option>
                                <option value="STRATEGY">Strategy</option>
                                <option value="SPORTS">Sports</option>
                                <option value="SHOOTER">Shooter</option>
                            </select>
                        </div>
                    </div>
                </div>
                    <div className="container">
                        <div className="row gallery justify-content-center mt-2">
                            {store.searchedGames.map(game => 
                                <MatchGame name={game.name} imagen={game.background_image} id={game.id} key={game.id}/>
                            )}
                        </div>
                    </div>
            </div>
        </div>
    )
}