import { WorkoutListActions as Action } from "../enums/actions";
import _ from "lodash";

const workoutListReducer = (state, action) => {
  let newState, newWorkout;

  function arraymove(arr, indexFrom, indexTo) {
    var element = arr[indexFrom];
    arr.splice(indexFrom, 1);
    arr.splice(indexTo, 0, element);

    return arr;
  }

  function reorder(sets) {
    sets.map((element, index) => {
      element.order = index + 1;
      return element;
    });

    return sets;
  }

  switch (action.type) {
    case Action.LOAD_WORKOUTS:
      newState = action.value;
      break;
    case Action.ADD_WORKOUT:
      let newId =
        state.reduce((acc, item) => {
          return parseInt(item.id) > acc ? parseInt(item.id) : acc;
        }, 0) + 1;

      newState = [{ id: newId, name: action.value, sets: [] }, ...state];
      break;

    case Action.ADD_EXERCISE:
      newWorkout = { ...state.find((e) => e.id === action.value.workoutId) };

      let order =
        newWorkout.sets.length > 0
          ? _.maxBy(newWorkout.sets, (e) => {
              return e.order;
            }).order + 1
          : 1;

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

      reorder(newWorkout.sets);

      newState = state.map((element) =>
        element.id === newWorkout.id ? newWorkout : element
      );

      break;
    case Action.REORDER_EXERCISE:
      newWorkout = { ...state.find((e) => e.id === action.value.workoutId) };

      newWorkout.sets = arraymove(
        [...newWorkout.sets],
        action.value.indexFrom,
        action.value.indexTo
      );

      reorder(newWorkout.sets);

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
