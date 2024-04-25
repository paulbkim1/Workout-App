import { useQuery } from "@tanstack/react-query";
import { getTodaysExercise } from "../../services/internalApiServices";
import classes from "./Dashboard.module.css";
import ExerciseItem from "../../components/ExerciseItem";

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["todays-exercise"],
    queryFn: ({ signal }) => getTodaysExercise({ signal }),
  });

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (data && data.length > 0) {
    content = data.map((exercise, key) => (
      <ExerciseItem keyValue={key} exercise={exercise} />
    ));
  } else {
    content = <p>No exercises for today</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div className={classes.container}>
      <h2>Today's Workout Plan</h2>
      <div className={classes.content}>{content}</div>
    </div>
  );
};

export default Dashboard;
