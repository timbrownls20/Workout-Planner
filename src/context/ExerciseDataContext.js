import React from 'react';
import useExerciseData from '../hooks/useExerciseData';

export const ExerciseDataContext = React.createContext();

export const ExerciseDataProvider = ({children}) => {

    const {
        selectedExerciseId,
        setSelectedExerciseId,
        selectedExercise,
        selectFirstExercise,
        exerciseListPage,
        isLastPage,
        addExercise,
        editExercise,
        removeExercise,
        addBodyPart,
        removeBodyPart,
        availableBodyPartsForSelection,
        getExerciseById,
      } = useExerciseData();

      const provider = {
        selectedExerciseId,
        setSelectedExerciseId,
        selectedExercise,
        selectFirstExercise,
        exerciseListPage,
        isLastPage,
        addExercise,
        editExercise,
        removeExercise,
        addBodyPart,
        removeBodyPart,
        availableBodyPartsForSelection,
        getExerciseById,
      };

    return (
        <ExerciseDataContext.Provider value={provider}>{children}</ExerciseDataContext.Provider>
    )

}