import React, { useContext, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { ExerciseDataContext } from "../context/ExerciseDataContext";
import BodyPartList from "./BodyPartList";
import ExerciseForm from "./ExerciseForm";
import ExerciseList from "./ExerciseList";
import ExerciseAddLink from "./ExerciseAddLink";

const ExerciseManager = () => {
  const {
    selectedExerciseId,
    selectedExercise,
    selectFirstExercise,
    addBodyPart,
    removeBodyPart,
    availableBodyPartsForSelection,
  } = useContext(ExerciseDataContext);

  useEffect(() => {
    if (!selectedExerciseId) {
      selectFirstExercise();
    }
  }, [selectedExerciseId, selectFirstExercise]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    let draggedFrom = result.source.droppableId;
    let draggedTo = result.destination.droppableId;

    if (draggedFrom === "source" && draggedTo === "target") {
      addBodyPart(result.draggableId, selectedExerciseId);
    } else if (draggedFrom === "target" && draggedTo === "source") {
      removeBodyPart(result.draggableId, selectedExerciseId);
    }
  };

  return (
    <>
        <div className="row mt-4">
          <ExerciseAddLink></ExerciseAddLink>
          <div className="col-7 exercise-heading d-flex justify-content-center">
            <h5>{selectedExercise().name}</h5>
          </div>
        </div>

        <div className="row exercise-bodyparts">
          <div className="col-3">
            <ExerciseList></ExerciseList>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="source">
              {(provided, snapshot) => (
                <BodyPartList
                  isDraggingOver={snapshot.isDraggingOver}
                  provided={provided}
                  data={availableBodyPartsForSelection()}
                ></BodyPartList>
              )}
            </Droppable>
            <Droppable droppableId="target">
              {(provided, snapshot) => (
                <BodyPartList
                  isDraggingOver={snapshot.isDraggingOver}
                  provided={provided}
                  data={selectedExercise().bodyParts}
                ></BodyPartList>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      <ExerciseForm></ExerciseForm>
    </>
  );
};

export default ExerciseManager;
