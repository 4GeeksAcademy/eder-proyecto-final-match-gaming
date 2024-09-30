import React from "react";
import { useNavigate } from "react-router-dom";

export const Joingaming = () => {
  const navigate = useNavigate()
  return (
    <>
      <section className="py-5 bg-black">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 text-center">
              <div className="p-4">
                <h2 className="custom-title">
                  Join the best gaming community <br /> with 3k+ active users
                </h2>
              </div>
              <div className="col-12 text-center d-flex justify-content-center">
                <button type="submit" className="btn custom-button" onClick={() => navigate(`/search-match`)}>
                  JOIN MATCHGAMING
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
