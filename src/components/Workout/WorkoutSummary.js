import React, { useContext } from "react";
import { WorkoutDataContext } from "../../context/WorkoutDataContext";
import { ExerciseDataContext } from "../../context/ExerciseDataContext";
import { bodyPartData, bodyPartAreas } from "../../data/bodyPartData";

const WorkoutSummary = () => {
    const { selectedWorkout } = useContext(WorkoutDataContext);
    const { getExerciseById } = useContext(ExerciseDataContext);

    if (selectedWorkout.sets.length === 0) return null;

    return (
        <>
            <h5 className="mb-3">Targeted Body Part</h5>
            <ul>
                {bodyPartAreas.map((area) => {
                    let bodyAreaSets = selectedWorkout.sets.filter((element) => {
                        let exercise = getExerciseById(element.id);
                        return exercise.bodyParts.find(
                            (element) => element.area.id === area.id
                        );
                    });

                    if (bodyAreaSets.length === 0) return null;

                    let bodyPartDataForArea = bodyPartData.filter(
                        (element) => element.area.id === area.id
                    );

                    let bodyPartDetail = bodyPartDataForArea.map((bodyPart) => {
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
                    });

                    return (
                        <li className="m-2">
                            {area.name} ({bodyAreaSets.length})
                            <ul>
                                {bodyPartDetail}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default WorkoutSummary;
