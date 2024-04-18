import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import SwitchToggle from "../UI/SwitchToggle";
import {
  addExerciseToPlan,
  getExercisePlan,
} from "../services/internalApiServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import classes from "./ExerciseScheduleModal.module.css";

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const ExerciseScheduleModal = forwardRef(function Modal({ exercise }, ref) {
  const [selectedDays, setSelectedDays] = useState(
    daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day]: false,
      }),
      {}
    )
  );

  const dialog = useRef();

  const { mutate } = useMutation({
    mutationFn: addExerciseToPlan,
  });

  const { data, error } = useQuery({
    queryKey: ["exercise-plan"],
    queryFn: ({ signal }) => getExercisePlan({ signal }),
  });

  useEffect(() => {
    if (data && exercise) {
      const newSelectedDays = daysOfWeek.reduce(
        (acc, day) => ({
          ...acc,
          [day]: data[day]?.some((e) => e.exerciseId === exercise._id),
        }),
        {}
      );

      setSelectedDays(newSelectedDays);
    }
  }, [data, exercise]);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  const handleToggle = (day) => {
    setSelectedDays((prevSelectedDays) => ({
      ...prevSelectedDays,
      [day]: !prevSelectedDays[day],
    }));

    mutate({
      day,
      exerciseId: exercise._id,
    });
  };

  return createPortal(
    <dialog id="modal" ref={dialog} className={classes.modalContent}>
      <h3>{exercise.name}</h3>
      <form method="dialog">
        <SwitchToggle onToggle={handleToggle} selectedDays={selectedDays} />
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ExerciseScheduleModal;
