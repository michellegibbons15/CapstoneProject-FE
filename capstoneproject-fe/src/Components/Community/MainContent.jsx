import React from "react";
import surfaceIMG from "../../assets/community/surface.jpeg"
import "../../Styles/Community/MainContent.css"
import NewsFeed from "./NewsFeed";


const MainContent = () => {
  return (
    <>
      <div className="CommunityPicture">
        <img src={surfaceIMG} alt="Surfaces" />
      </div>
      <div>
        <NewsFeed/>
      </div>
    </>
  );
};

export default MainContent;
