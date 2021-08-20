import React, { useContext, useState } from "react";
import { ExerciseDataContext } from "../config/ExerciseDataContext";
import { FormStateContext } from "../config/FormStateContext";
import { FormState } from "../enums/enums";
import config from "../config/config";

const ExerciseList = () => {
  const { setFormState } = useContext(FormStateContext);
  const { selectedExerciseId, setSelectedExerciseId, exerciseListPage } = useContext(ExerciseDataContext);
  const [page, setPage] = useState(1);

  return (
    <div className="col-3 exercise-list">
      <ul className="list-group">
        {exerciseListPage(page, config.PageSize).map((element) => {
          return (
            <li
              className={
                "list-group-item" +
                (selectedExerciseId === element.id ? " exercise-selected" : "")
              }
              id={element.id}
              key={element.id}
              onClick={(e) => setSelectedExerciseId(parseInt(e.target.id))}
              onDoubleClick={() => setFormState(FormState.EDIT)}
            >
              {element.name}
            </li>
          );
        })}
      </ul>
      <div className="d-flex justify-content-center">
        <button className="btn btn-link mt-2" onClick={() => setPage(page - 1)}>&lt;&lt;</button>
        <button className="btn btn-link mt-2" onClick={() => setPage(page + 1)}>&gt;&gt;</button>
      </div>
    </div>

  );
};

export default ExerciseList;
