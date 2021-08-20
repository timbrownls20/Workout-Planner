import React from "react";
import { Draggable } from "react-beautiful-dnd";
import BodyPart from "./BodyPart";

const BodyPartList = ({ provided, data, isDraggingOver }) => {

  data = data.sort(bodyPartSort);

  return (
    <div
      className={
        "col-3 droppable d-flex flex-wrap align-content-start " +
        (isDraggingOver ? "dragover" : "")
      }
      ref={provided.innerRef}
      {...provided.droppableProps}
    >
      {data.map((element, index) => {
        return (
          <Draggable
            draggableId={element.id.toString()}
            key={element.id}
            index={index}
          >
            {provided => (
              <div>
                <BodyPart text={`${element.area.name}: ${element.name}`} provided={provided}></BodyPart>
              </div>
            )}
          </Draggable>
        );
      })}
      {provided.placeholder}
    </div>
  );
};

export default BodyPartList;


const bodyPartSort = (a, b) => {

  if(a.area.id > b.area.id){
    return 1;
  }
  else if(a.area.id < b.area.id){
    return -1;
  }
  else if(a.area.id === b.area.id){
    return 0;
  }
}
