import React from "react";
import "../../Styles/Dashboard/Recommendations.css";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLocationDot} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";

const Recommendations = () => {
  return (
      <div className="suggestions">
        <h3>
        <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '8px'}} />Local Recommendations
        </h3>
        <h4>
          <NavLink to="/explore">Explore what else is around:</NavLink>
        </h4>
        <ul>
          <li>Ukrops Park</li>
          <li>Gillies Creek Park</li>
          <li>Duncroft</li>
          <li>Dorey Park</li>
          <li>Deep Run Park</li>
        </ul>
      </div>
  );
};

export default Recommendations;
