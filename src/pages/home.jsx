import React, { useState } from "react";
// import globe from "../assets/globe.png";
import landingpic1 from "../assets/landingpic1.png";
// import headerpic from "../assets/headerpic.png";
import { useNavigate } from "react-router-dom";
import { PopUp } from "../components/popups/popUp";
import { Login } from "../components/forms/login";

import "./home.css";
import { About } from "../components/about/about";

export const Home = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const navigate = useNavigate();

  // hande login authentication
  const handleStart = () => {
    localStorage.getItem("user") ? navigate("/wallet") : setShowPopUp(true);
  };
  return (
    <div>
      <div className="homeContainer">
        <div className="headerText">
          <h1>The Future of Currency Exchange is Here.</h1>
          <br />
          <p>
            Currency exchange: We offer a wide range of currency pairs,
            including XAF/USD, XAF/EUR, and USD/EUR. We also offer spot and
            forward exchange rates.
          </p>
          <br />
          <div className="headBtn">
            <button onClick={handleStart}>start now</button>
            <button>
              {" "}
              <a href="#about">about us</a>{" "}
            </button>
          </div>
          <PopUp trigger={showPopUp} setTrigger={setShowPopUp}>
            <Login />
          </PopUp>
        </div>
        <div className="homeImg">
          <img src={landingpic1} alt="" />
        </div>
      </div>
      <About className="about" />
    </div>
  );
};
