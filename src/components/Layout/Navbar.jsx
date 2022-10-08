import React, { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "../../styles/Navbar.css";
import { GiHamburgerMenu, GiSpookyHouse } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

export default function NavBar() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <GiSpookyHouse className="fa-code" />
            <p className="fa-code-text">Bucks</p>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/explore"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}>
                Explore
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/offers"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}>
                Offers
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                exact
                to="/profile"
                activeClassName="active"
                className="nav-links dropdown-toggle"
                // type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                Account
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <Link
                      class="dropdown-item"
                      to="/profile"
                      onClick={handleClick}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/ads" onClick={handleClick}>
                      Ads
                    </Link>
                  </li>
                  <li>
                    <Link
                      class="dropdown-item"
                      to="/"
                      onClick={() => {
                        auth.signOut();
                        toast.success("Successfully Logout");
                        navigate("/signin");
                      }}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contactus"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <GiHamburgerMenu />}
          </div>
        </div>
      </nav>
    </>
  );
}
