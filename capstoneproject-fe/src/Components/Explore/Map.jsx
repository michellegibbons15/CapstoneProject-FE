import React, {useState} from "react";
import "../../Styles/Explore/Map.css"

const Map = () => {
  const [isLoading, setIsLoading] = useState(true);
  const handleIframeLoad = () => {
    setIsLoading(false);
  }
  return (
    <div className="Map-container">
      {isLoading && (
        <div className="loading-bar">
          <div className="progress"></div>
        </div>
      )}
      <iframe
        src="https://app.mapline.com/map/map_227b2215/N0lWc25IOEhWUHh1S2Q1Z3VBcVdGUnRKajRHYjl4bmVDQXBzZm"
        style={{width:"80%", height:"700px"}}
        allow="geolocation *"
        onLoad={handleIframeLoad}
        title="Map"
      ></iframe>
    </div>
  );
};

export default Map;
