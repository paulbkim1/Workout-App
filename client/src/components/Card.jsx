import { useRef } from "react";
import classes from "./Card.module.css";

import ExerciseScheduleModal from "../modals/ExerciseScheduleModal";
import { Link } from "react-router-dom";

const Card = ({ exercise }) => {
  const modal = useRef();

  const handleOpenModal = () => {
    modal.current.open();
  };

  return (
    <>
      <ExerciseScheduleModal ref={modal} exercise={exercise} />
      <section className={classes.container}>
        <Link to={`/user/exercises/${exercise._id}`}>
          <h3>{exercise.name}</h3>
          <img src={exercise.image} alt="" />
        </Link>
        <button onClick={handleOpenModal}>Add Workout</button>
      </section>
    </>
  );
};

export default Card;
