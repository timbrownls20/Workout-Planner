import axios from "axios";
import Action from "../enums/actions";
import { bodyPartData } from "../data/referenceData";
import config from "../data/config";

const exerciseListReducer = (state, action) => {
  let newExerciseList, newExercise;

  switch (action.type) {
    case Action.LOAD_EXERCISES:
      if (config.RefreshDataOnLoad) {
        newExerciseList = action.value.map((exercise) => {
          let remappedBodyParts = exercise.bodyParts.map((bodyPart) => {
            return bodyPartData.find((ref) => ref.id === bodyPart.id);
          });
          return { ...exercise, bodyParts: remappedBodyParts };
        });
      } else {
        newExerciseList = action.value;
      }
      break;
    case Action.ADD_EXERCISE:
      let newId =
        state.reduce((acc, item) => {
          return parseInt(item.id) > acc ? parseInt(item.id) : acc;
        }, 0) + 1;

      newExerciseList = [
        { id: newId, name: action.value, bodyParts: [] },
        ...state,
      ];
      break;
    case Action.EDIT_EXERCISE:
      newExerciseList = state.map(element => {
        return element.id === action.value.id
          ? { ...element, name: action.value.name }
          : element;
      });
      break;
    case Action.REMOVE_EXERCISE:
      newExerciseList = state.filter(element => {
        return element.id !== action.value ? element : null;
      });
      break;
    case Action.ADD_BODYPART:
      newExercise = { ...state.find((e) => e.id === action.value.exerciseId) };

      var bodyPart = bodyPartData.find(element => element.id === parseInt(action.value.bodyPartId));

      newExercise.bodyParts.push(bodyPart);
      newExerciseList = state.map(element => element.id === newExercise.id ? newExercise : element
      );
      break;
    case Action.REMOVE_BODYPART:
      newExercise = { ...state.find(element => element.id === action.value.exerciseId) };

      newExercise.bodyParts = newExercise.bodyParts.filter(
        (element) => element.id !== parseInt(action.value.bodyPartId)
      );

      newExerciseList = state.map(element =>
        element.id === newExercise.id ? newExercise : element
      );
      break;
    default:
      newExerciseList = state;
  }

  axios.post(`${config.Server}/exercises`, newExerciseList);
  

  return newExerciseList;
};

export default exerciseListReducer;
