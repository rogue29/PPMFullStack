import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class ProjectTask extends Component {
  deleteTaskHandler = () => {
    if (window.confirm("Are you sure? This can't be undone!")) {
      this.props.deleteProjectTask(
        this.props.task.projectIdentifier,
        this.props.task.projectSequence
      );
    }
  };

  render() {
    const { task } = this.props;
    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary ${task.dynamicStyle}`}>
          {task.projectSequence} - {task.priority}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{task.summary}</h5>
          <p className="card-text text-truncate ">{task.acceptanceCriteria}</p>
          <Link
            to={`/backlog/${task.projectIdentifier}/${task.projectSequence}`}
            className="btn btn-primary">
            View / Update
          </Link>
          <button
            className="btn btn-danger ml-4"
            onClick={this.deleteTaskHandler}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteProjectTask: (projectIdentifier, projectSequence) =>
    dispatch(actions.deleteProjectTask(projectIdentifier, projectSequence)),
});

export default connect(null, mapDispatchToProps)(ProjectTask);
