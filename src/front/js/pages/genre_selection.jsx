import React, { useState } from "react";
import "../../styles/genre_selection.css"

import logo from "../../img/logo/logo-marca.png"
import sport from "../../img/genre_games/material-symbols_sports-score.png"
import strategy from "../../img/genre_games/ph_horse-fill.png"
import rpg from "../../img/genre_games/solar_shield-bold-duotone.png"
import action from "../../img/genre_games/ph_sword-bold.png"
import adventure from "../../img/genre_games/material-symbols-light_map.png"
import shooter from "../../img/genre_games/Vector.png"
import { Link } from "react-router-dom";

export const GenreSelection = () => {

    const [selectedGenres, setSelectedGenres] = useState([])

    const handleGenreClick = (genre_game) => {
        const storedGenres = JSON.parse(localStorage.getItem("selectedGamesGenres")) || [];
        let updatedGenres = [...storedGenres];

        if (updatedGenres.includes(genre_game)) {
            updatedGenres = updatedGenres.filter(id => id !== genre_game);
        } else {
            updatedGenres.push(genre_game);
        }

        setSelectedGenres(updatedGenres);
        console.log(updatedGenres)
        localStorage.setItem("selectedGamesGenres", JSON.stringify(updatedGenres));
    }    

    const anyGenreSelected = selectedGenres.length > 0;

    return (
    <div className="d-flex flex-column min-vh-100 pb-3" style={{backgroundColor: "#16171C", color: "#fff"}}>
        <img src={logo} alt="Logo" style={{width: '40%', height: '80px', margin: '10px', objectFit: "contain"}} />
    <div className="container text-center my-auto">
        <div className="row justify-content-center align-items-center">
            <h2 className="mb-5 fw-bold" >Favorite Game Genres</h2>
            <div className="col-md-4 mb-3">
                <div className={`genre-card ${selectedGenres.includes("ACTION") ? "selected" : ""}`} onClick={() => handleGenreClick("ACTION")}>
                    <img src={action} alt="Acción" style={{width: '24%', height: '70px', objectFit: 'cover'}} />
                    <p className="pt-4">Acción</p>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className={`genre-card ${selectedGenres.includes("ADVENTURE") ? "selected" : ""}`} onClick={() => handleGenreClick("ADVENTURE")}>
                    <img src={adventure} alt="adventure" style={{width: '30%', height: '70px', objectFit: 'cover'}} />
                    <p className="pt-4">Adventure</p>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className={`genre-card ${selectedGenres.includes("RPG") ? "selected" : ""}`} onClick={() => handleGenreClick("RPG")}>
                    <img src={rpg} alt="rpg" style={{width: '20%', height: '70px', objectFit: 'cover'}} />
                    <p className="pt-4">RPG</p>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className={`genre-card ${selectedGenres.includes("STRATEGY") ? "selected" : ""}`} onClick={() => handleGenreClick("STRATEGY")}>
                    <img src={strategy} alt="strategy" style={{width: '20%', height: '70px', objectFit: 'cover'}} />
                    <p className="pt-4">Strategy</p>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className={`genre-card ${selectedGenres.includes("SPORTS") ? "selected" : ""}`} onClick={() => handleGenreClick("SPORTS")}>
                    <img src={sport} alt="sports" style={{width: '30%', height: '70px', objectFit: 'cover'}} />
                    <p className="pt-4">Sports</p>
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <div className={`genre-card ${selectedGenres.includes("SHOOTER") ? "selected" : ""}`} onClick={() => handleGenreClick("SHOOTER")}>
                    <img src={shooter} alt="shooter" style={{width: '23%', height: '70px', objectFit: 'cover'}} />
                    <p className="pt-4">Shooter</p>
                </div>
            </div>
        </div>
    </div>
        <div className="text-center py-3 my-4">
            <div className="d-flex justify-content-center gap-2 flex-wrap">
                <Link to="/age-verification">
                    <button className="btn btn-prev"><i className="fa-solid fa-arrow-left me-2"></i>Back</button>
                </Link>
                {anyGenreSelected ? (
                <Link to="/platform-selection">
                    <button className="btn btn-prev">
                        Continue<i className="fa-solid fa-arrow-right ms-2"></i>
                    </button>
                </Link>
                ) : (
                <button className="btn btn-prev" disabled>
                    Continue<i className="fa-solid fa-arrow-right ms-2"></i>
                </button>)}
            </div>
        </div>
    </div>
);
}