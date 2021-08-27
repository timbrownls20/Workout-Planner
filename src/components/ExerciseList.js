import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ExerciseDataContext } from "../context/ExerciseDataContext";
import { FormStateContext } from "../context/FormStateContext";
import { FormState } from "../enums/enums";
import config from "../data/config";

const ExerciseList = ({add}) => {
  const { setFormState } = useContext(FormStateContext);
  const {
    selectedExerciseId,
    setSelectedExerciseId,
    exerciseListPage,
    isLastPage,
  } = useContext(ExerciseDataContext);
  const [page, setPage] = useState(1);

  return (
    <div className="exercise-list d-flex flex-column justify-content-between">
      <ul className="list-group">
        {exerciseListPage(page, config.PageSize).map((element) => {
          return (
            <li
              className={
                "list-group-item d-flex justify-content-between align-items-center" +
                (selectedExerciseId === element.id ? " exercise-selected" : "")
              }
              id={element.id}
              key={element.id}
              onClick={(e) => {
                if(e.target.id) setSelectedExerciseId(parseInt(e.target.id))
              }}
              onDoubleClick={() => setFormState(FormState.EDIT)}
            >
              {element.name}
              {selectedExerciseId === element.id && add ? <FontAwesomeIcon icon={faPlus} onClick={add}></FontAwesomeIcon> : null}
            </li>
          );
        })}
      </ul>
      <div className="d-flex justify-content-center exercise-pager">
        <button className="btn btn-link mt-2" disabled={page === 1} onClick={() => setPage(page - 1)}>
          &lt;&lt;
        </button>
        <button className="btn btn-link mt-2" disabled={isLastPage(page, config.PageSize)} onClick={() => setPage(page + 1)}>
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default ExerciseList;
