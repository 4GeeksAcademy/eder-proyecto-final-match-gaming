import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../img/logo/logo-marca.png";

export const ResetPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/reset_password_request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.msg);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setMessage(data.msg);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <section className="py-5" style={{ backgroundColor: "#222328" }}>
        <div
          className="container rounded shadow-lg"
          style={{
            maxWidth: "600px",
            minHeight: "400px",
            marginTop: "100px",
            padding: "30px",
            backgroundColor: "#000",
            fontFamily: "Poppins",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 className="text-center mb-4" style={{ color: "#8c67f6" }}>
            Reset Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label
                htmlFor="email"
                style={{ fontWeight: "bold", color: "#8c67f6" }}
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{ borderRadius: "5px", padding: "10px" }}
              />
            </div>
            <button
              type="submit"
              className="btn custom-button mt-3 w-100"
              style={{ padding: "10px", fontWeight: "bold" }}
            >
              Send Reset Password Email
            </button>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <img
                src={image}
                alt=""
                style={{ maxWidth: "300px", height: "auto" }}
              />
            </div>
          </form>
          {message && (
            <p
              className="mt-3 text-center"
              style={{ color: message.includes("error") ? "red" : "green" }}
            >
              {message}
            </p>
          )}
        </div>
      </section>
    </>
  );
};
