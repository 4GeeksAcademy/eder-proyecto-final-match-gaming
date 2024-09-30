import React, { useContext, useEffect, useState } from "react";
import logo from "../../img/logo/logo-marca.png";
import { SessionCardResult } from "../component/create_session/session_card_result.jsx";
import { Context } from "../store/appContext.js";

export const Session = () => {
    const { store, actions } = useContext(Context);
    const [sessions, setSessions] = useState([]); 
    const [allSessions, setAllSessions] = useState([]); 
    const [sortBy, setSortBy] = useState("recent"); 
    const [sessionID, setSessionID] = useState("");

    useEffect(() => {
        store.specificSession = []
        actions.getSessions();
    }, []);

    useEffect(() => {
        if (store.sessions && store.sessions.length > 0) {
            setSessions([...store.sessions]); 
            setAllSessions([...store.sessions]); 
        }
    }, [store.sessions]);

    const sortSessions = () => {
        let sorted = [...sessions];
        if (sortBy === "oldest") {
            sorted.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
        } else if (sortBy === "recent") {
            sorted.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
        }
        return sorted;
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value); 
        sortSessions(sessions);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if(sessionID.trim() !== "") {
            actions.getSession(sessionID); 
        } else {
            resetSearch(); 
        }
        store.specificSession = [];
    };

    const resetSearch = () => {
        setSessions([...allSessions]); 
        store.specificSession = []; 
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSessionID(value);

        if (value.trim() === "") {
            resetSearch();
        }
    };
    
    const sortedSessions = sortSessions();

    return (
        <div className="d-flex flex-column align-items-center min-vh-100 pb-3" style={{ backgroundColor: "#16171C", color: "#fff" }}>
            <img src={logo} alt="Logo" style={{ width: '40%', height: '80px', margin: '10px', objectFit: "contain" }} />
            <div className="w-75 my-auto" style={{ backgroundColor: "rgb(18 19 20)", borderRadius: "8px" }}>
                <div className="container text-center">
                    <div className="row justify-content-center align-items-center">
                        <h2 className="mt-4 mb-2 fw-bold text-start">Sessions:</h2>
                        <div className="container w-100 h-100">
                            {/* Busqueda */}
                            <div className="row">
                                <div className="col-12 col-lg-7 mt-1">
                                    <input 
                                        className="form-control" 
                                        style={{ backgroundColor: "#222328", border: "1px solid #797979", color: "white", borderRadius: "10px" }} 
                                        type="search" 
                                        placeholder="Search" 
                                        aria-label="Search" 
                                        onChange={handleInputChange} 
                                        value={sessionID}
                                    />
                                </div>
                                <div className="col-5 col-lg-2 mt-1">
                                    <select name="duration" className="form-select" style={{ backgroundColor: "#222328", border: "1px solid #797979", color: "white", borderRadius: "10px" }} onChange={handleSortChange}>
                                        <option selected>Sort by</option>
                                        <option value="recent">Most Recent</option>
                                        <option value="oldest">Oldest</option>
                                    </select>
                                </div>      
                                <div className="col-7 col-lg-3 mt-1 d-flex justify-content-center align-items-center">
                                    <button className="btn-searchA" onClick={handleSearch}>
                                        Search
                                    </button>
                                </div>                            
                            </div>
                            {/* Resultados */}
                            <div className="container">
                                {store.specificSession.length !== 0 ? (
                                    <SessionCardResult
                                        name={store.specificSession.game_name}
                                        id={store.specificSession.id}
                                        imagen={store.specificSession.background_img}
                                        username={store.specificSession.host_username}
                                        time={store.specificSession.formattedTime}
                                        date={store.specificSession.formattedDate}
                                        capacity={store.specificSession.capacity}
                                        isFull={store.specificSession.is_full}
                                    />
                                ) : (
                                    sortedSessions.map(session => (
                                        <SessionCardResult
                                            key={session.id}  
                                            id={session.id}
                                            name={session.game_name}
                                            imagen={session.background_img}
                                            username={session.host_username}
                                            time={session.formattedTime}
                                            date={session.formattedDate}
                                            capacity={session.capacity}
                                            isFull={session.is_full}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
