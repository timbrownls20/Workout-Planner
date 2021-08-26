import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NavBar from "./NavBar";
import WorkoutManager from "./WorkoutManager";
import ExerciseManager from "./ExerciseManager";
import { ExerciseDataProvider } from "../context/ExerciseDataContext";
import { FormStateProvider } from "../context/FormStateContext";

const App = () => {


  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <FormStateProvider>
            <WorkoutManager />
          </FormStateProvider>
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
