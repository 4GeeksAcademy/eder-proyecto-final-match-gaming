import React from "react";

export const GameSelected = (props) => {
    return(
        <div className="card m-2 p-0" style={{width: "23rem", height:"35rem", backgroundColor: "#222328", border: "1px solid #575757", borderRadius: "8px"}}>
                <img src={props.imagen} className="card-img-top" alt="..." style={{objectFit: "cover", height: "100%", borderTopLeftRadius: "8px", borderTopRightRadius: "8px"}}/>
                <div className="p-1 fs-4" style={{borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", backgroundColor: "#161616"}}>{props.name}</div>
        </div>
    )
}