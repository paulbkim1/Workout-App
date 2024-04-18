import { useMutation, useQuery } from "@tanstack/react-query";
import Tabs from "../../UI/Tabs";
import {
  deleteExerciseFromPlan,
  getExercisePlan,
  updateExerciseRoutine,
} from "../../services/internalApiServices";
import { useEffect, useState } from "react";
import classes from "./WorkoutPlan.module.css";
import { queryClient } from "../../util/http";
import Accordion from "../../UI/Accordion";
import ExerciseItem from "../../components/ExerciseItem"; // Ensure this component is properly implemented
import { Link } from "react-router-dom";

const WorkoutPlan = () => {
  const [exercisePlan, setExercisePlan] = useState(null);
  const { data, isPending } = useQuery({
    queryKey: ["exercise-plan"],
    queryFn: ({ signal }) => getExercisePlan({ signal }),
  });

  useEffect(() => {
    if (data) {
      setExercisePlan(data);
    }
  }, [data]);

  const { mutate } = useMutation({
    mutationFn: updateExerciseRoutine,
    onMutate: async (data) => {
      const updatedExercisePlan = data;

      await queryClient.cancelQueries({ queryKey: ["exercise-plan"] });
      queryClient.setQueriesData(["exercise-plan"], updatedExercisePlan);
    },
  });

  const { mutate: deleteExercise } = useMutation({
    mutationFn: deleteExerciseFromPlan,
    onMutate: async ({ day, exerciseId }) => {
      await queryClient.cancelQueries({ queryKey: ["exercise-plan"] });

      const currentExercisePlan = queryClient.getQueryData(["exercise-plan"]);
      const updatedExercisesForDay = currentExercisePlan[day].filter(
        (exercise) => exercise.exerciseId !== exerciseId
      );

      const updatedExercisePlan = {
        ...currentExercisePlan,
        [day]: updatedExercisesForDay,
      };

      queryClient.setQueriesData(["exercise-plan"], updatedExercisePlan);

      setExercisePlan(updatedExercisePlan);
    },
  });

  const handleCountChange = (newValue, day, countType, exerciseId) => {
    const updatedExercisePlan = JSON.parse(JSON.stringify(exercisePlan));

    const exercisesForDay = updatedExercisePlan[day];
    if (exercisesForDay) {
      const exerciseIndex = exercisesForDay.findIndex(
        (exercise) => exercise.exerciseId === exerciseId
      );
      if (exerciseIndex !== -1) {
        exercisesForDay[exerciseIndex][countType] = newValue;
      }
    }

    setExercisePlan(updatedExercisePlan);
  };

  const accordionSections = exercisePlan
    ? Object.keys(exercisePlan).map((day) => ({
        label: day.charAt(0).toUpperCase() + day.slice(1),
        content:
          exercisePlan[day].length > 0 ? (
            <ul>
              {exercisePlan[day].map((exercise, index) => (
                <li key={exercise._id}>
                  <ExerciseItem
                    keyValue={index}
                    day={day}
                    exercise={exercise}
                    onCountChange={handleCountChange}
                    onDelete={deleteExercise}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className={classes.noExercises}>
              No exercises for this day. Explore{" "}
              <Link to="/user/exercises">exercises</Link> and add them to your
              plan.
            </p>
          ),
      }))
    : [];

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (exercisePlan) {
    return (
      <div className={classes.container}>
        <h2>Customize Your Routine</h2>
        <div className={classes.accordion}>
          <Accordion sections={accordionSections} />
        </div>
        <div className={classes.tabs}>
          <Tabs tabs={accordionSections} />
        </div>
        <button
          className={classes.updateButton}
          onClick={() => mutate(exercisePlan)}
        >
          Update
        </button>
      </div>
    );
  }
};

export default WorkoutPlan;
