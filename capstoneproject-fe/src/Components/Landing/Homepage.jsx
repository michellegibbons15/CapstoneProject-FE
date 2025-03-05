import React from 'react'
import "../../Styles/Landing/Homepage.css"
import { NavLink } from "react-router-dom";

const Homepage = () => (
    <div className="homepage">
      <p className="blurb">Are you tired of browsing multiple websites for facility info?</p>
      <p className="blurb">PlayRVA is your one-stop shop for all things sports facilities!</p>
      <p className="blurb">Log in or Sign up now!</p>
      <div className="LandingButton">
        <NavLink to="/login">
          <button className="Landing-btn">Log in / Sign up</button>
        </NavLink>
      </div>
    </div>
  );
  
  export default Homepage;