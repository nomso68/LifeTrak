import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__colour">
        <div className="hero__text">
          <h1>
            Your Personal <br />
            Health Companion
          </h1>
          <h3>Take charge of your health</h3>
          <h6>
            Monitor your wellness, set goals, and track your progress—all in{" "}
            <br />
            one place. Empower yourself with personalized insights to achieve{" "}
            <br />a healthier, happier you.
          </h6>
          <div className="button__container">
            <Link to={"/register"}>
              <button className="btn3">Get Started</button>
            </Link>
            <button className="btn4 btn-secondary">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
