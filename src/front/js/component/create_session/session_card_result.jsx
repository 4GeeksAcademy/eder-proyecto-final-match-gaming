import React from "react";


export const SessionCardResult = (props) => {
    return (
        <div className="row mx-2 mt-4 mb-4" style={{backgroundColor: "#222328", border: `solid 1px #797979`, borderRadius: "10px"}}>
            <div className="col-12 col-lg-4 px-0">
                <img src="https://media.rawg.io/media/games/a5a/a5a7fb8d9cb8063a8b42ee002b410db6.jpg" className="card-img-top" alt="..." style={{objectFit: "cover", height: "220px", borderTopLeftRadius: "9px", borderBottomLeftRadius: "9px"}}/>
            </div>
            <div className="col-12 col-lg-5 text-start">
                <h3 className="mt-4 ms-2">Let's Play {props.name}</h3>
                <h6 className="mt-4 ms-2"><i class="fa-regular fa-clock"></i><span style={{color: "#A2A2A2"}}> 22:00</span></h6>
                <h6 className="mt-4 ms-2"><i class="fa-regular fa-calendar"></i><span style={{color: "#A2A2A2"}}> 11/09/2024</span></h6>
            </div>
            <div className="col-12 col-md-3" style={{display: "grid"}}>
                <div className="text-end m-2 mt-3">
                    <span className="fs-5 " style={{color: "#A2A2A2"}}>4<i class="fa-solid fa-user ms-2"></i></span>
                </div>
                <div style={{alignSelf: "end"}}>
                    <button className="btn-searchA mb-4" style={{backgroundColor: "#8C67F6"}} >Info</button>
                </div>
            </div>
        </div>
    )
}