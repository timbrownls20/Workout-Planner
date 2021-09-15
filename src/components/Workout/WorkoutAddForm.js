import React, { useState, useContext } from "react";
import { FormState } from "../../enums/enums";
import { FormStateContext } from "../../context/FormStateContext";
import { WorkoutDataContext } from "../../context/WorkoutDataContext";

const WorkoutAddForm = () => {
  const { setFormState } = useContext(FormStateContext);
  const { addWorkout } = useContext(WorkoutDataContext);

  const [name, setName] = useState("");

  const save = () => {
    addWorkout(name);
    setFormState(FormState.UNDEFINED);
    setName("");
    
  };

  return (
    <form className="d-flex">
      <div className="form-group mx-sm-3 mb-2">
        
        <input
          type="text"
          className="form-control"
          placeholder="enter workout name"
          onChange={(e) => setName(e.target.value)}
          required
          value={name}
        ></input>
      </div>

      <button type="button" className="btn btn-primary mb-2" onClick={save}>
        Add
      </button>
    </form>
  );
};

export default WorkoutAddForm;
