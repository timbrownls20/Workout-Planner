import { WorkoutListActions as Action } from "../enums/actions";
import _ from "lodash";

const workoutListReducer = (state, action) => {
  let newState, newWorkout;

  switch (action.type) {
    case Action.LOAD_WORKOUTS:
      newState = action.value;
      break;
    case Action.ADD_EXERCISE:
      newWorkout = { ...state.find((e) => e.id === action.value.workoutId) };
      let index = newWorkout.sets.length + 1;
      let exercise = {
        ..._.pick(action.value.exercise, "id", "name"),
        order: index,
      };
      newWorkout.sets.push(exercise);
      newState = state.map((element) =>
        element.id === newWorkout.id ? newWorkout : element
      );
      break;
    case Action.REMOVE_EXERCISE:
      newWorkout = { ...state.find((e) => e.id === action.value.workoutId) };
      newWorkout.sets = [...newWorkout.sets].filter((e) => {
        return parseInt(e.order) !== parseInt(action.value.order);
      });

      console.log(newWorkout.sets);

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
