import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import abs from "../../assets/abs.jpg";
import back from "../../assets/back.jpg";
import chest from "../../assets/chest.jpg";
import legs from "../../assets/legs.jpg";
import shoulders from "../../assets/shoulders.jpg";
import arms from "../../assets/arms.jpeg";
import classes from "./MuscleGroups.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const muscleGroups = [
  { name: "Abs", image: abs, path: "abs" },
  { name: "Arms", image: arms, path: "arms" },
  { name: "Back", image: back, path: "back" },
  { name: "Chest", image: chest, path: "chest" },
  { name: "Legs", image: legs, path: "legs" },
  { name: "Shoulders", image: shoulders, path: "shoulders" },
];

const MuscleGroups = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image;
        loadImg.onload = () => resolve(image);
        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.all(muscleGroups.map((group) => loadImage(group.image)))
      .then(() => setImagesLoaded(true))
      .catch((err) => console.log("Failed to load images", err));
  }, []);

  return (
    <div className={classes.container}>
      {!imagesLoaded ? (
        <div className={classes.loadingSpinner}>
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
      ) : (
        <div className={classes.muscleGroupContainer}>
          {muscleGroups.map(({ name, image, path }) => (
            <div key={name} className={classes.muscle}>
              <img src={image} alt={`Picture of ${name}`} />
              <h3>{name}</h3>
              <Link to={path} className={classes.exploreLink}>
                <span>EXPLORE</span> <span>&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MuscleGroups;
