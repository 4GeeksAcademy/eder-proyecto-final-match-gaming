import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import userDefault from "../../img/genre_games/user_default.jpg"

export const Profile_friends = () => {
  const { store, actions } = useContext(Context);
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));
  const userId = userProfile?.id;
  const [friends, setFriends] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      if (userId && !hasFetched) {
        try {
          const result = await actions.getFriendbyUser(userId);
          if (result) setFriends(result);
        } catch {
          setError("Error al cargar amigos.");
        }
        setHasFetched(true);
      }
    };
    fetchFriends();
  }, [actions, userId, hasFetched]);

  const handleViewProfile = (friendId) => {
    navigate(`/profile/${friendId}`);
    window.location.reload();
  };

  const handleDeleteFriend = async (friendId) => {
    try {
      await actions.deleteFriend(userId, friendId);
      setFriends(friends.filter((friend) => friend.id !== friendId));
    } catch {
      setError("Error al eliminar amigo.");
    }
  };

  const handleAcceptFriendRequest = async (id_send, id_receive) => {
    try {
      await actions.acceptFriendRequest(id_send, id_receive);
      const result = await actions.getFriendbyUser(userId);
      if (result) setFriends(result);
    } catch {
      setError("Error al aceptar la solicitud de amistad.");
    }
  };

  const buttonStyle = {
    backgroundColor: "#8c67f6",
    border: "none",
    color: "white",
    padding: "5px 20px",
    fontSize: "14px",
    borderRadius: "20px",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  };

  return (
    <div className="container">
      {error && <div className="alert alert-danger">{error}</div>}
      {friends.length > 0 ? (
        friends.map((friend) => (
          <div
            key={friend.id}
            className="row rounded-2 mb-3 p-3 position-relative"
            style={{ border: "1px solid #8c67f6", borderRadius: "8px" }}
          >
            <div className="col-12 d-flex flex-column flex-md-row align-items-center">
              <div className="friend-item me-3 mb-3 mb-md-0">
                <img
                  src={friend.profile_image? userDefault : friend.profile_image}
                  style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                  alt={friend.username}
                />
              </div>
              <div className="friend-item flex-grow-1 text-center text-md-center">
                <h3 className="mb-3">{friend.username}</h3>
                <button
                  type="button"
                  className="btn justify-content-end"
                  style={buttonStyle}
                  onClick={() => handleViewProfile(friend.id)}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#7a5ee8")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#8c67f6")
                  }
                >
                  Ver perfil
                </button>
              </div>
              <button
                type="button"
                className="btn btn-link position-absolute top-0 end-0"
                onClick={() => handleDeleteFriend(friend.id)}
                style={{ right: "10px", top: "10px" }}
              >
                <i className="fa fa-trash" style={{ color: "#8c67f6" }}></i>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12 text-center">No tienes amigos.</div>
      )}
    </div>
  );
};
