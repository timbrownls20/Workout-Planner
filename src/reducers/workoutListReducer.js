import { WorkoutListActions } from "../enums/actions";

const workoutListReducer = (state, action) => {
  let newState,newWorkout;

  switch (action.type) {
    case WorkoutListActions.LOAD_WORKOUTS:
      newState = action.value;
      break;
    case WorkoutListActions.ADD_EXERCISE:
      newWorkout = { ...state.find((e) => e.id === action.value.workoutId) };
      newWorkout.sets.push(action.value.exercise);
      newState = state.map(element => element.id === newWorkout.id ? newWorkout : element);
      break;
    default:
      newState = state;
  }

  return newState;
};

export default workoutListReducer;
