import React, { useState } from "react";
import logo from "../assets/logo-png3.png";
import "../Styles/Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    navigate('/login', { state: { message: 'Log Out Successful!' } });
  };
 
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="PlayRVA Logo" />
      </div>
      <nav className="nav">
        <div className="search-container">
          <input type="text" placeholder="Search..." />
          <button type="search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <NavLink to="/explore" style={{ fontSize: "2rem" }}>
          Explore
        </NavLink>
        <NavLink to="/leagues" style={{ fontSize: "2rem" }}>
          Leagues
        </NavLink>
        <NavLink to="/community" style={{ fontSize: "2rem" }}>
          Community
        </NavLink>
        <NavLink style={{ fontSize: "2rem" }}>Messages</NavLink>

        {/* Profile with dropdown */}
        <div className="profile-container" style={{ position: "relative" }}>
          <NavLink
            to="/dashboard"
            style={{ fontSize: "2rem" }}
            onClick={toggleDropdown}
          >
            Profile
          </NavLink>

          {dropdownOpen && (
            <div
              className="dropdown-menu"
              style={{
                position: "absolute",
                top: "100%",
                right: "0",
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  padding: "10px",
                  width: "100%",
                  textAlign: "left",
                  color: "white",
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
