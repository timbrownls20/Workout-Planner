import React, { useContext } from "react";
import { WorkoutDataContext } from "../context/WorkoutDataContext";
import { ExerciseDataContext } from "../context/ExerciseDataContext";
import { bodyPartData } from "../data/referenceData";

const WorkoutSummary = () => {
  const { selectedWorkout } = useContext(WorkoutDataContext);
  const { getExerciseById } = useContext(ExerciseDataContext);

  return (
    <>
      <h5 className="mb-3">Targeted Body Part</h5>
      <ul>
        {bodyPartData.map((bodyPart) => {
          let bodyPartSets = selectedWorkout.sets.filter((element) => {
            let exercise = getExerciseById(element.id);
            return exercise.bodyParts.find(
              (element) => element.id === bodyPart.id
            );
          });

          return bodyPartSets.length > 0 ? (
            <li className="m-2" key={bodyPart.id}>
              {bodyPart.area.name}: {bodyPart.name} ({bodyPartSets.length})
            </li>
          ) : null;
        })}
      </ul>
    </>
  );
};

export default WorkoutSummary;
