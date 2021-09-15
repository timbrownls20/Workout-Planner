import React, { useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FormStateContext } from "../../context/FormStateContext";
import { WorkoutDataContext } from "../../context/WorkoutDataContext";
import { ExerciseDataContext } from "../../context/ExerciseDataContext";
import { FormState } from "../../enums/enums";
import ExerciseList from "../Exercise/ExerciseList";
import WorkoutExercise from "./WorkoutExercise";
import WorkoutSummary from "./WorkoutSummary";
import config from "../../data/config";

const WorkoutEditForm = () => {
  const { formState, setFormState } = useContext(FormStateContext);
  const { selectedWorkout, addExercise, reorderExercise } =
    useContext(WorkoutDataContext);
  const { selectedExercise } = useContext(ExerciseDataContext);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderExercise(
      selectedWorkout.id,
      result.draggableId,
      result.destination.index
    );
  };

  const add = () => {
    addExercise(selectedWorkout.id, selectedExercise());
  };

  return (
    <div
      className={
        "overlay d-flex justify-content-center align-items-center" +
        (formState === FormState.EDIT ? " overlay-show" : "")
      }
    >
      <div className="overlay-inner">
        <div className="row workout-form-header gx-0">
          <div className="col-11 d-flex justify-content-center mt-4">
            <h3>{selectedWorkout ? selectedWorkout.name : ""}</h3>
          </div>
          <div className="col-1 d-flex justify-content-end align-items-start">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => setFormState(FormState.UNDEFINED)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <div className="row workout-form-body gx-0">
          <div className="col-3 ">
            <ExerciseList add={add} />
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="source">
              {(provided) => (
                <div
                  className="col-7 mt-4 workout-exercise-list d-flex flex-column flex-wrap align-content-start"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {selectedWorkout.sets.map((exercise, index) => (
                    <Draggable
                      draggableId={index.toString()}
                      key={index}
                      index={index}
                    >
                      {(provided) => (
                        <WorkoutExercise
                          workoutId={selectedWorkout.id}
                          exercise={exercise}
                          provided={provided}
                          index={index}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="col-2 mt-4">
            <WorkoutSummary />
          </div>
          {config.Debug ? (
            <div className="col-3 d-flex justify-content-center mt-4">
              <code>{JSON.stringify(selectedWorkout)}</code>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default WorkoutEditForm;
