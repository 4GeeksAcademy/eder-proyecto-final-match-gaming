import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/card_game.css"


export const MatchGame = (props) => {
    return(
            <div className="card col-6 col-sm-6 col-lg-3 m-2 p-0" style={{width: "18rem", backgroundColor: "#222328", border: "solid 1px #575757"}}>
                <Link to={`/match-results/${props.id}`}>
                    <img src={props.imagen} className="card-img-top" alt="..." style={{objectFit: "cover", height: "200px"}}/>
                    <div className="card-body">
                        <p className="card-title">{props.name}</p>
                    </div>
                </Link>
            </div>               
    )
}