import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NavBar from "./NavBar";
import WorkoutManager from "./WorkoutManager";
import ExerciseManager from "./ExerciseManager";
import { ExerciseDataProvider } from "../context/ExerciseDataContext";
import { FormStateProvider } from "../context/FormStateContext";
import { WorkoutDataProvider } from "../context/WorkoutDataContext";

const App = () => {
  return (
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
  );
};

export default App;
