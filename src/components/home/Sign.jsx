import React from "react";
import imageman from "../../assets/imageman.png";
import "./Sign.css";
import { Link } from "react-router-dom";

const Sign = () => {
  return (
    <div className="sign_container">
      <div className="info_image">
        <div className="text_info">
          <h1>
            Take Control <br />
            of Your <br />
            Health Today!
          </h1>
          <h5>
            Start your journey to a <br />
            healthier, happier you <br />
            with our all-in-one health tracker. Sign up now and <br /> make
            every step count!
          </h5>

          <Link to={"/register"}>
            <button className="butn1">Sign Up Now</button>
          </Link>
        </div>
        <div>
          <img className="image" src={imageman} alt="image" />
        </div>
      </div>
    </div>
  );
};

export default Sign;
