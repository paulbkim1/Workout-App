import { useQuery } from "@tanstack/react-query";
import { getTodaysExercise } from "../../services/internalApiServices";
import classes from "./Dashboard.module.css";
import ExerciseItem from "../../components/ExerciseItem";

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["todays-exercise"],
    queryFn: ({ signal }) => getTodaysExercise({ signal }),
  });

  console.log(data);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.container}>
      <h2>Today's Workout Plan</h2>
      <div className={classes.content}>
        {data && data.length > 0 ? (
          data.map((exercise, key) => (
            <ExerciseItem keyValue={key} exercise={exercise} />
          ))
        ) : (
          <p>No exercises for today</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
