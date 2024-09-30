import React, { useState, useContext } from "react";
import LogLogin from "../../img/login/LogLogin.png";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Para manejar mensajes de error
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await actions.loginUser(username, password);
      if (result.success) {
        navigate(`/`);
      } else {
        setErrorMessage(result.error || "Login failed");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <section className="py-5" style={{ backgroundColor: "#222328" }}>
      <div
        className="container rounded shadow-sm"
        style={{
          maxWidth: "1200px",
          minHeight: "600px",
          marginTop: "100px",
          fontFamily: "Poppins",
        }}
      >
        <div className="row no-gutters text-white rounded shadow-sm">
          {/* Columna derecha con la imagen */}
          <div className="col-12 col-md-6 p-0 order-first order-md-last rounded">
            <img
              src={LogLogin}
              alt="LogLogin"
              className="img-fluid w-100 h-100 rounded"
              style={{ objectFit: "cover", height: "100vh" }}
            />
          </div>

          {/* Columna izquierda para el formulario */}
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center align-items-md-start p-5 rounded">
            <h1
              className="text-center text-md-start fw-bold pt-3"
              style={{ fontSize: "26px" }}
            >
              Find friends and play together <br /> today!
            </h1>
            <h2
              className="text-center text-primary fw-bold mt-3"
              style={{ fontSize: "28px" }}
            >
              LOGIN
            </h2>

            <form className="w-75 mt-4 text-start" onSubmit={handleLogin}>
              {/* Campo Username */}
              <div className="form-group">
                <label className="text-white fw-bold">Username</label>
                <input
                  type="text"
                  className="form-control bg-secondary text-white rounded-3 p-2 border-0"
                  style={{ fontSize: "14px" }}
                  placeholder="Enter your username"
                  value={username} // Asignamos el valor del estado
                  onChange={(e) => setUsername(e.target.value)} // Manejamos el cambio de estado
                />
              </div>

              {/* Campo Password */}
              <div className="form-group mt-3">
                <label className="text-white fw-bold">Password</label>
                <input
                  type="password"
                  className="form-control bg-secondary text-white rounded-3 p-2 border-0"
                  style={{ fontSize: "14px" }}
                  placeholder="Enter your password"
                  value={password} // Asignamos el valor del estado
                  onChange={(e) => setPassword(e.target.value)} // Manejamos el cambio de estado
                />
              </div>

              {/* Mostrar mensaje de error si el login falla */}
              {errorMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                  {errorMessage}
                </div>
              )}

              {/* Botón Login */}
              <button
                type="submit"
                className="btn mt-4 w-100 text-white custom-button"
              >
                Login
              </button>

              {/* Texto "Don’t have an account? Register" */}
              <div className="mt-3 text-center text-md-start">
                <span className="text-white fw-bold">
                  Don’t have an account?
                </span>
                <Link to="/age-verification">
                  <span
                    className="d-block d-md-inline text-primary fw-bold ms-md-2"
                    style={{ cursor: "pointer" }}
                  >
                    Register
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
