import React from "react";
import tennisIMG from "../../assets/league/tennis.jpg";
import "../../Styles/Leagues/MainContent.css";
import LeagueList from "./LeagueList";

const MainContent = () => {
  return (
    <>
      <div className="LeaguePicture">
        <img src={tennisIMG} alt="Tennis" />
      </div>
      <div>
        <LeagueList/>
      </div>
    </>
  );
};

export default MainContent;
