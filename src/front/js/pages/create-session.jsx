import React, { useContext, useEffect, useState } from "react";
import logo from "../../img/logo/logo-marca.png"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { GameSession } from "../component/create_session/game_card_session.jsx";
import { Context } from "../store/appContext.js";
import { format, parseISO, addMinutes } from 'date-fns';
import "../../styles/game_selection.css"
import Swal from "sweetalert2";

export const CreateSession = () => {

    const { actions, store } = useContext(Context);
    const [gameSearch, setGameSearch] = useState(""); 
    const [filteredGames, setFilteredGames] = useState([]);
    const [formComplete, setFormComplete] = useState(false);
    const [formData, setFormData] = useState({start_date: "", duration: "", language: "", session_type: "", region: "", capacity: "", description: ""});

    const navigate = useNavigate()

    useEffect(()=> {
        actions.getRecommendedGames_gameSelection(15)
    }, [])

    useEffect(() => {
        setFormComplete(isFormComplete());
    }, [formData, gameSearch]);

    const isFormComplete = () => {
        return (
            formData.start_date !== "" &&
            formData.duration !== "" &&
            formData.language !== "" &&
            formData.session_type !== "" &&
            formData.region !== "" &&
            formData.capacity !== "" &&
            formData.description !== "" &&
            gameSearch.length > 0
        );
    }
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();  
        if (value.length > 0) { 
            const filtered = store.recommendedGames.filter((game) => 
                game.name.toLowerCase().includes(value)  
            );
            setFilteredGames(filtered);

        } else {
            setFilteredGames([]);
        }
    };


    const handleGameSelect = (gameName) => {
        actions.getGameByName_gameSelection(gameName)
        setGameSearch(gameName); 
        setFilteredGames([]); 

    };

    const getFormData = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
    
        
        setFormData({ ...formData, [name]: value });
    
        if (name === "start_date") {
         
            const localDate = parseISO(value);
    
            const offset = localDate.getTimezoneOffset(); 
            const utcDate = new Date(localDate.getTime() + offset * 60000); 
    
            setFormData((prev) => ({ ...prev, [name]: format(utcDate, "yyyy-MM-dd'T'HH:mm:ss") }));
        }
    };
    

    const sendData = (e) => {
        e.preventDefault()
        const data = {
            ...formData,
            id_game: store.searchedGames[0]?.id,
            id_host: JSON.parse(localStorage.getItem("userProfile")).id,
            background_img: store.searchedGames[0]?.background_image
        }
        actions.createSession(data).then(result => {
        if (result) {
            const data_session = {
                id_user: JSON.parse(localStorage.getItem("userProfile")).id,
                id_session: result.id_sesion
            }
            Swal.fire({
                icon: "success",
                title: `Session created id:${result.id_sesion}`,
                showConfirmButton: true,
                background: "#222328",
                color: "rgb(140, 103, 246)",
              });
            actions.joinSession(data_session).then(() => {
                navigate("/session")
            })
        }})
    }


    return(
        <div className="d-flex flex-column align-items-center min-vh-100 pb-3" style={{backgroundColor: "#16171C", color: "#fff"}}>
        <img src={logo} alt="Logo" style={{width: '40%', height: '80px', margin: '10px', objectFit: "contain"}} />
        <div className="w-75 my-auto" style={{backgroundColor: "rgb(18 19 20)", borderRadius: "8px"}}>
    <div className="container text-center">
        <div className="row justify-content-center align-items-center">
            <h2 className="my-4 fw-bold" >New Session</h2>
            <form className="row g-3" onSubmit={(e) => e.preventDefault()}>

                {/* Buscar-juego */}
                <div className="col-12 col-lg-4">
                    <div className="px-3 p-1">
                        <label className="mb-1">Search game</label>
                    <div className="search-container d-flex" role="search">
                        <input className="form-control"  required style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}} type="search" placeholder="Search" aria-label="Search" onChange={handleSearch}/>
                    </div>
                    </div>
                        {filteredGames.length > 0 && (
                        <ul className="list-group search-results">
                            {filteredGames.map((game) => (
                                <li key={game.id} className="list-group-item bg-dark text-white" onClick={() => handleGameSelect(game.name)}>
                                    {game.name}
                                </li>
                            ))}
                        </ul>
                        )}
                        {gameSearch && filteredGames.length === 0 && (
                        <div className="text-center px-3">
                            <GameSession imagen={store.searchedGames[0]?.background_image} name={store.searchedGames[0]?.name}/>
                        </div>)}
                    
                </div>
                <div className="col-12 col-lg-8">
                {/* form */}
                <div className="row">
                    <div className="col-md-6 py-1">
                        <label className="form-label mb-1">Start Date</label>
                        <input type="datetime-local" name="start_date" className="form-control" onChange={getFormData} style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}}/>
                    </div>
                    <div className="col-md-6 py-1">
                        <label className="form-label mb-1">Duration</label>
                        <select name="duration" className="form-select" onChange={getFormData} aria-label="Default select example" style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}}>
                            <option selected>Select duration</option>
                            <option value="UNK">Unknown</option>
                            <option value="ONE">One Hour</option>
                            <option value="TWO">Two Hours</option>
                            <option value="THREE">Three Hours</option>
                        </select>
                    </div>
                    <div className="col-md-6 py-1">
                        <label className="form-label mb-1">Language</label>
                        <select name="language" className="form-select" onChange={getFormData} aria-label="Default select example" style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}}>
                            <option selected>Select language</option>
                            <option value="ENGLISH">English</option>
                            <option value="SPANISH">Spanish</option>
                            <option value="PORTUGUESE">Portuguese</option>
                        </select>
                    </div>
                    <div className="col-md-6 py-1">
                        <label className="form-label mb-1">Session Type</label>
                        <select name="session_type" className="form-select" onChange={getFormData} aria-label="Default select example" style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}}>
                            <option selected>Select type</option>
                            <option value="PUBLIC">Public</option>
                            <option value="PRIVATE">Private</option>
                        </select>
                    </div>
                    <div className="col-md-8 py-1">
                        <label className="form-label mb-1">Region</label>
                        <select name="region" className="form-select" onChange={getFormData} aria-label="Default select example" style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}}>
                            <option selected>Select region</option>
                            <option value="NA">North America</option>
                            <option value="SA">South America</option>
                        </select>
                    </div>
                    <div className="col-md-4 py-1">
                        <label className="form-label mb-1">Capacity</label>
                        <input name="capacity" type="number" onChange={getFormData} className="form-control" min="1" max="5" onInput={(e) => {if (e.target.value > 30) {e.target.value = 30}}} style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}}/>
                    </div>
                    <div className="col-md-12 py-1">
                        <label className="form-label mb-1">Description</label>
                        <textarea className="form-control" name="description" onChange={getFormData} rows="4" maxLength="199" style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}}></textarea>
                    </div>

                {/* boton */}
                </div>
                    <div className="text-center py-3 my-4">
                        <div className="d-flex justify-content-center gap-2 flex-wrap">
                            <Link to="/session">
                                <button className="btn btn-prev"><i className="fa-solid fa-arrow-left me-2"></i>Back</button>
                            </Link>
                            {formComplete ? (
                                <Link to="/session">
                                <button className="btn btn-prev" onClick={sendData}>
                                    Continue<i className="fa-solid fa-arrow-right ms-2" ></i>
                                </button>
                                </Link>
                            ) : (
                            <button className="btn btn-prev" disabled>
                                Continue<i className="fa-solid fa-arrow-right ms-2" ></i>
                            </button>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
        </div>
    </div>
    )
}