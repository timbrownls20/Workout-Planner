import React, { useEffect } from "react";
import Workout from "./Workout";
import useWorkoutData from "../hooks/useWorkoutData";
import WorkoutForm from "./WorkoutForm";

const WorkoutManager = () => {
  const { workoutList, loadWorkouts } = useWorkoutData();

  useEffect(() => {
    loadWorkouts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            {workoutList.map((element) => {
              return <Workout workout={element} key={element.id}></Workout>;
            })}
          </div>
        </div>
      </div>
      <WorkoutForm />
    </>
  );
};

export default WorkoutManager;
