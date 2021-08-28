import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { WorkoutDataContext } from "../context/WorkoutDataContext";

const WorkoutExercise = ({ workoutId, exercise, index }) => {
  const { removeExercise } = useContext(WorkoutDataContext);

  return (
    <li
      className="list-group-item d-flex workout-exercise justify-content-between"
      key={index}
    >
      <span>
        {exercise.order}. {exercise.name}
      </span>
      <span>
        <FontAwesomeIcon
          icon={faTimesCircle}
          color="indianred"
          className="workout-exercise-remove"
          onClick={() => {
            removeExercise(workoutId, exercise.order);
          }}
        />
      </span>
    </li>
  );
};

export default WorkoutExercise;
