import { useState, useReducer, useEffect } from "react";
import axios from "axios";
import { bodyPartData } from "../data/initialData";
import exerciseListReducer from "../reducers/exerciseListReducer";
import config from "../config/config";
import Action from "../enums/actions";

const useExerciseData = () => {
  let exerciseData = [];

  const [selectedExerciseId, setSelectedExerciseId] = useState();

  const [exerciseList, dispatch] = useReducer(
    exerciseListReducer,
    exerciseData
  );

  useEffect(() => {
    axios.get(`${config.Server}/exercises`).then((res) => {
      res.data.sort(exerciseDataSorter);
      dispatch({ type: Action.LOAD_EXERCISES, value: res.data });
      setSelectedExerciseId(res.data[0].id);
    });
  }, []);

  const exerciseDataSorter = (a, b) => {
    if (a.name > b.name) {
      return 1;
    } else if (a.name < b.name) {
      return -1;
    } else {
      return 0;
    }
  };

  const selectedExercise = () => {
    let exercise = exerciseList.find((e) => e.id === selectedExerciseId);
    return exercise ? exercise : { id: 0, name: "", bodyParts: [] };
  };

  const availableBodyPartsForSelection = () => {
    let exercise = selectedExercise();

    if (!exercise) return [];

    return bodyPartData.filter((e) => {
      return !exercise.bodyParts.find((bp) => bp.id === e.id);
    });
  };

  const addExercise = (name) => {
    dispatch({ type: Action.ADD_EXERCISE, value: name });
  };

  const editExercise = (id, name) => {
    dispatch({ type: Action.EDIT_EXERCISE, value: { id, name } });
  };

  const removeExercise = (id) => {
    dispatch({ type: Action.REMOVE_EXERCISE, value: id });
    setSelectedExerciseId(exerciseList[0].id);
  };

  const addBodyPart = (bodyPartId, exerciseId) => {
    dispatch({
      type: Action.ADD_BODYPART,
      value: {
        bodyPartId: bodyPartId,
        exerciseId: exerciseId,
      },
    });
  };

  const removeBodyPart = (bodyPartId, exerciseId) => {
    console.log(`exerciseId ${exerciseId}`);

    dispatch({
      type: Action.REMOVE_BODYPART,
      value: {
        bodyPartId: bodyPartId,
        exerciseId: exerciseId,
      },
    });
  };
  return {
    selectedExerciseId,
    setSelectedExerciseId,
    selectedExercise,
    exerciseList,
    addExercise,
    editExercise,
    removeExercise,
    addBodyPart,
    removeBodyPart,
    availableBodyPartsForSelection,
  };
};

export default useExerciseData;
