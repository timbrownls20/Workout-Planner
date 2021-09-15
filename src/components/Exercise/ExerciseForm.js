import React, { useState, useEffect, useContext } from "react";
import { FormState } from "../../enums/enums";
import { FormStateContext } from "../../context/FormStateContext";
import { ExerciseDataContext } from "../../context/ExerciseDataContext";
import ModalDialog from "../ModalDialog";

const ExerciseForm = () => {
  const { formState, setFormState } = useContext(FormStateContext);
  const {
    selectedExerciseId,
    selectedExercise,
    setSelectedExerciseId,
    addExercise,
    editExercise,
    removeExercise,
  } = useContext(ExerciseDataContext);

  const exercise = selectedExercise();
  const [name, setName] = useState(
    FormState.EDIT && exercise ? exercise.name : ""
  );

  const hide = () => {
    setFormState(FormState.UNDEFINED);
  };

  const add = (name) => {
    addExercise(name);
    setFormState(FormState.UNDEFINED);
    setSelectedExerciseId(null);
  };

  const edit = (id, name) => {
    editExercise(id, name);
    setFormState(FormState.UNDEFINED);
  };

  const remove = () => {
    removeExercise(selectedExerciseId);
    setFormState(FormState.UNDEFINED);
  };

  useEffect(() => {
    if (formState === FormState.NEW) {
      setName("");
    } else {
      setName(exercise ? exercise.name : null);
    }
  }, [exercise, formState]);

  const save = () => {
    if (formState === FormState.NEW && exercise) {
      add(name);
      setName("");
    } else if (formState === FormState.EDIT && exercise) {
      edit(exercise.id, name);
      setName("");
    }
  };

  return (
    <ModalDialog
      title={formState === FormState.NEW ? "Add Exercise" : "Edit Exercise"}
      save={save}
      hide={hide}
      remove={remove}
    >
      <form>
        <div className="form-group">
          <div className="form-text text-muted mb-2">Name</div>
          <input
            type="text"
            className="form-control"
            placeholder="enter exercise name"
            onChange={(e) => setName(e.target.value)}
            required
            value={name}
          ></input>
        </div>
      </form>
    </ModalDialog>
  );
};

export default ExerciseForm;
