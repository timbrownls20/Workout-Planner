import { WorkoutListActions } from "../enums/actions";

const workoutListReducer = (state, action) => {
  let newState, newWorkout;

  switch (action.type) {
    case WorkoutListActions.LOAD_WORKOUTS:
      newState = action.value;
      break;
    case WorkoutListActions.ADD_EXERCISE:
      newWorkout = { ...state.find((e) => e.id === action.value.workoutId) };
      let index = newWorkout.sets.length + 1;
      newWorkout.sets.push({
        id: action.value.exercise.id,
        name: action.value.exercise.name,
        order: index,
      });
      newState = state.map((element) =>
        element.id === newWorkout.id ? newWorkout : element
      );
      break;
    default:
      newState = state;
  }

  return newState;
};

export default workoutListReducer;
