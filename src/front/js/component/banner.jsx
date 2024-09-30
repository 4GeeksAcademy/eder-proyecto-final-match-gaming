import React from "react";
import image1 from "../../img/banner/banner-1.jpg";
import image2 from "../../img/banner/banner2.jpg";
import image3 from "../../img/banner/banner3.jpg";

export const Banner = () => {
  return (
    <section id="banner" style={{ marginTop: "80px" }}>
      <div className="container-fluid p-0">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={image1} className="d-block w-100" alt="Slide 1" />
              <div
                className="carousel-caption d-block text-start"
                style={{ left: "0", right: "auto" }}
              >
                <div className="container">
                  <h1 className="display-4 fw-bold">
                    Find your perfect Gaming <br /> Match today
                  </h1>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src={"https://w.wallhaven.cc/full/dg/wallhaven-dgx85o.png"} className="d-block w-100" alt="Slide 2" />
              <div
                className="carousel-caption d-block text-start"
                style={{ left: "0", right: "auto" }}
              >
                <div className="container">
                  <h1 className="display-4 fw-bold">
                  Connect and level up  <br /> Together
                  </h1>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src={"https://w.wallhaven.cc/full/w8/wallhaven-w8m2oq.png"} className="d-block w-100" alt="Slide 3" />
              <div
                className="carousel-caption d-block text-start"
                style={{ left: "0", right: "auto" }}
              >
                <div className="container">
                  <h1 className="display-4 fw-bold">
                  Create custom game  <br /> Sessions now
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
