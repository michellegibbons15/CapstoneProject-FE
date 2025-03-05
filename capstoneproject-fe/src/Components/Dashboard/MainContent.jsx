import React from "react";
import "../../Styles/Dashboard/MainContent.css";
import fieldhockeyImg from "../../assets/dashboard/FH.jpg";
import Welcome from "./Welcome";
import Calendar from "./Calendar";
import Recommendations from "./Recommendations";
import GroupList from "./GroupList";

const MainContent = () => {
  return (
    <>
      <div className="DashboardPicture">
        <img src={fieldhockeyImg} alt="FieldHockey" />
      </div>
      <div className="WelcomeContainer">
        <Welcome />
      </div>
      <div className="DashboardContainer">
        <Calendar />
        <GroupList />
        <Recommendations />
      </div>
    </>
  );
};

export default MainContent;
