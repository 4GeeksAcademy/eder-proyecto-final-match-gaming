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

            console.log(game_selection)
            console.log(platform_selection)
            console.log(genre_selection)
            console.log("Formulario enviado", data);
            actions.registerUser(data).then(() => {

                navigate('/');
            }).catch((err) => {
                console.error('Error en el registro:', err);
                setError("Hubo un problema al registrar el usuario.");
            });
            console.log(anyGenreSelected)
        }
    }

    const getData = (e) => {
        e.preventDefault();
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
        console.log(formData)

    }
    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
        setFormData({ ...formData, gender: gender  });
        console.log(selectedGender)

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
                        placeholder="Username"
                        name="username"
                        style={{ backgroundColor: '#797979', color: '#FFFFFF', border: 'none'}}
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
                        placeholder="Date of Birth"
                        name="age"
                        style={{ backgroundColor: '#797979', color: '#FFFFFF', border: 'none' }}
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
                        placeholder="Name"
                        name="first_name"
                        style={{ backgroundColor: '#797979', color: '#FFFFFF', border: 'none' }}
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
                        placeholder="Lastname"
                        name="last_name"
                        style={{ backgroundColor: '#797979', color: '#FFFFFF', border: 'none' }}
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
                        placeholder="Email"
                        name="email"
                        style={{ backgroundColor: '#797979', color: '#FFFFFF', border: 'none' }}
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
                        placeholder="Password"
                        name="password"
                        style={{ backgroundColor: '#797979', color: '#FFFFFF', border: 'none' }}
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
                        style={{ backgroundColor: '#797979', color: '#FFFFFF', border: 'none' }}
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
