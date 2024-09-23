import React from "react";
import logo from "../../img/logo/logo-marca.png"
import { SessionCardResult } from "../component/create_session/session_card_result.jsx";


export const Session = () => {

    return(
        <div className="d-flex flex-column align-items-center min-vh-100 pb-3" style={{backgroundColor: "#16171C", color: "#fff"}}>
        <img src={logo} alt="Logo" style={{width: '40%', height: '80px', margin: '10px', objectFit: "contain"}} />
            <div className="w-75 my-auto" style={{backgroundColor: "rgb(18 19 20)", borderRadius: "8px"}}>
                <div className="container text-center">
                    <div className="row justify-content-center align-items-center">
                    <h2 className="mt-4 mb-2 fw-bold text-start" >Sessions:</h2>
                    <div className="container w-100 h-100">
                        {/* Busqueda */}
                        <div className="row">
                            <div className="col-12 col-lg-7 mt-1">
                                <input className="form-control"  style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}} type="search" placeholder="Search" aria-label="Search"/>
                            </div>
                            <div className="col-5 col-lg-2 mt-1">
                                <select name="duration" class="form-select" aria-label="Default select example" style={{backgroundColor: "#222328", border: "1px solid #797979", color:"white", borderRadius: "10px"}}>
                                    <option selected>Sort by</option>
                                    <option value="recent">Most Recent</option>
                                    <option value="oldest">Oldest</option>
                                </select>
                            </div>      
                            <div className="col-autp col-lg-3 mt-1 d-flex justify-content-center align-items-center">
                                <button className="btn-searchA" >
                                    Search
                                </button>
                            </div>                            
                        </div>
                        {/* Resultados */}
                        <div className="container">
                                <SessionCardResult name={"The Last of Us"}/>
                                <SessionCardResult/>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}