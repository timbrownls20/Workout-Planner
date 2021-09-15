import React, {useContext } from 'react';
import { FormStateContext } from '../../context/FormStateContext';
import { WorkoutDataContext } from '../../context/WorkoutDataContext';
import { FormState } from '../../enums/enums';

const Workout = ({workout}) => {

    const {setFormState} = useContext(FormStateContext);
    const {setSelectedWorkoutId } = useContext(WorkoutDataContext);

    function GetWorkoutExercises(){
      return workout.sets.reduce((acc, curr) =>{
        if(!acc.includes(curr.name)) acc.push(curr.name);
        return acc;
      }, []);
    }

    return (
        <div className="card workout" onClick={() => {
            setSelectedWorkoutId(workout.id);
            setFormState(FormState.EDIT);
          }}>
          <div className="card-body">
            <h5 className="card-title">{workout.name}</h5>
            <div className="card-text">
              <ul>
                {
                  GetWorkoutExercises().map(element => {
                    return <li key={element}>{element}</li>
                  } )
                }
                </ul>
            </div>
          </div>
        </div>
      );
}

export default Workout;