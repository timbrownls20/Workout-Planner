import React, { useEffect, useReducer } from "react";
import axios from "axios";
import workoutListReducer from "../reducers/workoutListReducer";
import config from "../config/config";
import { WorkoutListActions as Actions } from "../enums/actions";

const WorkoutManager = () => {
  const [workoutList, dispatch] = useReducer(workoutListReducer, []);

  useEffect(() => {
    loadWorkouts();
  }, []);

  async function loadWorkouts() {
    let route = `${config.Server}/workouts`;
    let res = await axios.get(route);
    dispatch({ type: Actions.LOAD_WORKOUTS, value: res.data });
  }

  return (
    <div className="container-fluid mt-4">
      <h5>Workout Manager</h5>
      <div className="row">
        <div className="col-3">
          <ul className="list-group workout-list">
            {workoutList.map((element) => {
              return <li className="list-group-item">{element.description}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WorkoutManager;
