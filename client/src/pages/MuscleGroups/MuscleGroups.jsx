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
  const [loadedCount, setLoadedCount] = useState(0);

  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedCount === muscleGroups.length) {
      setImagesLoaded(true);
    }
  }, [loadedCount]);

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
              <img
                src={image}
                alt={`Picture of ${name}`}
                onLoad={handleImageLoad}
              />
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
