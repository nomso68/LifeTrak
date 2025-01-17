import React from "react";
import LifeLogo from "../../assets/LifeLogo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer__container">
      <img className="icon10" src={LifeLogo} alt="icon" />

      <div className="footer__container__grid">
        <div class="footer__header">
          <h3>Company</h3>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#" target="_blank">
                About Us
              </a>
            </li>
            <li>
              <a href="#Our_features">Features</a>
            </li>
            <li>
              <a href="#" target="_blank">
                Consult our Doctors
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                Blog
              </a>
            </li>
          </ul>
        </div>

        <div class="footer__header">
          <h3>Support</h3>
          <ul>
            <li>
              <a href="" target="_blank">
                FAQ
              </a>
            </li>
            <li>
              <a href="" target="_blank">
                Help Ceenter
              </a>
            </li>
            <li>
              <a href="" target="_blank">
                Contact Us
              </a>
            </li>
            <li>
              <a href="" target="_blank">
                Feedback
              </a>
            </li>
          </ul>
        </div>

        <div class="footer__header">
          <h3>Legal</h3>
          <ul>
            <li>
              <a href="#Privacy Policy">Privacy Policy</a>
            </li>
            <li>
              <a href="#Terms and Conditions">Terms and Conditions</a>
            </li>
            <li>
              <a href="#Disclaimer">Disclaimer</a>
            </li>
          </ul>
        </div>

        <div class="footer__header">
          <h3>Contact Us</h3>
          <p>Email: capstoneproject@gmail.com</p>
          <p>Phone: +123 456 7890</p>
          <p>457 Morningview Lane, San Fransisco, USA</p>
        </div>

        <div class="footer__header">
          <h3>Follow Us</h3>
          <div className="footer__icon">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; Copyright 2024 LifeTrack</p>
      </div>
    </div>
  );
};

export default Footer;
