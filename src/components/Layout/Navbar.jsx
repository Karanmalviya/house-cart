import React, { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "../../styles/Navbar.css";
import { GiHamburgerMenu, GiSpookyHouse } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
// import { BubblyLink } from "react-bubbly-transitions";

export default function NavBar({ home }) {
  const navigate = useNavigate();
  const auth = getAuth();
  const [click, setClick] = useState(false);
  const [nav, setNav] = useState(home);
  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className={nav ? "nav-affix navbar" : "nav-prefix navbar"}>
        <div className='nav-container'>
          <NavLink exact to='/home' className='nav-logo'>
            <GiSpookyHouse className='fa-code' />
            <p className='fa-code-text'>Bucks</p>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className='nav-item'>
              <NavLink
                exact
                to='/home'
                activeClassName='active'
                className='nav-links'
                onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                exact
                to='/explore'
                activeClassName='active'
                className='nav-links'
                onClick={handleClick}>
                Explore
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                exact
                to='/offers'
                activeClassName='active'
                className='nav-links'
                onClick={handleClick}>
                Offers
              </NavLink>
            </li>
            <li className='nav-item dropdown'>
              <NavLink
                exact
                to='/profile'
                activeClassName='active'
                className='nav-links dropdown-toggle'
                id='dropdownMenuButton1'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                Account
              </NavLink>
              <ul
                className='dropdown-menu nav-prefix'
                aria-labelledby='dropdownMenuButton1'>
                <li
                  onClick={handleClick}
                  className='dropdown-item'
                 >
                  <Link to='/profile' className='text-reset'>
                    Profile
                  </Link>
                </li>
                <li onClick={handleClick}>
                  <Link className='dropdown-item ' to='/ads'>
                    Ads
                  </Link>
                </li>
                <li onClick={handleClick}>
                  <Link
                    className='dropdown-item '
                    to='/home'
                    onClick={() => {
                      auth.signOut();
                      toast.success("Successfully Logout");
                      navigate("/signin");
                      window.location.reload();
                    }}>
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
            <li className='nav-item'>
              <NavLink
                exact
                to='/contactus'
                activeClassName='active'
                className='nav-links'
                onClick={handleClick}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className='nav-icon' onClick={handleClick}>
            {click ? <FaTimes /> : <GiHamburgerMenu />}
          </div>
        </div>
      </nav>
    </>
  );
}
