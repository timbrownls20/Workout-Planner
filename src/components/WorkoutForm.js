import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { FormStateContext } from "../context/FormStateContext";
import { WorkoutDataContext } from "../context/WorkoutDataContext";
import { FormState } from "../enums/enums";

const WorkoutForm = () => {
  const { formState, setFormState } = useContext(FormStateContext);
  const { selectedWorkout } = useContext(WorkoutDataContext);

  return (
    <div
      className={
        "overlay container-fluid d-flex justify-content-center align-items-center" +
        (formState === FormState.EDIT ? " overlay-show" : "")
      }
    >
      <div className="overlay-inner">
        <div className="row workout-form-header gx-0">
          <div className="col-11 d-flex justify-content-center mt-4">
            <h3>{selectedWorkout ? selectedWorkout.description : ""}</h3>
          </div>
          <div className="col-1 d-flex justify-content-end">
            <FontAwesomeIcon
              icon={faWindowClose}
              size="2x"
              className="close"
              onClick={() => setFormState(FormState.UNDEFINED)}
            />
          </div>
        </div>
        <div className="row workout-form-body gx-0">
          <div className="col-11 d-flex justify-content-center align-items-center">
            <h5>workout details</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutForm;
