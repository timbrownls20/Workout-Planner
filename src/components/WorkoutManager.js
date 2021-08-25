import React, { useEffect, useReducer,useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import workoutListReducer from "../reducers/workoutListReducer";
import config from "../config/config";
import { WorkoutListActions as Actions } from "../enums/actions";
import Workout from "./Workout";
import { FormStateContext } from "../config/FormStateContext";
import { FormState } from "../enums/enums";

const WorkoutManager = () => {
  const [workoutList, dispatch] = useReducer(workoutListReducer, []);
  const {formState, setFormState } = useContext(FormStateContext);

  useEffect(() => {
    loadWorkouts();
  }, []);

  async function loadWorkouts() {
    let route = `${config.Server}/workouts`;
    let res = await axios.get(route);
    dispatch({ type: Actions.LOAD_WORKOUTS, value: res.data });
  }

  return (
    <>
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          {workoutList.map(element => {
            return <Workout workout={element} key={element.id} ></Workout>
          })}  
        </div>
      </div>
    </div>
    <div className={"overlay container-fluid d-flex justify-content-center align-items-center" + (formState === FormState.EDIT ? " overlay-show" : "")}>
      <div className="d-flex justify-content-end">
        <FontAwesomeIcon icon={faWindowClose} size="2x" className="close" onClick={() => setFormState(FormState.UNDEFINED)} />
      </div>
    </div>
    </>
  );
};

export default WorkoutManager;
