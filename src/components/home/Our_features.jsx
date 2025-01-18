import React from "react";
import jam_medical from "../../assets/Jam_medical.jpg";
import wave from "../../assets/wave.png";
import medbrief from "../../assets/medbrief.jpg";
import reminder from "../../assets/reminder.png";
import wifi from "../../assets/wifi.png";
import "./Our_features.css";
import { Link } from "react-router-dom";

const Our_features = () => {
  return (
    <div className="feat__container">
      <div className="services__info">
        <h3>OUR FEATURES</h3>
        <h1>Simplify your wellness with these tools</h1>
      </div>

      <div className="square_grid">
        {/* <div className="square1">
          <div className="text_icon">
            <img className="icon1" src={jam_medical} alt="icon" />
            <h3>Instant Consultation</h3>
          </div>
          <h5>
            Get expert health advice whenever you need it. With our instant
            consultation feature, connect with certified professionals in real
            time for personalized guidance and support. No waiting, just
            answers—right when you need them.
          </h5>

          <a
            href="https://demo.olivethemes.com/exo/2022/08/22/professionals-team-management-ideas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Start Now <i class="fas fa-angle-right styled_icon"></i>
            </h2>
          </a>
        </div> */}

        <Link className="tracker_btn" to={"/tracker"}>
          <div className="square2">
            <div className="text_icon2">
              <img className="icon2" src={wave} alt="icon" />
              <h3>Health Tracking</h3>
            </div>
            <h5>
              Stay on top of your wellness journey with our comprehensive health
              tracking feature. Monitor your daily activities, diet, sleep, and
              fitness progress all in one place. Gain valuable insights to make
              informed decisions and achieve your health goals effortlessly.
            </h5>
            <a
              href="https://demo.olivethemes.com/exo/2022/08/22/professionals-team-management-ideas/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2>
                Start Now <i class="fas fa-angle-right styled_icon"></i>
              </h2>
            </a>
          </div>
        </Link>

        {/* <div className="square3">
          <div className="text_icon">
            <img className="icon3" src={medbrief} alt="icon" />
            <h3>Personalized Fitness Plans</h3>
          </div>
          <h5>
            Achieve your fitness goals with a plan tailored just for you. Our
            personalized fitness plans adapt to your preferences, goals, and
            fitness level, providing step-by-step guidance and progress tracking
            to keep you motivated and on track.
          </h5>
          <a
            href="https://demo.olivethemes.com/exo/2022/08/22/professionals-team-management-ideas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Start Now <i class="fas fa-angle-right styled_icon"></i>
            </h2>
          </a>
        </div> */}
      </div>

      <div className="square2__grid">
        {/* <div className="square4">
          <div className="text_icon">
            <img className="icon4" src={reminder} alt="icon" />
            <h3>Health Reminder</h3>
          </div>
          <h5>
            Never miss a step in your wellness journey with our health reminder
            feature. Stay on track with timely notifications for medication,
            workouts, hydration, and more. Your personalized health assistant,
            always keeping you one step ahead.
          </h5>
          <a
            href="https://demo.olivethemes.com/exo/2022/08/22/professionals-team-management-ideas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Start Now <i class="fas fa-angle-right styled_icon"></i>
            </h2>
          </a>
        </div> */}

        {/* <div className="square5">
          <div className="text_icon">
            <img className="icon5" src={wifi} alt="icon" />
            <h3>Offline Access</h3>
          </div>
          <h5>
            Stay connected to your health, even without the internet. With our
            offline access feature, you can view and update your health data
            anytime, anywhere. Your progress is saved and synced seamlessly once
            you're back online.
          </h5>
          <a
            href="https://demo.olivethemes.com/exo/2022/08/22/professionals-team-management-ideas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Start Now <i class="fas fa-angle-right styled_icon"></i>
            </h2>
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Our_features;
