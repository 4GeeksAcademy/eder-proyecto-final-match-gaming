import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";

export const Notifications = () => {
  const { store, actions, setStore } = useContext(Context);
  const userId = JSON.parse(localStorage.getItem("userProfile")).id;
  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchFriendRequests = async () => {
      try {
        const requests = await actions.getFriendRequests(userId);
        if (isMounted) {
          console.log("Solicitudes actualizadas", store.friendRequests);
        }
      } catch (err) {
        console.error("Error fetching friend requests:", err);
      }
    };

    if (shouldFetch && userId) {
      fetchFriendRequests();
      setShouldFetch(false);
    }

    const intervalId = setInterval(() => {
      if (isMounted) fetchFriendRequests();
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [actions, userId, shouldFetch, store.friendRequests]);

  const friendRequests =
    store.friendRequests?.filter(
      (request) => request.user_receive_invite === userId
    ) || [];

  const handleFriendRequest = async (request, action) => {
    const result = await actions[action](request.user_send_invite, userId);
    if (result.error) {
      alert(`Error: ${result.error}`);
    } else {
      alert(
        action === "acceptFriendRequest"
          ? "La amistad se registró con éxito"
          : "Solicitud de amistad rechazada"
      );
      setShouldFetch(true);
    }
  };

  return (
    <div className="dropdown me-2">
      <button
        className="btn nav_button dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          backgroundColor: "#8c67f6",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <i className="fa-solid fa-bell"> {friendRequests.length}</i>
      </button>
      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuButton"
        style={{
          backgroundColor: "#161616",
          borderRadius: "8px",
          padding: "10px",
          minWidth: "200px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        {friendRequests.length === 0 ? (
          <li>
            <a className="dropdown-item" href="#" style={{ color: "#fff" }}>
              No hay notificaciones
            </a>
          </li>
        ) : (
          friendRequests.map((request, index) => (
            <li
              key={index}
              className="d-flex align-items-center"
              style={{ padding: "8px 0" }}
            >
              <img
                src={request.send_profile_image}
                alt="Profile"
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              <span
                className="me-auto"
                style={{ color: "#fff", fontWeight: "300" }}
              >
                {request.send_username}
              </span>
              <button
                className="btn btn-link me-1 p-0"
                onClick={() =>
                  handleFriendRequest(request, "acceptFriendRequest")
                }
                title="Aceptar"
              >
                <i
                  className="fa-solid fa-check"
                  style={{ color: "#8c67f6" }}
                ></i>
              </button>
              <button
                className="btn btn-link p-0"
                onClick={() =>
                  handleFriendRequest(request, "rejectFriendRequest")
                }
                title="Rechazar"
              >
                <i
                  className="fa-solid fa-times"
                  style={{ color: "#ff4d4d" }}
                ></i>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
