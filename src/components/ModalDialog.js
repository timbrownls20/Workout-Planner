import React, { useContext } from "react";
import { FormState } from "../enums/enums";
import { FormStateContext } from "../context/FormStateContext";

const ModalDialog = ({ children, title, hide, save, remove, activationState }) => {
  const { formState } = useContext(FormStateContext);

  return (
    <div
      className={
        "modal" + ((activationState && formState === activationState) || (!activationState && formState !== FormState.UNDEFINED) ? " modal-show" : "")
      }
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={hide}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={save}>
              {formState === FormState.NEW ? "Add" : "Save"}
            </button>
            {formState === FormState.EDIT ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={remove}
              >
                Delete
              </button>
            ) : null}
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={hide}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDialog;
