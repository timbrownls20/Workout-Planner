import React, { useContext } from "react";
import config from "../data/config";
import { ExerciseDataContext } from "../context/ExerciseDataContext";

const DebugPanel = () => {
  const { selectedExercise, exerciseList } = useContext(ExerciseDataContext);

  return config.Debug ? (
    <>
      <hr />
      <code>{JSON.stringify(selectedExercise())}</code>
      <hr />
      <code>{JSON.stringify(exerciseList)}</code>
    </>
  ) : null;
};

export default DebugPanel;
