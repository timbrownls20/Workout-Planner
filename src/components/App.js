import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NavBar from "./NavBar";
import WorkoutManager from "./Workout/WorkoutManager";
import ExerciseManager from "./Exercise/ExerciseManager";
import { ExerciseDataProvider } from "../context/ExerciseDataContext";
import { FormStateProvider } from "../context/FormStateContext";
import { WorkoutDataProvider } from "../context/WorkoutDataContext";

const App = () => {
  return (
    <div className="container-fluid">
      <Router>
        <NavBar />
        <ExerciseDataProvider>
          <Switch>
            <Route exact path="/">
              <WorkoutDataProvider>
                <FormStateProvider>
                  <WorkoutManager />
                </FormStateProvider>
              </WorkoutDataProvider>
            </Route>
            <Route path="/exercise">
              <FormStateProvider>
                <ExerciseManager></ExerciseManager>
              </FormStateProvider>
            </Route>
          </Switch>
        </ExerciseDataProvider>
      </Router>
    </div>
  );
};

export default App;
