import React, { useContext, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FormState } from "../enums/enums";
import { ExerciseDataContext } from "../config/ExerciseDataContext";
import { FormStateContext } from "../config/FormStateContext";
import BodyPartList from "./BodyPartList";
import ExerciseForm from "./ExerciseForm";
import ExerciseList from "./ExerciseList";
import DebugPanel from "./DebugPanel";

const ExerciseManager = () => {
  const { setFormState } = useContext(FormStateContext);
  const {
    selectedExerciseId,
    selectedExercise,
    selectFirstExercise,
    addBodyPart,
    removeBodyPart,
    availableBodyPartsForSelection,
  } = useContext(ExerciseDataContext);

  useEffect(() => {
    if(!selectedExerciseId){
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <h3 className="p-2 mt-2">Workout Planner</h3>
          </div>
        </div>
        <hr />

        <div className="row">
          <div className="col-3 d-flex exercises-toolbar">
            <div>
              <FontAwesomeIcon
                icon={faPlusCircle}
                size="2x"
                onClick={() => setFormState(FormState.NEW)}
              />
            </div>
          </div>
          <div className="col-7 exercise-heading d-flex justify-content-center">
              <h5>{selectedExercise().name}</h5>
            </div>
        </div>

        <div className="row exercise-bodyparts">
          <ExerciseList></ExerciseList>
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
          <DebugPanel></DebugPanel>
        </div>
      </div>
      <ExerciseForm></ExerciseForm>
    </>
  );
};

export default ExerciseManager;
