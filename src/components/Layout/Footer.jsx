import {
  BsInstagram,
  BsFacebook,
  BsTwitter,
  BsGithub,
  BsFillTelephoneFill,
  BsLinkedin,
  BsGlobe,
} from "react-icons/bs";
import { GiSpookyHouse } from "react-icons/gi";
import { AiFillMail, AiOutlineMail } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/Footer.css";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div>
      <footer className="text-center text-lg-start text-muted footer-bg">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a
              href="https://karanmalviya.vercel.app"
              className="me-4 text-reset">
              <BsGlobe />
            </a>
            <a href className="me-4 text-reset">
              <BsFacebook />
            </a>
            <a
              href="https://twitter.com/KaranMalviyaa"
              className="me-4 text-reset">
              <BsTwitter />
            </a>
            <a href className="me-4 text-reset">
              <BsInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/karanmalviya1/"
              className="me-4 text-reset">
              <BsLinkedin />
            </a>
            <a
              href="https://github.com/Karanmalviya"
              className="me-4 text-reset">
              <BsGithub />
            </a>
          </div>
        </section>

        <section className>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h2 className="text-uppercase fw-bold mb-2 footer-logo-content">
                  <GiSpookyHouse className="footer-logo" />
                  <p className="logo-text">Bucks</p>
                </h2>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#" className="text-reset">
                    Bucks
                  </a>
                </p>
                <p>
                  <a
                    href="https://github.com/Karanmalviya/Rythm-The-Music-Player.git"
                    className="text-reset">
                    Rythm Music
                  </a>
                </p>
                <p>
                  <a
                    href="https://github.com/Karanmalviya/Covid_Traker_Application.git"
                    className="text-reset">
                    Coronavirus Tracker
                  </a>
                </p>
                <p>
                  <a
                    href="https://github.com/Karanmalviya/Memes-extension.git"
                    className="text-reset">
                    Meme Extension
                  </a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <NavLink to="/" className="text-reset">
                    Home
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/explore" className="text-reset">
                    Explore
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/offers" className="text-reset">
                    Offers
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/contactus" className="text-reset">
                    Help
                  </NavLink>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <ImLocation className="me-3" /> Madhya Pradesh, IN
                </p>
                <p>
                  <AiFillMail className="me-3" />
                  buckshouse@info.com
                </p>
                <p>
                  <BsFillTelephoneFill className="me-3" /> +91 012 5678 912
                </p>
                <p>
                  <BsFillTelephoneFill className="me-3" /> + 01 234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
          © 2021 Copyright:
          <a
            className="text-reset fw-bold"
            href="https://karanmalviya.vercel.app/">
            &nbsp;karanmalviya.vercel.app
          </a>
        </div>
      </footer>
    </div>
  );
}
