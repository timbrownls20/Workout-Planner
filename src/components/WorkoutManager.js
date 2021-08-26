import React, { useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import Workout from "./Workout";
import { FormStateContext } from "../config/FormStateContext";
import { FormState } from "../enums/enums";
import useWorkoutData from "../hooks/useWorkoutData";

const WorkoutManager = () => {
  const { formState, setFormState } = useContext(FormStateContext);
  const { workoutList, loadWorkouts } = useWorkoutData();

  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  return (
    <>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            {workoutList.map((element) => {
              return <Workout workout={element} key={element.id}></Workout>;
            })}
          </div>
        </div>
      </div>
      <div
        className={
          "overlay container-fluid d-flex justify-content-center align-items-center" +
          (formState === FormState.EDIT ? " overlay-show" : "")
        }
      >
        <div className="d-flex justify-content-end">
          <FontAwesomeIcon
            icon={faWindowClose}
            size="2x"
            className="close"
            onClick={() => setFormState(FormState.UNDEFINED)}
          />
        </div>
      </div>
    </>
  );
};

export default WorkoutManager;
