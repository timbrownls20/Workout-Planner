import { useReducer, useState } from "react";
import axios from "axios";
import _ from "lodash";
import workoutListReducer from "../reducers/workoutListReducer";
import config from "../data/config";
import {
  WorkoutListActions as Actions,
  WorkoutListActions,
} from "../enums/actions";

const useWorkoutData = () => {
  const [workoutList, dispatch] = useReducer(workoutListReducer, []);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState();

  async function loadWorkouts() {
    let route = `${config.Server}/workouts`;
    let res = await axios.get(route);
    dispatch({ type: Actions.LOAD_WORKOUTS, value: res.data });
  }

  const addWorkout = (name) => {

    if(_.isEmpty(name)) return;

    dispatch({
      type: WorkoutListActions.ADD_WORKOUT,
      value: name,
    });
  };

  const addExercise = (workoutId, exercise) => {
    dispatch({
      type: WorkoutListActions.ADD_EXERCISE,
      value: { workoutId, exercise },
    });
  };

  const removeExercise = (workoutId, order) => {
    dispatch({
      type: WorkoutListActions.REMOVE_EXERCISE,
      value: { workoutId, order },
    });
  };

  const reorderExercise = (workoutId, indexFrom, indexTo) => {
    dispatch({
      type: WorkoutListActions.REORDER_EXERCISE,
      value: { workoutId, indexFrom, indexTo },
    });
  };

  const getSelectedWorkout = () => {
    let workout = workoutList.find((e) => e.id === selectedWorkoutId);
    return workout ? workout : { id: 0, description: "", sets: [] };
  };

  const selectedWorkout = getSelectedWorkout();

  return {
    workoutList,
    loadWorkouts,
    addWorkout,
    selectedWorkoutId,
    setSelectedWorkoutId,
    selectedWorkout,
    addExercise,
    removeExercise,
    reorderExercise,
  };
};

export default useWorkoutData;
