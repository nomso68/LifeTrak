import React from "react";
import lady from "../../assets/lady.png";
import man from "../../assets/man.png";
import granny from "../../assets/granny.png";
import "./Testimonies.css";

const Testimonies = () => {
  return (
    <div className="testimonies_container">
      <h3>TESTIMONIALS</h3>
      <h1>See how we are changing lives</h1>
      <h6>
        LifeTrak health tracker has empowered countless individuals to take
        control of their
        <br />
        wellness journeys. Our users have verifiably reported improved physical
        and mental
        <br />
        health after interacting with our various features. <br />
        Here’s what some of them have to say:
      </h6>

      <div className="square__grid">
        <div className="square_one">
          <div className="text_icon">
            <img className="iconx" src={lady} alt="icon" />
            {/* <h3>Instant Consultation</h3> */}
          </div>
          <h5>
            Emily R. - Fitness Enthusiast* "I’ve been using this health tracker
            for six months now, and it’s been a game-changer! It’s incredibly
            easy to use, and I love how it keeps me accountable to my fitness
            goals. Tracking my daily steps, workouts, and water intake has never
            been this simple. Highly recommend it to anyone looking to improve
            their health!"
          </h5>
        </div>

        <div className="square_two">
          <div className="text_icon">
            <img className="icony" src={man} alt="icon" />
            {/* <h3>Health Tracking</h3> */}
          </div>
          <h5>
            {" "}
            John M. - Weight Loss Journey* "This health tracker has been
            instrumental in my weight loss journey. By monitoring my calorie
            intake and physical activity, I’ve managed to lose 20 pounds in
            three months. The insights and tips provided are incredibly helpful.
            Thank you for helping me transform my lifestyle!"
          </h5>
        </div>

        <div className="square_three">
          <div className="text_icon">
            <img className="iconz" src={granny} alt="icon" />
            {/* <h3>Personalized Fitness Plans</h3> */}
          </div>
          <h5>
            Sarah L. - Busy Professional* "As a busy professional, I struggle to
            find time for my health. This tracker keeps me on top of my fitness
            routine, even with my hectic schedule. I particularly love the sleep
            tracking feature, which has helped me improve my sleep quality. It’s
            like having a personal health coach in my pocket!"
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Testimonies;
