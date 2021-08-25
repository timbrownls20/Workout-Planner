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
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          {workoutList.map((element) => {
            return (
              <div className="card workout" key={element.id}>
                <div className="card-body">
                  <h5 className="card-title">{element.description}</h5>
                  <div className="card-text">No exercise sets</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkoutManager;
