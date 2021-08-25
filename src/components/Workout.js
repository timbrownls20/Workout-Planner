import React from 'react';

const Workout = ({workout}) => {
    return (
        <div className="card workout" key={workout.id}>
          <div className="card-body">
            <h5 className="card-title">{workout.description}</h5>
            <div className="card-text">No exercise sets</div>
          </div>
        </div>
      );
}

export default Workout;