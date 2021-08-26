import React, {useContext} from 'react';
import { FormStateContext } from '../context/FormStateContext';
import { FormState } from '../enums/enums';

const Workout = ({workout}) => {

    const {setFormState} = useContext(FormStateContext);

    return (
        <div className="card workout" onClick={() => setFormState(FormState.EDIT)}>
          <div className="card-body">
            <h5 className="card-title">{workout.description}</h5>
            <div className="card-text">No exercise sets</div>
          </div>
        </div>
      );
}

export default Workout;