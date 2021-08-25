import { WorkoutListActions } from "../enums/actions";

const workoutListReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case WorkoutListActions.LOAD_WORKOUTS:
      newState = action.value;
      break;
    default:
  }

  return newState;
};

export default workoutListReducer;
