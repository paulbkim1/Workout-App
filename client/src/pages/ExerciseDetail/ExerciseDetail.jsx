import classes from "./ExerciseDetail.module.css";
import { useQuery } from "@tanstack/react-query";
import { getExerciseDetails } from "../../services/internalApiServices";
import { useParams } from "react-router-dom";
import Carousal from "../../UI/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const ExerciseDetail = () => {
  const params = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["exercise-details", params.id],
    queryFn: ({ signal }) => getExerciseDetails({ signal, id: params.id }),
  });
  console.log("data:", data);

  if (isLoading) return <FontAwesomeIcon icon={faSpinner} spin />;

  if (data) {
    return (
      <div className={classes.container}>
        <h2>{data.exercises[0].name}</h2>
        <div className={classes.content}>
          <div>
            <Carousal
              images={data.images}
              description={data.exercises[0].name}
            />
          </div>
          <div>
            <h3>Tips:</h3>
            <p className={classes.text}>{data.exercises[0].description}</p>
          </div>
          <div className={classes.muscles}>
            <div>
              <h3>Primary Muscles</h3>
              <ul>
                {data.muscles.map((muscle) => (
                  <li key={muscle.id} className={classes.text}>
                    {muscle.name}
                  </li>
                ))}
              </ul>
            </div>
            {data.muscles_secondary.length > 0 && (
              <div>
                <h3>Secondary Muscles</h3>
                <ul>
                  {data.muscles_secondary.map((muscle) => (
                    <li key={muscle.id} className={classes.text}>
                      {muscle.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {data.equipment.length > 0 && (
            <h4 className={classes.equipmentHeading}>
              Equipment:{" "}
              <span className={classes.text}>
                {data.equipment.map((equipment) => equipment.name).join(", ")}
              </span>
            </h4>
          )}
        </div>
      </div>
    );
  }
};

export default ExerciseDetail;
