import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { FormStateContext } from "../context/FormStateContext";
import { WorkoutDataContext } from "../context/WorkoutDataContext";
import { ExerciseDataContext } from "../context/ExerciseDataContext";
import { FormState } from "../enums/enums";
import ExerciseList from "./ExerciseList";

const WorkoutForm = () => {
  const { formState, setFormState } = useContext(FormStateContext);
  const { selectedWorkout, addExercise } = useContext(WorkoutDataContext);
  const {selectedExercise } = useContext(ExerciseDataContext)

  const add = () => {
    addExercise(selectedWorkout.id, selectedExercise())
  }

  return (
    <div
      className={
        "overlay d-flex justify-content-center align-items-center" +
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
          <div className="col-3 ">
            <ExerciseList add={add} />
          </div>
          <div className="col-3 d-flex justify-content-center mt-4">
          
            <ul className="list-group">

              {selectedWorkout.sets.map((exercise,index) => {
                return <li className="list-group-item" key={index}>{index + 1}. {exercise.name}</li>
              })

              }

             </ul> 
             </div>
             <div className="col-3 d-flex justify-content-center mt-4">
             <code>{JSON.stringify(selectedWorkout)}</code> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutForm;
