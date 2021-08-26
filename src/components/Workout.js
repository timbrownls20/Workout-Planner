import React, {useContext} from 'react';
import { FormStateContext } from '../context/FormStateContext';
import { WorkoutDataContext } from '../context/WorkoutDataContext';
import { FormState } from '../enums/enums';

const Workout = ({workout}) => {

    const {setFormState} = useContext(FormStateContext);
    const {setSelectedWorkoutId } = useContext(WorkoutDataContext);

    return (
        <div className="card workout" onClick={() => {
            setSelectedWorkoutId(workout.id);
            setFormState(FormState.EDIT);
          }}>
          <div className="card-body">
            <h5 className="card-title">{workout.description}</h5>
            <div className="card-text">No exercise sets</div>
          </div>
        </div>
      );
}

export default Workout;