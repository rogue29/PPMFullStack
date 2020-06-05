import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";
import Backlog from "./Backlog";

class ProjectBoard extends Component {
  componentDidMount() {
    console.log("Project Board did mount");
    this.props.getProjectTasksByIdentifier(this.props.match.params.id);
  }

  render() {
    let projectBoard = "";
    const { projectTasks, errors } = this.props;
    if (projectTasks.length < 1) {
      if (Object.values(errors)[0]) {
        projectBoard = (
          <div className="alert alert-danger text-center">
            {Object.values(errors)[0]}
          </div>
        );
      } else {
        projectBoard = (
          <div className="alert alert-info text-center">
            No tasks yet. Start creating new tasks by clicking the button above!
          </div>
        );
      }
    } else {
      projectBoard = <Backlog projectTasks={projectTasks} />;
    }
    return (
      <div className="container">
        <Link
          to={`/backlog/${this.props.match.params.id}/newTask`}
          className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        {this.props.toast && (
          <div className="alert alert-info text-center">{this.props.toast}</div>
        )}
        {projectBoard}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projectTasks: state.projectTask.projectTasks,
  errors: state.projectTask.errors,
  toast: state.projectTask.toastAlert,
});

const mapDispatchtoProps = dispatch => {
  return {
    getProjectTasksByIdentifier: projectIdentifier => {
      dispatch(actions.getProjectTasksByIdentifier(projectIdentifier));
    },
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(ProjectBoard);
