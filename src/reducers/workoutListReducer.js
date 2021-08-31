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

      let order = newWorkout.sets.length > 0 ?_.maxBy(newWorkout.sets, (e) => {
        return e.order
      }).order + 1: 1;

      let exercise = {
        ..._.pick(action.value.exercise, "id", "name"),
        order: order,
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

      //..reorder
      newWorkout.sets.map((element, index) => {
        element.order = index + 1;
        return element
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
