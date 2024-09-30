import React from "react";
import { Paypal } from "../component/donate/paypal_btn.jsx";
import { PaypalFive } from "../component/donate/paypal_btn.jsx";

export const DonatePage = () => {
  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#222328", marginTop: "6rem" }}
    >
      <div
        className="container-fluid rounded shadow-sm pt-md-5 pt-1"
        style={{
          minHeight: "100vh",

          fontFamily: "Poppins",
        }}
      >
        <div className="pb-xl-5">
          <p className="display-6 text-light text-center">
            Please consider a small donation to keep us ALIVE!
          </p>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col col-sm-12 col-xl-3 d-flex justify-content-center pb-3">
            <div className="card border-0" style={{ width: "24rem" }}>
              <img
                src="https://res.cloudinary.com/dxdqo96hs/image/upload/v1727366585/lwj7qffpdki8fmfbfxwj.png"
                className="card-img-top"
                alt="..."
              />
              <div
                className="card-body text-light"
                style={{ backgroundColor: "#222328" }}
              >
                <h5 className="card-title">Donate 1$</h5>
                <p className="card-text">
                  There is no small donation, we appreciate your colaboration
                  deeply.
                </p>
                <Paypal />
              </div>
            </div>
          </div>
          <div className="col col-sm-12 col-xl-3  d-flex justify-content-center">
            <div className="card border-0" style={{ width: "24rem" }}>
              <img
                src="https://res.cloudinary.com/dxdqo96hs/image/upload/v1727366586/oxv7shzjpglfunwscxaa.png"
                className="card-img-top"
                alt="..."
              />
              <div
                className="card-body text-light"
                style={{ backgroundColor: "#222328" }}
              >
                <h5 className="card-title">Donate 5$</h5>
                <p className="card-text">
                  You're as good as your gameplay, this means a world to us!
                </p>
                <PaypalFive />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
