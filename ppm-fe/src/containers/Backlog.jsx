import React, { Component } from "react";
import tasksUtil from "../util/tasksUtil";
import ToDo from "./ProjectTasks/toDo";
import InProgress from "./ProjectTasks/inProgress";
import Done from "./ProjectTasks/done";

class Backlog extends Component {
  render() {
    const [toDoTasks, inProgressTasks, doneTasks] = tasksUtil(
      this.props.projectTasks
    );
    return (
      <div className="container">
        <div className="row">
          <ToDo tasks={toDoTasks} />
          <InProgress tasks={inProgressTasks} />
          <Done tasks={doneTasks} />
        </div>
      </div>
    );
  }
}

export default Backlog;
