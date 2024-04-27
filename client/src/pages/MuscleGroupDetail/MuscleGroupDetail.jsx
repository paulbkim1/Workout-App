import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import { getCategoryExercises } from "../../services/internalApiServices";
import Card from "../../components/Card";
import classes from "./MuscleGroupDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const MuscleGroupDetail = () => {
  const params = useParams();
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["muscle-group-exercises", params.muscleGroup],
    queryFn: ({ signal }) =>
      getCategoryExercises({ signal, category: params.muscleGroup }),
  });
  console.log("Exercises:", data);
  let content;
  if (isLoading) {
    content = <FontAwesomeIcon icon={faSpinner} spin size="3x" />;
  } else if (data) {
    content = data.map((exercise) => (
      <Card key={exercise.id} exercise={exercise} />
    ));
  }
  return (
    <div className={classes.container}>
      <h2>
        {params.muscleGroup.charAt(0).toUpperCase() +
          params.muscleGroup.slice(1)}
      </h2>
      <NavLink to="/user/muscle-groups">&larr; Back</NavLink>
      <div className={classes.contentContainer}>{content}</div>
    </div>
  );
};

export default MuscleGroupDetail;
