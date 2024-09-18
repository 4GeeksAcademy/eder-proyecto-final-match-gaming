import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { UserProfileCard } from "./profile_user.jsx";
import { CardComponentUser } from "./cardMatchGamers.jsx";
import { SessionCard } from "./profile_sessionCard.jsx";
import { Context } from "../store/appContext";
import perfil from "../../img/perfil/perfil-1.png";
import sessionImage1 from "../../img/match/imagen-match.jpg";

export const UserInformation = () => {
  const { store, actions } = useContext(Context);
  const userId = "5"; // Define el userId aquí
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        await actions.getUserProfile(userId);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, actions]);

  const userProfile = store.userProfile || {};
  const platforms = userProfile.platform || [];

  // Verifica si está cargando
  if (loading) {
    return <div>Loading...</div>;
  }

  // Verifica si hay un error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Mapea las plataformas a un formato adecuado
  const platformIcons = platforms.map((platform) => ({
    name: platform.charAt(0).toUpperCase() + platform.slice(1),
    icon:
      platform === "steam"
        ? "steam"
        : platform === "play station"
        ? "playstation"
        : platform,
  }));

  return (
    <>
      <div className="user-information">
        <section id="profile_information">
          <UserProfileCard {...userProfile} />
        </section>
        <section
          id="profile_platforms"
          className="background-user-platforms mt-5 custom-border"
        >
          <div className="row">
            <div className="col-12 text-center mb-3 g-4">
              <h3>Platforms</h3>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <div className="row justify-content-center">
                {platformIcons.length > 0 ? (
                  platformIcons.map((platform, index) => (
                    <div key={index} className="col-md-4 mb-3 mt-3">
                      <div
                        className="card text-center custom-card-platforms"
                        style={{ minWidth: "12rem" }}
                      >
                        <div className="card-body">
                          <i className={`fab fa-${platform.icon} fa-2x`}></i>
                          <h5 className="card-title">{platform.name}</h5>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    No platforms available.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <div>
          <section id="profile_games">
            <div className="row">
              <div className="col-12 col-md-4 mt-5">
                <div className="rounded custom-card-friends align-items-center text-center p-3">
                  <h3 className="text-center">Amigos</h3>
                  <div className="mt-5">
                    <CardComponentUser
                      imageSrc={perfil}
                      username="@ Player Name 1"
                      buttonText="ver perfil"
                    />
                    <CardComponentUser
                      imageSrc={perfil}
                      username="@ Player Name 2"
                      buttonText="ver perfil"
                    />
                    <CardComponentUser
                      imageSrc={perfil}
                      username="@ Player Name 3"
                      buttonText="ver perfil"
                    />
                    <CardComponentUser
                      imageSrc={perfil}
                      username="@ Player Name 4"
                      buttonText="ver perfil"
                    />
                    <CardComponentUser
                      imageSrc={perfil}
                      username="@ Player Name 2"
                      buttonText="ver perfil"
                    />
                    <CardComponentUser
                      imageSrc={perfil}
                      username="@ Player Name 3"
                      buttonText="ver perfil"
                    />
                    <CardComponentUser
                      imageSrc={perfil}
                      username="@ Player Name 4"
                      buttonText="ver perfil"
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-8 mt-5">
                <div className="rounded custom-card-friends p-3">
                  <h3 className="text-start">Sesiones</h3>
                  <div className="mt-5">
                    <SessionCard
                      imageSrc={sessionImage1}
                      gameName="Let’s Play Starcraft"
                      time="22:00"
                      date="11/09/2024"
                      players="4"
                    />
                    <SessionCard
                      imageSrc={sessionImage1}
                      gameName="Let’s Play Starcraft"
                      time="22:00"
                      date="11/09/2024"
                      players="4"
                    />
                    <SessionCard
                      imageSrc={sessionImage1}
                      gameName="Let’s Play Starcraft"
                      time="22:00"
                      date="11/09/2024"
                      players="4"
                    />
                    <SessionCard
                      imageSrc={sessionImage1}
                      gameName="Let’s Play Starcraft"
                      time="22:00"
                      date="11/09/2024"
                      players="4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* <div>
          <section id="profile_games_user">
            <div className="rounded mt-5">
              <div className="custom-bg-gamers">
                <h1 className="custom-title-2"> My games </h1>
                <div className="row mt-5">
                  <div className="col-12 col-md-4 mb-4 custom-card-games-recomended">
                    <CardComponentGames
                      // imageSrc="https://via.placeholder.com/150"
                      imageSrc={juego1}
                      title="Card title"
                    />
                  </div>
                  <div className="col-12 col-md-4 mb-4 custom-card-games-recomended ">
                    <CardComponentGames
                      // imageSrc="https://via.placeholder.com/150"
                      imageSrc={juego1}
                      title="Another card title"
                    />
                  </div>
                  <div className="col-12 col-md-4 mb-4 custom-card-games-recomended">
                    <CardComponentGames
                      // imageSrc="https://via.placeholder.com/150"
                      imageSrc={juego1}
                      title="Yet another card title"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div> */}
      </div>
    </>
  );
};

UserInformation.propTypes = {
  profile_img_url: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  steam_id: PropTypes.string.isRequired,
  discord_id: PropTypes.string.isRequired,
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      prefix: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  games: PropTypes.arrayOf(
    PropTypes.shape({
      image_url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};
