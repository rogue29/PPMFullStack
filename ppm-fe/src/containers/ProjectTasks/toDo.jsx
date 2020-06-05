import React from "react";
import ProjectTask from "./ProjectTask/ProjectTask";

const toDo = props => {
  return (
    <div className="col-md-4">
      <div className="card text-center mb-2">
        <div className="card-header bg-secondary text-white">
          <h3>TO DO</h3>
        </div>
      </div>
      {props.tasks.map(task => {
        return <ProjectTask key={task.id} task={task} />;
      })}
    </div>
  );
};

export default toDo;
