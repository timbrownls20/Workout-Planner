import React, { useEffect, useContext } from "react";
import Workout from "./Workout";
import { WorkoutDataContext } from "../../context/WorkoutDataContext";
import WorkoutEditForm from "./WorkoutEditForm";
import WorkoutAddForm from "./WorkoutAddForm";

const WorkoutManager = () => {
  const { workoutList, loadWorkouts } = useContext(WorkoutDataContext);
  
  useEffect(() => {
    loadWorkouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mt-4">
        <div className="row">
          <WorkoutAddForm />
        </div>
        <div className="row">
          <div className="col-12 d-flex flex-wrap justify-content-center">
            {workoutList.map((element) => {
              return <Workout workout={element} key={element.id}></Workout>;
            })}
          </div>
        </div>
      </div>
      <WorkoutEditForm />
    </>
  );
};

export default WorkoutManager;
