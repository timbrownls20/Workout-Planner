import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { FormStateContext } from "../../context/FormStateContext";
import { FormState } from "../../enums/enums";

const ExerciseAddLink = () => {
  const { setFormState } = useContext(FormStateContext);

  return (
    <div
      className="col-3 d-flex exercises-toolbar"
      onClick={() => setFormState(FormState.NEW)}
    >
      <div>
        <FontAwesomeIcon icon={faPlusSquare} size="1x" />
      </div>
      <div>
        <small>Add new exercise</small>
      </div>
    </div>
  );
};

export default ExerciseAddLink;
