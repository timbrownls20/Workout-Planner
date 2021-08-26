import React from "react";
import useWorkoutData from "../hooks/useWorkoutData";

export const WorkoutDataContext = React.createContext();

export const WorkoutDataProvider = ({ children }) => {
  const {
    workoutList,
    loadWorkouts,
    selectedWorkoutId,
    setSelectedWorkoutId,
    selectedWorkout,
  } = useWorkoutData();

  const provider = {
    workoutList,
    loadWorkouts,
    selectedWorkoutId,
    setSelectedWorkoutId,
    selectedWorkout,
  };

  return (
    <WorkoutDataContext.Provider value={provider}>
      {children}
    </WorkoutDataContext.Provider>
  );
};
