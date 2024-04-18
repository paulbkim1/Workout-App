import React, { useCallback } from "react";
import classes from "./ExerciseItem.module.css";
import { Link } from "react-router-dom";

const ExerciseItem = ({ keyValue, day, exercise, onCountChange, onDelete }) => {
  const handleCountChange = useCallback(
    (countType, value) => {
      const currentValue = exercise[countType];
      const newValue = currentValue + value;

      if (newValue < 0) {
        return;
      }

      onCountChange(newValue, day, countType, exercise.exerciseId);
    },
    [exercise, onCountChange, day]
  );

  const handleDelete = useCallback(() => {
    onDelete({ day, exerciseId: exercise.exerciseId });
  }, [onDelete, day, exercise.exerciseId]);

  return (
    <div
      className={`${classes.exerciseContainer} ${
        keyValue === 0 ? classes.noBorderTop : ""
      }`}
    >
      <h3>
        <Link to={`/user/exercises/${exercise.exerciseId}`}>
          {exercise.name}
        </Link>
      </h3>
      <div className={classes.exerciseDetails}>
        {onCountChange ? (
          <div>
            <p>Reps</p>
            <div className={classes.counterContainer}>
              <button
                className={classes.counterButton}
                onClick={() => handleCountChange("reps", -1)}
              >
                -
              </button>
              <span className={classes.counterValue}>{exercise.reps}</span>
              <button
                className={classes.counterButton}
                onClick={() => handleCountChange("reps", +1)}
              >
                +
              </button>
            </div>
          </div>
        ) : (
          <p>Reps: {exercise.reps}</p>
        )}

        {onCountChange ? (
          <div>
            <p>Sets</p>
            <div className={classes.counterContainer}>
              <button
                className={classes.counterButton}
                onClick={() => handleCountChange("sets", -1)}
              >
                -
              </button>
              <span className={classes.counterValue}>{exercise.sets}</span>
              <button
                className={classes.counterButton}
                onClick={() => handleCountChange("sets", 1)}
              >
                +
              </button>
            </div>
          </div>
        ) : (
          <p>Sets: {exercise.sets}</p>
        )}
      </div>
      {onDelete && (
        <button className={classes.deleteButton} onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default ExerciseItem;
