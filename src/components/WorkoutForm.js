import React, { useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { FormStateContext } from "../context/FormStateContext";
import { WorkoutDataContext } from "../context/WorkoutDataContext";
import { ExerciseDataContext } from "../context/ExerciseDataContext";
import { FormState } from "../enums/enums";
import ExerciseList from "./ExerciseList";
import WorkoutExercise from "./WorkoutExercise";
import config from "../data/config";

const WorkoutForm = () => {
  const { formState, setFormState } = useContext(FormStateContext);
  const { selectedWorkout, addExercise, reorderExercise } = useContext(WorkoutDataContext);
  const { selectedExercise } = useContext(ExerciseDataContext);

  const onDragEnd = (result) => {
    reorderExercise(selectedWorkout.id, result.draggableId, result.destination.index);
  }

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
            <h3>{selectedWorkout ? selectedWorkout.description : ""}</h3>
          </div>
          <div className="col-1 d-flex justify-content-end">
            <FontAwesomeIcon
              icon={faWindowClose}
              size="2x"
              className="close"
              onClick={() => setFormState(FormState.UNDEFINED)}
            />
          </div>
        </div>
        <div className="row workout-form-body gx-0">
          <div className="col-3 ">
            <ExerciseList add={add} />
          </div>
          <div className="col-3 d-flex justify-content-center mt-4">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="source">
                {(provided, snapshot) => (
                  <ul className="list-group"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {selectedWorkout.sets.map((exercise, index) => (

                      <Draggable
                        draggableId={index.toString()}
                        key={index}
                        index={index}
                      >
                        {
                          provided => (
                            <WorkoutExercise
                              workoutId={selectedWorkout.id} 
                              exercise={exercise} 
                              provided={provided} 
                              index={index}
                              />
                          )
                        }
                      </Draggable>

                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          {config.Debug ? (
            <div className="col-3 d-flex justify-content-center mt-4">
              <code>{JSON.stringify(selectedWorkout)}</code>
            </div>
          ) : null
          }
        </div>
      </div>
    </div>
  );
};

export default WorkoutForm;
