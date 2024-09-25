import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import GenderMale from "../../img/register-form/GenderMale.png";
import GenderFemale from "../../img/register-form/GenderFemale.png";
import GenderIntersex from "../../img/register-form/GenderIntersex.png";
import { useNavigate } from 'react-router-dom';
import BackArrow from "../../img/register-form/VectorBack.png"; // Imagen para la flecha hacia atrás
import { Link } from "react-router-dom";

export const RegistrationForm = () => {

    const [formData, setFormData] = useState({username: "", age: "", first_name: "", last_name: "", gender: "", password: "", confirmPassword: ""})
    const [error, setError] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedButton, setSelectedButton] = useState(null);

    const [isUsernameFocused, setIsUsernameFocused] = useState(false); 
    const [isAgeFocused, setIsAgeFocused] = useState(false); 
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isLastnameFocused, setIsLastnameFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);



    const {actions, store} = useContext(Context)
    const navigate = useNavigate();


    const sendData = (e) => {
        e.preventDefault()
        
        const { password, confirmPassword } = formData;

        if (password !== confirmPassword) {

            setError("Las contraseñas no coinciden");
            
        } else {
            setError("");

            const copia = {...formData}

            delete copia.confirmPassword;

            console.log(copia)

            const genre_selection = JSON.parse(localStorage.getItem("selectedGamesGenres"));
            const platform_selection = JSON.parse(localStorage.getItem("selectedPlatforms"));
            const game_selection = JSON.parse(localStorage.getItem("selectedGameIds"));

            const data = {
                ...copia,
                platform: platform_selection,
                type_game: genre_selection,
            };

            actions.registerUser(data).then((response) => {

                const id_user = response.id_user;
                const fav_games = {id_user: id_user.id, fav_ids: [...game_selection]};
                actions.addFavoriteGames(fav_games).then(() => {
                    localStorage.removeItem("selectedGamesGenres");
                    localStorage.removeItem("selectedPlatforms");
                    localStorage.removeItem("selectedGameIds");
                    store.searchedGames = []
                    navigate('/login');
                })


            }).catch((err) => {
                console.error('Error en el registro:', err);
                setError("Hubo un problema al registrar el usuario.");
            });

        }
    }

    const getData = (e) => {
        e.preventDefault();
        const {name, value} = e.target
        setFormData({...formData, [name]: value})

    }
    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
        setFormData({ ...formData, gender: gender  });

    };

    const handleButtonClick = (gender) => {
    };

    const anyGenreSelected = selectedGender.length > 0

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#272932', fontFamily: 'Poppins', marginTop: '110px', padding: '0 15px' }} className="d-flex flex-column">
            <form onSubmit={sendData}>
            {/* Header */}
            <div className="row mt-4">
                <div className="col text-center">
                    <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', fontSize: '36px', color: '#FFFFFF' }}>
                        Personal Information
                    </h1>
                </div>
            </div>

            {/* Personal Info Fields */}
            <div className="row mt-4 justify-content-center">
                <div className="col-12 col-md-5">
                    <label htmlFor="username" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400', fontSize: '20px', color: '#FFFFFF' }}>
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="form-control custom-placeholder"
                        placeholder="Enter username"
                        name="username"
                        style={{
                            backgroundColor: isUsernameFocused ? "#FFFFFF " : "#797979",
                            color:  isUsernameFocused ? "#797979" : "#FFFFFF ",
                            border: 'none',
                            boxShadow: isUsernameFocused ? "0 0 15px 5px  #cc72f0 " : "none", // Sombra neón 
                            borderColor: isUsernameFocused ? " #cc72f0 " : "initial",  
                            outline: "none",
                            transition: "box-shadow 0.3s ease, border-color 0.3s ease" 
                        }}
                        onFocus={() => setIsUsernameFocused(true)}  
                        onBlur={() => setIsUsernameFocused(false)}
                        onChange={getData}
                        required
                    />
                </div>
                <div className="col-12 col-md-3 mt-3 mt-md-0">
                    <label htmlFor="dob" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400', fontSize: '20px', color: '#FFFFFF' }}>
                        Age
                    </label>
                    <input
                        type="text"
                        id="dob"
                        className="form-control custom-placeholder"
                        placeholder="Enter Date of Birth"
                        name="age"
                        style={{
                            backgroundColor: isAgeFocused ? "#FFFFFF " : "#797979",
                            color:  isAgeFocused ? "#797979" : "#FFFFFF ",
                            border: 'none',
                            boxShadow: isAgeFocused ? "0 0 15px 5px  #cc72f0 " : "none",
                            borderColor: isAgeFocused ? " #cc72f0 " : "initial", 
                            outline: "none", 
                            transition: "box-shadow 0.3s ease, border-color 0.3s ease" 
                        }}
                        onFocus={() => setIsAgeFocused(true)} 
                        onBlur={() => setIsAgeFocused(false)}
                        onChange={getData}
                        required
                    />
                </div>
            </div>

            <div className="row mt-4 justify-content-center">
                <div className="col-12 col-md-4">
                    <label htmlFor="name" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400', fontSize: '20px', color: '#FFFFFF' }}>
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="form-control custom-placeholder"
                        placeholder="Enter name"
                        name="first_name"
                        style={{
                            backgroundColor: isNameFocused ? "#FFFFFF " : "#797979",
                            color:  isNameFocused ? "#797979" : "#FFFFFF ",
                            border: 'none',
                            boxShadow: isNameFocused ? "0 0 15px 5px  #cc72f0 " : "none",
                            borderColor: isNameFocused ? " #cc72f0 " : "initial", 
                            outline: "none", 
                            transition: "box-shadow 0.3s ease, border-color 0.3s ease" 
                        }}
                        onFocus={() => setIsNameFocused(true)}  
                        onBlur={() => setIsNameFocused(false)}
                        onChange={getData}
                        required
                    />
                </div>
                <div className="col-12 col-md-4 mt-3 mt-md-0">
                    <label htmlFor="lastname" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400', fontSize: '20px', color: '#FFFFFF' }}>
                        Last name
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        className="form-control custom-placeholder"
                        placeholder="Enter lastname"
                        name="last_name"
                        style={{
                            backgroundColor: isLastnameFocused ? "#FFFFFF " : "#797979",
                            color:  isLastnameFocused ? "#797979" : "#FFFFFF ",
                            border: 'none',
                            boxShadow: isLastnameFocused ? "0 0 15px 5px  #cc72f0 " : "none",
                            borderColor: isLastnameFocused ? " #cc72f0 " : "initial", 
                            outline: "none",
                            transition: "box-shadow 0.3s ease, border-color 0.3s ease" 
                        }}
                        onFocus={() => setIsLastnameFocused(true)}  
                        onBlur={() => setIsLastnameFocused(false)}
                        onChange={getData}
                        required
                    />
                </div>
                
            </div>

            {/* Gender Selection */}
            <div className="row mt-4 text-center">
                <div className="col-12">
                    <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400', fontSize: '20px', color: '#FFFFFF' }}>
                        Gender
                    </h2>
                </div>
            </div>

            <div className="row mt-2 justify-content-center">
                <div className="col-12 col-sm-4 col-md-2">
                    <div
                        className="d-flex flex-column align-items-center"
                        onClick={() => handleGenderSelect("M")}
                        style={{ backgroundColor: selectedGender === "M" ? "#700B97" : "#575757", padding: "10px", borderRadius: "10px", cursor: "pointer" }}
                    >
                        <img src={GenderMale} alt="Masculine" style={{ width: '50px' }} />
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', color: '#FFFFFF', marginTop: '10px' }}>
                            Masculine
                        </p>
                    </div>
                </div>
                <div className="col-12 col-sm-4 col-md-2 mt-3 mt-sm-0">
                    <div
                        className="d-flex flex-column align-items-center"
                        onClick={() => handleGenderSelect("F")}
                        style={{ backgroundColor: selectedGender === "F" ? "#700B97" : "#575757", padding: "10px", borderRadius: "10px", cursor: "pointer" }}
                    >
                        <img src={GenderFemale} alt="Feminine" style={{ width: '50px' }} />
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', color: '#FFFFFF', marginTop: '10px' }}>
                            Feminine
                        </p>
                    </div>
                </div>
                
            </div>

            {/* Password Fields */}
            <div className="row mt-4 justify-content-center">
            <div className="col-12 col-md-8 mt-3 mx-3 mb-3 mt-md-0">
                    <label htmlFor="confirmPassword" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400', fontSize: '20px', color: '#FFFFFF' }}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="confirmPassword"
                        className="form-control custom-placeholder"
                        placeholder="Enter email"
                        name="email"
                        style={{
                            backgroundColor: isEmailFocused ? "#FFFFFF " : "#797979",
                            color:  isEmailFocused ? "#797979" : "#FFFFFF ",
                            border: 'none',
                            boxShadow: isEmailFocused ? "0 0 15px 5px  #cc72f0 " : "none", 
                            borderColor: isEmailFocused ? " #cc72f0 " : "initial", 
                            outline: "none", 
                            transition: "box-shadow 0.3s ease, border-color 0.3s ease" 
                        }}
                        onFocus={() => setIsEmailFocused(true)}  
                        onBlur={() => setIsEmailFocused(false)}
                        onChange={getData}
                        required
                    />
                </div>
                <div className="col-12 col-md-4">
                    <label htmlFor="password" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400', fontSize: '20px', color: '#FFFFFF' }}>
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="form-control custom-placeholder"
                        placeholder="Enter password"
                        name="password"
                        style={{
                            backgroundColor: isPasswordFocused ? "#FFFFFF " : "#797979",
                            color:  isPasswordFocused ? "#797979" : "#FFFFFF ",
                            border: 'none',
                            boxShadow: isPasswordFocused ? "0 0 15px 5px  #cc72f0 " : "none", 
                            borderColor: isPasswordFocused ? " #cc72f0 " : "initial", 
                            outline: "none", 
                            transition: "box-shadow 0.3s ease, border-color 0.3s ease" 
                        }}
                        onFocus={() => setIsPasswordFocused(true)}  
                        onBlur={() => setIsPasswordFocused(false)}
                        onChange={getData}
                        required
                    />
                </div>
                <div className="col-12 col-md-4 mt-3 mt-md-0">
                    <label htmlFor="confirmPassword" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400', fontSize: '20px', color: '#FFFFFF' }}>
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control custom-placeholder"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        style={{
                            backgroundColor: isConfirmPasswordFocused ? "#FFFFFF " : "#797979",
                            color:  isConfirmPasswordFocused ? "#797979" : "#FFFFFF ",
                            border: 'none',
                            boxShadow: isConfirmPasswordFocused ? "0 0 15px 5px  #cc72f0 " : "none", 
                            borderColor: isConfirmPasswordFocused ? " #cc72f0 " : "initial", 
                            outline: "none", 
                            transition: "box-shadow 0.3s ease, border-color 0.3s ease"
                        }}
                        onFocus={() => setIsConfirmPasswordFocused(true)}  
                        onBlur={() => setIsConfirmPasswordFocused(false)}
                        onChange={getData}
                        required
                    />
                </div>
                
            </div>

            {error && (
                    <div className="row mt-3 justify-content-center">
                        <div className="col-12 col-md-6">
                            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
                        </div>
                    </div>
            )}

            {/* Buttons */}
            <div className="row mt-5 text-center mb-5">
                <div className="col-12 d-flex justify-content-center flex-nowrap" style={{ gap: '20px' }}>
                    <Link to="/game-selection">
                        <button
                            onClick={() => handleButtonClick("back")}
                            style={{ background: selectedButton === "back" ? 'linear-gradient(0deg, #8C67F6 0%, #4B3783 100%)' : '#383838', color: '#FFFFFF', borderRadius: '10px', padding: '10px 20px', border: 'none', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                        >
                            <img src={BackArrow} alt="Back" style={{ width: '20px', marginRight: '10px' }} />
                            Back
                        </button>
                    </Link>
                    {anyGenreSelected ? (<button
                        onClick={() => handleButtonClick("start")}
                        style={{ background: selectedButton === "start" ? 'linear-gradient(0deg, #8C67F6 0%, #4B3783 100%)' : '#383838', color: '#FFFFFF', borderRadius: '10px', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
                    >
                        Start!
                    </button>) : (<button disabled
                        
                        style={{ background: selectedButton === "start" ? 'linear-gradient(0deg, #8C67F6 0%, #4B3783 100%)' : '#383838', color: '#FFFFFF', borderRadius: '10px', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
                    >
                        Start!
                    </button>)}
                    
                </div>
            </div>
            </form>
        </div>
    );
};
