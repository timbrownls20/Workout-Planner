import React, { useEffect, useContext } from "react";
import Workout from "./Workout";
import { WorkoutDataContext } from "../context/WorkoutDataContext";
import WorkoutForm from "./WorkoutForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { FormStateContext } from "../context/FormStateContext";
import { FormState } from "../enums/enums";

const WorkoutManager = () => {
  const { workoutList, loadWorkouts } = useContext(WorkoutDataContext);
  const { setFormState } = useContext(FormStateContext);

  useEffect(() => {
    loadWorkouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mt-4">
        <div className="row">
          <div
            className="col-12 d-flex justify-content-start exercises-toolbar"
            onClick={() => setFormState(FormState.NEW)}
          >
            <div>
              <FontAwesomeIcon icon={faPlusSquare} size="1x" />
            </div>
            <div>
              <small>Add new workout</small>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            {workoutList.map((element) => {
              return <Workout workout={element} key={element.id}></Workout>;
            })}
          </div>
        </div>
      </div>
      <WorkoutForm />
    </>
  );
};

export default WorkoutManager;
