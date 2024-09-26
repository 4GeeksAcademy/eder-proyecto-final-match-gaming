import React, { useState } from "react";
import "../../styles/donate.css"

import logo from "../../img/logo/logo-marca.png"

import { Link } from "react-router-dom";


export const Donate = () => {
    

    const [selectedAmount, setSelectedAmount] = useState(null);
    const amounts = [5, 10, 15, "Other"];
  
    const handleCardClick = (amount) => {
      setSelectedAmount(amount);
    };
    

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center" style={{backgroundColor: "#16171C", color: "#fff"}} >
          <h1 className="mb-4">Support Matchgaming</h1>
          <p className="mb-4">
            With your contribution, we can continue to provide a free and accessible platform for more gamers.
          </p>
          <div className="d-flex justify-content-center flex-wrap mb-4">
            {amounts.map((amount) => (
              <div
                key={amount}
                className={`card donate-card ${selectedAmount === amount ? "selected" : ""}`}
                onClick={() => handleCardClick(amount)}
              >
                <div className="card-body">
                  <h5 className="card-title">$ {amount}</h5>
                </div>
              </div>
            ))}
          </div>
          {/* <button className="btn btn-primary">
            Donate via PayPal
          </button> */}
          <div>
          <form action="https://www.paypal.com/donate" method="post" target="_top">
<input type="hidden" name="hosted_button_id" value="YED3AWPD7GACN" />
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
<img alt="" border="0" src="https://www.paypal.com/en_PE/i/scr/pixel.gif" width="1" height="1" />
</form>
          </div>


        </div>
      );
    }

const styles = `



.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}



.card-title {
  font-size: 1.5rem;
}
`;

// Agregar los estilos personalizados a la página
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);