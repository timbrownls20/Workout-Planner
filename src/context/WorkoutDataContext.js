import React from "react";
import useWorkoutData from "../hooks/useWorkoutData";

export const WorkoutDataContext = React.createContext();

export const WorkoutDataProvider = ({ children }) => {
  const {
    workoutList,
    loadWorkouts,
    addWorkout,
    selectedWorkoutId,
    setSelectedWorkoutId,
    selectedWorkout,
    addExercise,
    removeExercise,
    reorderExercise,
  } = useWorkoutData();

  const provider = {
    workoutList,
    loadWorkouts,
    addWorkout,
    selectedWorkoutId,
    setSelectedWorkoutId,
    selectedWorkout,
    addExercise,
    removeExercise,
    reorderExercise
  };

  return (
    <WorkoutDataContext.Provider value={provider}>
      {children}
    </WorkoutDataContext.Provider>
  );
};
