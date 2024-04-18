import { useState, useEffect, useRef } from "react";
import classes from "./Carousel.module.css";

export default function Carousel({ images, description }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("");
  const [key, setKey] = useState(0); // Add a key state

  const handlePrevImage = () => {
    setSlideDirection("right");
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNextImage = () => {
    setSlideDirection("left");
    setSelectedImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Update the key to force re-render
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [selectedImageIndex, slideDirection]);

  const slideClass =
    slideDirection === "left" ? classes.slideLeft : classes.slideRight;

  return (
    <div className={classes.imageContainer}>
      <div key={key} className={`${classes.imagesWrapper} ${slideClass}`}>
        <img
          src={images[selectedImageIndex].image}
          alt={`Image of ${description}`}
          className={classes.slideImage}
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            className={`${classes.arrow} ${classes.leftArrow}`}
            onClick={handlePrevImage}
          >
            &lt;
          </button>
          <button
            className={`${classes.arrow} ${classes.rightArrow}`}
            onClick={handleNextImage}
          >
            &gt;
          </button>
        </>
      )}
    </div>
  );
}
