import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import "../../styles/profile_edit.css";
import { FavoriteGames } from "../component/profile_games.jsx";
import { Modal } from "../component/alert.jsx";

const initialProfileData = {
  first_name: "",
  last_name: "",
  discord_id: "",
  steam_id: "",
  description: "",
  profile_img_url: "",
  favoriteGames: [],
  platform: [],
  region: "",
  schedule: "",
};

const availablePlatforms = ["steam", "play station", "xbox", "nintendo switch"];
const availableRegions = ["NA", "SA"];
const availableSchedules = ["ANYTIME", "MORNING", "AFTERNOON", "EVENING"];

const validatePlatforms = (platforms) => {
  const validPlatforms = ["steam", "play station", "xbox", "nintendo switch"];
  return platforms.every((platform) => validPlatforms.includes(platform));
};

export const UserProfileEdit = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { actions, store } = useContext(Context);
  const [profileData, setProfileData] = useState(initialProfileData);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [shouldFetch, setShouldFetch] = useState(true);
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchProfileData = async () => {
      try {
        await actions.getUserProfile(userId);
        if (isMounted) {
          setShouldFetch(false);
          const { userProfile, favoriteGames } = store;
          const platforms =
            typeof userProfile.platform === "string"
              ? userProfile.platform.split(",").map((item) => item.trim())
              : userProfile.platform;

          setProfileData((prevData) => ({
            ...prevData,
            ...userProfile,
            platform: platforms,
            favoriteGames: Array.isArray(favoriteGames) ? favoriteGames : [],
          }));
        }
      } catch (error) {
        setErrorMessage(error.message);
        console.error("Error al obtener los datos del perfil:", error);
      }
    };

    if (shouldFetch) {
      fetchProfileData();
    }

    return () => {
      isMounted = false;
    };
  }, [userId, actions, store, shouldFetch]);

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  };

  const addPlatform = () => {
    if (selectedPlatform && !profileData.platform.includes(selectedPlatform)) {
      setProfileData((prevData) => ({
        ...prevData,
        platform: [...prevData.platform, selectedPlatform],
      }));
      setSelectedPlatform("");
    }
  };

  const removePlatform = (platformToRemove) => {
    setProfileData((prevData) => ({
      ...prevData,
      platform: prevData.platform.filter(
        (platform) => platform !== platformToRemove
      ),
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(profileData)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!validatePlatforms(profileData.platform)) {
      setErrorMessage(
        "Por favor, introduce plataformas válidas: steam, play station, xbox, nintendo switch."
      );
      return;
    }

    try {
      await actions.updateUserProfile(userId, profileData);
      setModalTitle("MatchGaming");
      setModalMessage("¡Perfil actualizado con éxito!");
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        navigate(`/profile/${userId}`);
      }, 3000);
    } catch (error) {
      setModalTitle("Error en la actualización");
      setModalMessage("Error al actualizar el perfil.");
      setModalVisible(true);
    }
  };

  return (
    <section id="editProfile" className="container-fluid py-5 bg-black">
      <div className="container d-flex flex-column rounded shadow-sm profile-edit-container">
        <div className="d-flex justify-content-between align-items-center text-white">
          <form className="w-100" onSubmit={handleSubmit}>
            <h3 className="mb-4 mt-3 text-center">Editar Perfil</h3>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label className="form-label">Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  value={profileData.first_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Apellido:</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  value={profileData.last_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label className="form-label">Discord ID:</label>
                <input
                  type="text"
                  className="form-control"
                  name="discord_id"
                  value={profileData.discord_id}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Steam ID:</label>
                <input
                  type="text"
                  className="form-control"
                  name="steam_id"
                  value={profileData.steam_id}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12 mb-3">
                <label className="form-label">Descripción:</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={profileData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6 mb-1">
                <label className="form-label">Región:</label>
                <select
                  name="region"
                  className="form-control"
                  value={profileData.region}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona una región</option>
                  {availableRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 mb-1">
                <label className="form-label">Horario Preferido:</label>
                <select
                  name="schedule"
                  className="form-control"
                  value={profileData.schedule}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona un horario</option>
                  {availableSchedules.map((schedule) => (
                    <option key={schedule} value={schedule}>
                      {schedule}
                    </option>
                  ))}
                </select>
              </div>
              <div className="row mb-3 mt-3">
              <div className="col-md-12 m">
                <label className="form-label">URL de Imagen de Perfil:</label>
                <input
                  type="text"
                  name="profile_img_url"
                  className="form-control"
                  value={profileData.profile_img_url}
                  onChange={handleInputChange}
                />
              </div>
            </div>
              <div className="col-md-12 mt-1">
                <label className="form-label">Plataforma:</label>
                <div className="input-group">
                  <select
                    className="form-control"
                    value={selectedPlatform}
                    onChange={handlePlatformChange}
                  >
                    <option value="">Selecciona una plataforma</option>
                    {availablePlatforms.map((platform) => (
                      <option key={platform} value={platform}>
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={addPlatform}
                  >
                    Agregar
                  </button>
                </div>
                <ul className="list-group mt-3">
                  {profileData.platform.map((platform) => (
                    <li
                      key={platform}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removePlatform(platform)}
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
                <div>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <FavoriteGames userId={userId} />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn custom-button-profile mb-5 me-5"
              >
                Guardar
              </button>
              <Link to={`/profile/${userId}`} className="btn btn-danger mb-5">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
      {modalVisible && <Modal title={modalTitle} message={modalMessage} />}
    </section>
  );
};
