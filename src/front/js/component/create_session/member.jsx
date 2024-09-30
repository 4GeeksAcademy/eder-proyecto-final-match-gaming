import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import userDefault from "../../../img/genre_games/user_default.jpg"
import { Context } from "../../store/appContext";
import Swal from "sweetalert2";

export const Member = (props) => {

    const navigate = useNavigate()
    const {actions, store} = useContext(Context)
    const [friendRequest, setFriendRequest] = useState(false)

    const handleClick = async (id_user) => {
        const userProfile = JSON.parse(localStorage.getItem("userProfile")).id
        const data = {
            user_send_invite: userProfile,
            user_receive_invite: id_user 
        }

        actions.sendFriendInvite(data).then(() => {
            setFriendRequest(!friendRequest)
        }).then(() => {
            Swal.fire({
                icon: "success",
                title: "Friend request sent",
                showConfirmButton: false,
                timer: 2500,
                background: "#222328",
                color: "rgb(140, 103, 246)",
              });
        })
    }

    return (
        <div>
            <div className="w-100 bg-black p-3 mb-2" style={{border: "1px solid #700B97", borderRadius: "10px"}}>
                <div className="row">
                    <div className="col-12 col-lg-2 text-center px-0">
                        <img src={props.imagen === "No image available" ? userDefault : props.imagen} className="card-img-top rounded-circle" alt="..." style={{objectFit: "cover", width: "80px", height: "80px"}}/>    
                    </div>
                    <div className="col-12 col-lg-6" style={{textAlign: "left"}}>
                        <span className="fs-5">@{props.username}</span><span className="fs-7 text-white-50 ps-2">{props.first_name}</span>
                        <div className="py-2 d-flex">
                            <div className="p-0 rounded me-2" style={{backgroundColor: "#95763B"}}>
                                <span className="text-uppercase fw-light px-2" style={{fontSize: "0.8rem"}}>{props.schedule ? props.schedule : "empty"}</span>
                            </div>
                            <div className="p-0  rounded me-2" style={{backgroundColor: "#0B5C97"}}>
                                <span className="text-uppercase fw-light px-2" style={{fontSize: "0.8rem"}}>{props.region ? props.region : "empty"}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4" style={{justifyContent: "right"}}>
                        <div className="row justify-content-end">
                            <div className="col-6 col-lg-10 ps-2">
                                <button className="" style={{backgroundColor: "#9B75F9", color: "white", border: "none", borderRadius: "20px",  fontSize: "16px", display: "block", width: "100%", marginBottom: "10px"}} onClick={() => handleClick(props.id)} disabled={friendRequest === true}>
                                {friendRequest === true ? "Sended" : "Connect"}
                                </button>
                            </div>
                            <div className="col-6 col-lg-10 ps-2">
                                <button style={{backgroundColor: "white", color: "#9B75F9", borderRadius: "20px", fontSize: "16px", display: "block", width: "100%"}} onClick={() => navigate(`/profile/${props.id}`)}>
                                    Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>                             
        </div>     
    )
}