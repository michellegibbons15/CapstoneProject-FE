import React, { useState, useEffect } from "react";
import "../../Styles/Dashboard/Welcome.css";
import soccerImg from "../../assets/dashboard/Profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Welcome = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // fetching to get the current user
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/users", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        console.log("API Response:", data);
        if (data && data.length > 0){
          setUserName(data[0].name);
        }else {
        setUserName( "Guest"); 
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="Welcome">
      <img src={soccerImg} alt="Michelle" className="profile" />
      <div className="welcome-bar">
        <h1>Welcome back!</h1>
        <h4>
          <FontAwesomeIcon icon={faBell} />
          Notifications
        </h4>
      </div>
    </div>
  );
};

export default Welcome;
