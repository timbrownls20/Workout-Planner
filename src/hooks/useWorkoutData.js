import { useReducer } from "react";
import axios from "axios";
import workoutListReducer from "../reducers/workoutListReducer";
import config from "../data/config";
import { WorkoutListActions as Actions } from "../enums/actions";

const useWorkoutData = () => {
  const [workoutList, dispatch] = useReducer(workoutListReducer, []);

  async function loadWorkouts() {
    let route = `${config.Server}/workouts`;
    let res = await axios.get(route);
    dispatch({ type: Actions.LOAD_WORKOUTS, value: res.data });
  }

  return { workoutList, loadWorkouts };
};

export default useWorkoutData;
