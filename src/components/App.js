import React from "react";
import {Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NavBar from "./NavBar";
import WorkoutManager from "./WorkoutManager";
import ExerciseManager from "./ExerciseManager";
import { ExerciseDataProvider } from "../config/ExerciseDataContext";
import { FormStateProvider } from "../config/FormStateContext";

const App = () => {
  return (

    <Router>
      <NavBar/>
    <Switch>
      <Route exact path="/">
        <WorkoutManager />
      </Route>
      <Route path="/exercise">
        <ExerciseDataProvider>
          <FormStateProvider>
            <ExerciseManager></ExerciseManager>
          </FormStateProvider>
        </ExerciseDataProvider>

      </Route>
    </Switch>
    </Router>
  );
};

export default App;
