const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: localStorage.getItem("token") || null,  // Almacena el token del usuario
			isAuthenticated: !!localStorage.getItem("token"), // Estado de autenticación
			userProfile: JSON.parse(localStorage.getItem("userProfile")) || null,
			recommendedGames: [],
			searchedGames: [],
			specificGame: [],
			usersByGame: [],
			sessions: [],
			specificSession: [],
			sessionMembers: [],
			totalMembers: 0,
			filteredUsers:[],
			friendRequests: [],
      		getFriendsbyUser: [],
			currentGameDetail:{
				"background_image": "https://media.rawg.io/media/games/cb4/cb487ab3c54b81cb685388bab42ec848.jpeg",
				"id": 12,
				"name": "FIFA 18",
				"platform": [
					"play station",
					"xbox"
				],
				"rating": "4",
				"released": "Tue, 26 Sep 2017 17:40:00 GMT",
				"type_game": [
					"sports"
				]
			},
		},
		actions: {
		
			loginUser: async (username, password) => {
				try {
				  const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					},
					body: JSON.stringify({ username, password }),
				  });
				  if (!response.ok) {
					return await handleErrorResponse(response);
				  }
				  const data = await response.json();
				  if (!data.user_id || !data.username) {
					console.error("User profile is missing in the response");
					return {
					  success: false,
					  userId: null,
					  username: null,
					  error: "User profile is missing",
					};
				  }
				  // Almacenar token y perfil en localStorage
				  localStorage.setItem("token", data.access_token);
				  localStorage.setItem(
					"userProfile",
					JSON.stringify({
					  id: data.user_id,
					  username: data.username,
					  userType: data.user_type,
					})
				  );
				  // Actualizar el store
				  setStore({
					token: data.access_token,
					isAuthenticated: true,
					userProfile: {
					  id: data.user_id,
					  username: data.username,
					  userType: data.user_type,
					},
				  });
				  return {
					success: true,
					userId: data.user_id,
					username: data.username,
				  };
				} catch (error) {
				  console.error("Error during login", error);
				  return {
					success: false,
					userId: null,
					username: null,
					error: error.message,
				  };
				}
			  },

			  logoutUser: () => {
				localStorage.removeItem("token");
				localStorage.removeItem("userProfile")
				setStore({ token: null, isAuthenticated: false, userProfile: null });
			  },
			  
			// Verificar si el usuario sigue autenticado
			isAuthenticated: () => {
				const store = getStore();
				return store.token !== null; // Aquí podrías incluir una verificación adicional si el token es válido
			},

			getFriendRequests: async (userId) => {
				try {
				  const response = await fetch(`/api/friend_request/${userId}`);
				  const data = await response.json();
				  setStore({ friendRequests: data });
				} catch (error) {
				  console.error("Error fetching friend requests:", error);
				}
			  },

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			updateUserProfile: async (userId, profileData) => {
				try {
				  const backendUrl = process.env.BACKEND_URL;
				  if (!backendUrl) throw new Error("BACKEND_URL no está definido");
			  
				  if (typeof profileData.platform === "string") {
					profileData.platform = profileData.platform.split(",").map((platform) => platform.trim());
				  } else if (!Array.isArray(profileData.platform)) {
					throw new Error("El campo 'platform' debe ser una cadena o una lista");
				  }
			  	
				  let response = await fetch(`${backendUrl}/api/profile_edit/${userId}`, {
					method: "PUT",
					body: JSON.stringify(profileData),
					headers: {
					  "Content-Type": "application/json",
					},
				  });
			  
				  let responseData = await response.json();
			  
				  if (response.status === 200) {
					console.log("Perfil actualizado satisfactoriamente:", responseData);
					return responseData;
				  } else {
					console.error("Error al actualizar el perfil:", responseData);
					throw new Error(responseData.msg || "Error desconocido al actualizar el perfil");
				  }
				} catch (error) {
				  console.log("Error en el proceso de actualización del perfil", error);
				  throw error;
				}
			  },
			getUserProfile: async (userId) => {
				try {
				  const backendUrl = process.env.BACKEND_URL;
				  if (!backendUrl) throw new Error("BACKEND_URL is not defined");
				  const fetchJson = async (url) => {
					const response = await fetch(url);
					if (!response.ok)
					  throw new Error(`HTTP error! status: ${response.status}`);
					return response.json();
				  };
				  const [userProfile, favoriteGamesData] = await Promise.all([
					fetchJson(`${backendUrl}/api/profile/${userId}`),
					fetchJson(`${backendUrl}/api/favorites/${userId}`),
				  ]);
				  setStore({
					userProfile,
					favoriteGames: favoriteGamesData.user_games,
				  });
				} catch (error) {
				  console.error("Error loading data from backend", error);
				}
			  },
			  
			  registerUser: async (data) => {
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
						method: "POST",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json"
						}
					});
					
					let responseData = await response.json();	

					if (response.status === 200) {
						return responseData;
					} else {
						console.error("Error:", responseData);
					}
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
			addFavoriteGames: async (data) => {
				try {

					let response = await fetch(`${process.env.BACKEND_URL}/api/favorites`, {
						method: "POST",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json"
						}
					});

					let responseData = await response.json();
		
					if (response.status === 201) {
						console.log("Juegos favoritos añadidos exitosamente:", responseData);
						return responseData; 
					} else {
						console.error("Error al agregar favoritos:", responseData);
						return null;
					}
				} catch (error) {
					console.error("Error en la solicitud de agregar favoritos:", error);
				}
			},
			getRecommendedGames_gameSelection: async (number_games) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/games_recommended/${number_games}`);
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ recommendedGames: data });
                    } else {
                        console.error("Error:", response.statusText);
                    }
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },
			
			getGameByName_gameSelection: async (game_name) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/search_game?name=${game_name}`);
					if (response.ok) {
						const data = await response.json();
						setStore({ searchedGames: data });
					} else {
						console.error("Error:", response.statusText);
					}
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
			getGamesRecomended: async (number_games = 3) => {
				try {
				  const resp = await fetch(
					`${process.env.BACKEND_URL}/api/games_recommended/${number_games}`
				  );
				  if (!resp.ok) {
					throw new Error("Network response was not ok");
				  }
				  const data = await resp.json();
				  setStore({ games: data });
				  return data;
				} catch (error) {
				  console.log("Error loading games from backend", error);
				}
			  },
			fillCurrentGame : (game) =>{
				setStore({...getStore(),currentGameDetail:game})
			},
			getFilteredGames:  async (filters) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/filter_game`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(filters),
					});
			
					if (response.ok) {
						const data = await response.json();
						setStore({ searchedGames: data });
						console.log("Game search successful");
					} else {
						console.error("Error:", response);
					}
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},
			getFilteredUsers: async (filters) => {
				
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/filter_user`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(filters),
					});
			
					if (response.ok) {
						const data = await response.json();
						setStore({ filteredUsers: data });  // Aquí estás actualizando la nueva propiedad
						return data; // Retornar los datos obtenidos
					} else {
						const errorText = await response.text();
						console.error("Error:", response.statusText, errorText);
					}
				} catch (error) {
					console.log("Error loading message from backend:", error);
				}
			},
			// Funcion para obtener un juego por el id
			getSpecificGame: async (id_game) => {
				try {

					const response = await fetch(`${process.env.BACKEND_URL}/api/games/${id_game}`);
					
					if (!response.ok) {
						throw new Error("Failed to fetch game data");
					}
			
					const gameData = await response.json();

					setStore({
						specificGame: gameData
					});
			
					return gameData;
				} catch (error) {
					console.error("Error loading message from backend: ", error);
				}
			},
			// Funcion para obtener los usuarios que han marcado un juego como favorito
			getUsersByGame: async (gameId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/favorites/users/${gameId}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					});
			
					if (response.ok) {
						const data = await response.json();
						setStore({ usersByGame: data.users }); 
						console.log(data)
					} else {
						console.error("Error: ", response.statusText);
					}
				} catch (error) {
					console.log("Error loading message from backend: ", error);
				}
			},
			// Funcion para crear sesion 
			createSession : async(data) => {
				try{
					const response = await fetch(`${process.env.BACKEND_URL}/api/sessions`, {
						method: "POST",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json"	
						}
					});

					let responseData = await response.json();

					if(response.status === 200){
						console.log("Session created succesfully")
						return responseData;
					}
					else {
						console.error("Error al crear sesion: ", responseData)
					}
				}
				catch (error){
					console.error("Error en la solicitud", error)
				}
			},
			getSessions: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/sessions`);
			
					if (response.ok) {
						const data = await response.json();
			
						const formattedData = data.map(session => {
							const dateObject = new Date(session.start_date);
							
							const formattedDate = 
								`${String(dateObject.getUTCDate()).padStart(2, '0')}/${String(dateObject.getUTCMonth() + 1).padStart(2, '0')}/${dateObject.getUTCFullYear()}`;
							
							const formattedTime = 
								`${String(dateObject.getUTCHours()).padStart(2, '0')}:${String(dateObject.getUTCMinutes()).padStart(2, '0')}:${String(dateObject.getUTCSeconds()).padStart(2, '0')}`;
			
							return {
								...session,
								formattedDate,
								formattedTime
							};
						});
			
						setStore({ sessions: formattedData });
					} else {
						console.error("Error:", response.statusText);
					}
				} catch (error) {
					console.error("Error en la solicitud:", error);
				}
			},

			getSession: async (session_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/sessions/${session_id}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					});
			
					if (response.ok) {
						const session = await response.json(); 

						const dateObject = new Date(session.start_date);
						
						const formattedDate = 
							`${String(dateObject.getUTCDate()).padStart(2, '0')}/${String(dateObject.getUTCMonth() + 1).padStart(2, '0')}/${dateObject.getUTCFullYear()}`;
						
						const formattedTime = 
							`${String(dateObject.getUTCHours()).padStart(2, '0')}:${String(dateObject.getUTCMinutes()).padStart(2, '0')}:${String(dateObject.getUTCSeconds()).padStart(2, '0')}`;
			
						const formattedSession = {
							...session,
							formattedDate,
							formattedTime
						};
			
						setStore({ specificSession: formattedSession }); 
						console.log(getStore().specificSession)
					} else {
						console.error("Error: ", response.statusText);
					}
				} catch (error) {
					console.log("Error loading message from backend: ", error);
				}
			},
			getSessionMembers: async (id_session) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/sessions_members/${id_session}`, {
						method: "GET",
						headers: {
							'Content-Type': 'application/json',
						},
					});
			
					if (response) {
						const data = await response.json();
						setStore({sessionMembers: data.members, totalMembers: data.total_members});
					} else {
						console.error("Error: ", response.statusText);
					}
				} catch (error) {
					console.log("Error loading members from backend: ", error);
				}
			},
			joinSession: async (data) => {
				try{
					const response = await fetch(`${process.env.BACKEND_URL}/api/sessions_join`, {
						method: "POST",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json"
						}
					});
					let responseData = await response.json();

					if(response.status === 200)
					{
						console.log("Union a la sesión exitosa")
					}else {
						console.error("Error al unirse a la sesión: ", responseData)
					}
				}
				catch(error)
				{
					console.error("Error en la solicitud", error)
				}
			},
			sendFriendInvite: async (data) => {
				try{
					const response = await fetch(`${process.env.BACKEND_URL}/api/friends_request`, {
						method: "POST",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json"
						}
					});
					let responseData = await response.json();

					if(response.ok)
					{
						console.log("Solicitud Exitosa")
						return true;
					}
					else
					{
						console.log("error en la solicitud", responseData)
						return false;
					}
				}
				catch(error){
					console.error("Error en la solicitud: ", error)
					return false
				}
			},
			getFriendRequests: async (userId) => {
				const url = `${process.env.BACKEND_URL}/api/friends_request/${userId}`;
				try {
				  const response = await fetch(url, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				  });
				  if (!response.ok) {
					console.error("Error: ", response.statusText);
					return [];
				  }
				  const data = await response.json();
				  const enrichedData = data.map((request) => ({
					...request,
					user_receive_invite: userId,
				  }));
				  setStore({ friendRequests: enrichedData });
				  return enrichedData;
				} catch (error) {
				  console.error("Error loading message from backend: ", error);
				  return [];
				}
			  },
			  acceptFriendRequest: async (user_id_first, user_id_second) => {
				const url = `${process.env.BACKEND_URL}/api/friends_accept`;
				const options = {
				  method: "POST",
				  headers: { "Content-Type": "application/json" },
				  body: JSON.stringify({ user_id_first, user_id_second }),
				};
				try {
				  const response = await fetch(url, options);
				  const data = await response.json();
				  if (!response.ok) {
					throw new Error(
					  data.msg || "Error al aceptar la solicitud de amistad"
					);
				  }
				  return data;
				} catch (error) {
				  console.error("Error al aceptar la solicitud de amistad:", error);
				  return { error: error.message };
				}
			  },
			  rejectFriendRequest: async (id_send, id_receive) => {
				const url = `${process.env.BACKEND_URL}/api/friends_request_remove?id_send=${id_send}&id_receive=${id_receive}`;
				try {
				  const response = await fetch(url, { method: "DELETE" });
				  const data = await response.json();
				  if (!response.ok) {
					throw new Error(
					  data.msg || "Error al rechazar la solicitud de amistad"
					);
				  }
				  return data;
				} catch (error) {
				  console.error("Error al rechazar la solicitud de amistad:", error);
				  return { error: error.message };
				}
			  },
			  getFriendbyUser: async (userId) => {
				const url = `${process.env.BACKEND_URL}/api/friends/${userId}`;
				try {
				  const response = await fetch(url, {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				  });
				  if (!response.ok) {
					throw new Error(`Error al obtener amigos: ${response.statusText}`);
				  }
				  const data = await response.json();
				  console.log("Amigos obtenidos:", data);
				  const enrichedData = data.map((friend) => {
					const isFirstUser = friend.user_id_first === userId;
					return {
					  id: isFirstUser ? friend.user_id_second : friend.user_id_first,
					  username: isFirstUser
						? friend.second_username
						: friend.first_username,
					  profile_image: isFirstUser
						? friend.second_profile_image
						: friend.first_profile_image || "ruta/por/default.jpg",
					};
				  });
				  setStore({ FriendbyUser: enrichedData });
				  return enrichedData;
				} catch (error) {
				  console.error("Error al obtener amigos:", error);
				  return [];
				}
			  },
			  deleteFriend: async (id_first, id_second) => {
				const url = `${process.env.BACKEND_URL}/api/friends_remove?id_first=${id_first}&id_second=${id_second}`;
				try {
				  const response = await fetch(url, { method: "DELETE" });
				  const data = await response.json();
				  if (!response.ok) {
					throw new Error(data.msg || "Error al eliminar al amigo");
				  }
				  return data;
				} catch (error) {
				  console.error("Error al eliminar al amigo:", error);
				  return { error: error.message };
				}
			  },
		}
	};
};

export default getState;
