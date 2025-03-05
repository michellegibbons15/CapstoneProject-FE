import React from "react";
import "../../Styles/Explore/MainContent.css";
import Map from "./Map";
import grassIMG from "../../assets/explore/grass.jpg"

const MainContent = () => {
  return (
    <>
      <div className="ExplorePicture">
        <img src={grassIMG} alt="grass" />
      </div>
      <div>
        <Map/>
      </div>
    </>
  );
};

export default MainContent;
