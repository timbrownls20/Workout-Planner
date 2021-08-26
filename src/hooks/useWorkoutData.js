import { useReducer, useState } from "react";
import axios from "axios";
import workoutListReducer from "../reducers/workoutListReducer";
import config from "../data/config";
import { WorkoutListActions as Actions } from "../enums/actions";

const useWorkoutData = () => {

  const [workoutList, dispatch] = useReducer(workoutListReducer, []);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState();

  async function loadWorkouts() {
    let route = `${config.Server}/workouts`;
    let res = await axios.get(route);
    dispatch({ type: Actions.LOAD_WORKOUTS, value: res.data });
  }

  const getSelectedWorkout = () => {
    let workout = workoutList.find(e => e.id === selectedWorkoutId);
    return workout ? workout : { id: 0, description: "", sets: [] };
  };

  const selectedWorkout = getSelectedWorkout();

  return { workoutList, loadWorkouts, selectedWorkoutId, setSelectedWorkoutId, selectedWorkout };
};

export default useWorkoutData;
