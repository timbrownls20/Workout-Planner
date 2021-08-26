import React, {useContext} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { FormStateContext } from "../config/FormStateContext";
import { FormState } from "../enums/enums";


const WorkoutForm = () => {

    const { formState, setFormState } = useContext(FormStateContext);

return(<div
    className={
      "overlay container-fluid d-flex justify-content-center align-items-center" +
      (formState === FormState.EDIT ? " overlay-show" : "")
    }
  >
    <div className="d-flex justify-content-end">
      <FontAwesomeIcon
        icon={faWindowClose}
        size="2x"
        className="close"
        onClick={() => setFormState(FormState.UNDEFINED)}
      />
    </div>
  </div>)
}

export default WorkoutForm;