import React, {useState, useEffect} from 'react';
import "../../Styles/Landing/Slideshow.css";
import facilityImg from "../../assets/landing/facility.jpg";
import trackImg from "../../assets/landing/track.jpg";
import golfImg from "../../assets/landing/golf.jpg";
import basketballImg from "../../assets/landing/basketball.jpg"

const images = [facilityImg, trackImg, basketballImg, golfImg];

  const Slideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
      // Move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Move to the previous slide
  // const prevSlide = () => {
  //   setCurrentIndex(
  //     (prevIndex) => (prevIndex - 1 + images.length) % images.length
  //   );
  // };

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change image every 3 seconds
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

   return (
    <div className="slideshow-container">
      {images.map((img, index) => (
        <div
        className={`slides fade ${index === currentIndex ? "active" : ""}`}
        key={index}
      >
        <img src={img} className="slide-img" alt="Slideshow" />
      </div>
    ))}
    {/* <button className="prev" onClick={prevSlide}>
      &#10094;
    </button>
    <button className="next" onClick={nextSlide}>
      &#10095;
    </button> */}
    </div>
  );
}
  
  export default Slideshow;