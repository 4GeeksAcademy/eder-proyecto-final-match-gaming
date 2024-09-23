import React from "react";


export const GameSession = (props) =>{
    return(        
        <div className="card col-auto col-sm-6 col-lg-4 mt-2 p-0"   style={{width: "100%", backgroundColor: "#222328", border: `solid 1px #797979`}}>
            <img src={props.imagen} className="card-img-top" alt="..." style={{objectFit: "cover", height: "242px"}}/>
            <div className="card-body">
                <p className="card-title">{props.name}</p>
            </div>
        </div>
)
}