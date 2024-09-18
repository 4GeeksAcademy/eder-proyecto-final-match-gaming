import React from "react";
import "../../../styles/card_game.css"
import "../../../styles/game_selection.css"

export const CardGame = (props) => {

    const { name, imagen, onClick, isSelected } = props;
    const borderColor = isSelected ? '#6a0dad' : '#575757';

    return(        
            <div className="card col-6 col-sm-6 col-lg-4 m-4 p-0"   style={{width: "18rem", backgroundColor: "#222328", border: `solid 2px ${borderColor}`}} onClick={props.onClick} >
                <img src={props.imagen} className="card-img-top" alt="..." style={{objectFit: "cover", height: "200px"}}/>
                <div className="card-body">
                    <p className="card-title">{props.name}</p>
                </div>
            </div>
    )
}