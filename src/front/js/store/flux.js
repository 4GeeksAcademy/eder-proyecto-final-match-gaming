const getState = ({ getStore, getActions, setStore }) => {
<<<<<<< HEAD
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
=======
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
			recommendedGames: [],
			searchedGames: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
>>>>>>> 7bd6e6994dcfae35046ab01a9475f032277595d8

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
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

<<<<<<< HEAD
        //reset the global store
        setStore({ demo: demo });
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

      getUserProfile: async (userId) => {
        try {
          const resp = await fetch(
            `${process.env.BACKEND_URL}/api/profile_user/${userId}`
          );
          if (!resp.ok) {
            const errorText = await resp.text();
            console.error("Error loading user profile:", errorText);
            throw new Error(`HTTP error! status: ${resp.status}`);
          }
          const data = await resp.json();
          setStore({ userProfile: data });
        } catch (error) {
          console.error("Error loading message from backend", error);
        }
      },
    },
  };
=======
				//reset the global store
				setStore({ demo: demo });
			},
			registerUser: async (data) => {
                try {
                    let response = await fetch("https://friendly-enigma-5gvgvj5j6x99fv4xp-3001.app.github.dev/api/users", {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    
                    let responseData = await response.json();
                    
                    if (response.status === 200) {
                        return true;
                    } else {
                        console.error("Error:", responseData);
                    }
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },
			getRecommendedGames_gameSelection: async (number_games) => {
                try {
                    const response = await fetch(`https://friendly-enigma-5gvgvj5j6x99fv4xp-3001.app.github.dev/api/games_recommended/${number_games}`);
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ recommendedGames: data });
						console.log("hola")
                    } else {
                        console.error("Error:", response.statusText);
                    }
                } catch (error) {
                    console.log("Error loading message from backend", error)
                }
            },
			
			getGameByName_gameSelection: async (game_name) => {
				try {
					const response = await fetch(`https://friendly-enigma-5gvgvj5j6x99fv4xp-3001.app.github.dev/api/search_game?name=${game_name}`);
					if (response.ok) {
						const data = await response.json();
						setStore({ searchedGames: data });
						console.log("Game search successful");
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
			  }
		}
	};
>>>>>>> 7bd6e6994dcfae35046ab01a9475f032277595d8
};

export default getState;
