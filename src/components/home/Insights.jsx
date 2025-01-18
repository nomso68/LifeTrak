import React from "react";
import Lifetrak from "../../assets/LifeTrak.png";
import "./Insights.css";

const Insights = () => {
  return (
    <div className="insights__container">
      <h3>OUR INSIGHTS</h3>
      <div className="insights_info_container">
        <div className="info1">
          <h2>Why choose</h2>
          <img className="icon6" src={Lifetrak} alt="icon" />
          <h5>
            Our health tracker system is ultimately <br />
            designed with you in mind.
            <br />
            We have streamlined our comprehensive features into a user-friendly
            interface - ensuring you navigate your health facts and records
            intuitively.
            <br />
            We have a robust expert support network for clarifications and
            medical emergencies, offline accessibility, and personalized
            experience, all designed to empower your wellness journey.
          </h5>
        </div>
        <div className="info_container2">
          <div className="info2">
            <h1>44.4K</h1>
            <p>users</p>
            <h2>226K+</h2>
            <p>personalized health plans</p>
          </div>

          <div className="info3">
            <h1>5K+</h1>
            <p>health professionals</p>
            <h2>2K+</h2>
            <p>hospitals in partnership</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
