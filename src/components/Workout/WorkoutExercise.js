import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { WorkoutDataContext } from "../../context/WorkoutDataContext";

const WorkoutExercise = ({ workoutId, exercise, provided, index }) => {
  const { removeExercise } = useContext(WorkoutDataContext);

  return (
    <div
      className="d-flex workout-exercise justify-content-between"
      index={index}
      ref={provided.innerRef}
      {...provided.draggableProps}
      >
    
      <span {...provided.dragHandleProps}>
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
    </div>
  );
};

export default WorkoutExercise;
