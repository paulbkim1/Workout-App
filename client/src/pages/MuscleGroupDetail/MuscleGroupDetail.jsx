import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import { getCategoryExercises } from "../../services/internalApiServices";
import Card from "../../components/Card";
import classes from "./MuscleGroupDetail.module.css";

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
    content = "Loading...";
  } else if (data) {
    content = (
      <div className={classes.exerciseContainer}>
        {data.map((exercise) => (
          <Card key={exercise.id} exercise={exercise} />
        ))}
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <h2>
        {params.muscleGroup.charAt(0).toUpperCase() +
          params.muscleGroup.slice(1)}
      </h2>
      <NavLink to="/user/muscle-groups">&larr; Back</NavLink>
      {content}
    </div>
  );
};

export default MuscleGroupDetail;
