import React from "react";
import { useNavigate } from "react-router-dom";
import userDefault from "../../img/genre_games/user_default.jpg"


export const HomePlayer = (props) => {

    const navigate = useNavigate()
    return(
        <div className="card custom-card mb-2 bg-black border-card-match-gamers">
                  <div className="row g-0 align-items-center">
                    <div className="col-md-2 d-flex justify-content-center">
                    <img src={props.imagen ? props.imagen : userDefault} className="card-img-top rounded-circle" alt="..." style={{objectFit: "cover", width: "80px", height: "80px"}}/>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                      <div className="card-body">
                        <h5 className="card-title text-white">
                          {" "}
                          @ {props.username}
                        </h5>
                      </div>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end p-4">
                      <button className="btn custom-button-card-gamers" onClick={() => navigate(`/profile/${props.id}`)}>
                        ver perfil
                      </button>
                    </div>
                  </div>
        </div>
    )
}