import React, { useState } from "react";
import "../../styles/platform_selection.css"
import logo from "../../img/logo/logo-marca.png"
import xbox from "../../img/platform_games/xbox.png"
import nintendo from "../../img/platform_games/switch.png"
import steam from "../../img/platform_games/steam.png"
import playstation from "../../img/platform_games/playstation.png"
import { Link } from "react-router-dom";


export const PlatformSelection = () => {

    const [selectedPlatforms, setSelectedPlatforms] = useState([])

    const handleGenreClick = (platform_game) => {
        const storedPlatforms = JSON.parse(localStorage.getItem("selectedPlatforms")) || [];
        let updatedPlatforms = [...storedPlatforms];

        if (updatedPlatforms.includes(platform_game)) {
            updatedPlatforms = updatedPlatforms.filter(id => id !== platform_game);
        } else {
            updatedPlatforms.push(platform_game);
        }

        setSelectedPlatforms(updatedPlatforms);
        console.log(updatedPlatforms)
        localStorage.setItem("selectedPlatforms", JSON.stringify(updatedPlatforms));
    }

    const anyPlatformSelected = selectedPlatforms.length > 0;

    return (
        <div className="d-flex flex-column min-vh-100 pb-3" style={{backgroundColor: "#16171C", color: "#fff"}}>
            <img  src={logo} alt="Logo" style={{width: '40%', height: '80px', margin: '10px', objectFit: "contain"}} />
        <div className="container text-center my-auto">
            <div className="row justify-content-center align-items-center">
                <h2 className="mb-5 fw-bold" >Favorite Platforms</h2>
                <div className="col-md-6 mb-3">
                    <div className={`genre-card ${selectedPlatforms.includes("PLAY") ? "selected" : ""}`} onClick={() => handleGenreClick("PLAY")}>
                        <img  src={playstation} alt="Acción" style={{width: '17%', height: '100%', objectFit: 'cover'}} />
                        <p className="pt-4">PlayStation</p>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className={`genre-card ${selectedPlatforms.includes("XBOX") ? "selected" : ""}`} onClick={() => handleGenreClick("XBOX")}>
                        <img src={xbox} alt="Acción" style={{width: '17%', height: '100%', objectFit: 'cover'}} />
                        <p className="pt-4">Xbox</p>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className={`genre-card ${selectedPlatforms.includes("SWITCH") ? "selected" : ""}`} onClick={() => handleGenreClick("SWITCH")}>
                        <img src={nintendo} alt="Acción" style={{width: '17%', height: '100%', objectFit: 'cover'}} />
                        <p className="pt-4">Nintendo Switch</p>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className={`genre-card ${selectedPlatforms.includes("STEAM") ? "selected" : ""}`} onClick={() => handleGenreClick("STEAM")}>
                        <img src={steam} alt="Acción" style={{width: '17%', height: '100%', objectFit: 'cover'}} />
                        <p className="pt-4">Steam</p>
                    </div>
                </div>
            </div>
        </div>
            <div className="text-center py-3 my-4">
                <div className="d-flex justify-content-center gap-2 flex-wrap">
                    <Link to="/genre-selection">
                        <button className="btn btn-prev"><i className="fa-solid fa-arrow-left me-2"></i>Back</button>
                    </Link>
                    {anyPlatformSelected ? (
                    <Link to="/game-selection">
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