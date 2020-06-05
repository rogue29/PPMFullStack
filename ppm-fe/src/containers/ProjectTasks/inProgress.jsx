import React from "react";
import ProjectTask from "./ProjectTask/ProjectTask";

const inProgress = props => {
  return (
    <div className="col-md-4">
      <div className="card text-center mb-2">
        <div className="card-header bg-primary text-white">
          <h3>In Progress</h3>
        </div>
      </div>
      {props.tasks.map(task => {
        return <ProjectTask key={task.id} task={task} />;
      })}
    </div>
  );
};

export default inProgress;
