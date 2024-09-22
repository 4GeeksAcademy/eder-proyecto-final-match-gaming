import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import userDefault from "../../../img/genre_games/user_default.jpg"

export const MatchPeople = (props) => {

    const navigate = useNavigate()

    return (
        <div>
            <div className="w-100 bg-black p-3 mb-2" style={{border: "1px solid #700B97", borderRadius: "10px"}}>
                <div className="row">
                    <div className="col-12 col-lg-2 text-center px-0">
                        <img src={props.imagen ? props.imagen : userDefault} className="card-img-top rounded-circle" alt="..." style={{objectFit: "cover", width: "80px", height: "80px"}}/>    
                    </div>
                    <div className="col-8 col-lg-6">
                        <span className="fs-5">@{props.username}</span><span className="fs-7 text-white-50 ps-2">{props.first_name}</span>
                        <div className="py-2 d-flex">
                            <div className="p-0 rounded me-2" style={{backgroundColor: "#95763B"}}>
                                <span className="text-uppercase fw-light px-2" style={{fontSize: "0.8rem"}}>{props.schedule ? props.schedule : "no schedule"}</span>
                            </div>
                            <div className="p-0  rounded me-2" style={{backgroundColor: "#0B5C97"}}>
                                <span className="text-uppercase fw-light px-2" style={{fontSize: "0.8rem"}}>{props.region ? props.region : "no region"}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 col-lg-4 d-grid" style={{justifyContent: "right"}}>
                        <button className="px-3" style={{backgroundColor: "#9B75F9", color: "white", border: "none", borderRadius: "20px",  fontSize: "16px", display: "block", width: "100%", marginBottom: "10px"}}>
                            Connect
                        </button>
                        <button style={{backgroundColor: "white", color: "#9B75F9", borderRadius: "20px", fontSize: "16px", display: "block", width: "100%"}} onClick={() => navigate(`/profile/${props.id}`)}>
                            Profile
                        </button>
                    </div>
                </div>
            </div>                             
        </div>        
    )
}