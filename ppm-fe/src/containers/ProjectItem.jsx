import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";

class ProjectItem extends Component {
  deleteProjectHandler = id => {
    if (
      window.confirm(
        "Are you sure you want to delete the complete Project? This can't be undone!"
      )
    ) {
      this.props.deleteProjectByIdentifier(id);
    }
  };

  render() {
    const { project } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <span className="mx-auto">{project.projectIdentifier}</span>
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{project.projectName}</h3>
            <p>{project.description}</p>
          </div>
          <div className="col-md-4 d-none d-lg-block">
            <ul className="list-group">
              <Link to={`/backlog/${project.projectIdentifier}`}>
                <li className="list-group-item board">Project Board</li>
              </Link>
              <Link to={`/updateProject/${project.projectIdentifier}`}>
                <li className="list-group-item update">Update Project Info</li>
              </Link>
              <li
                className="list-group-item delete"
                onClick={() =>
                  this.deleteProjectHandler(project.projectIdentifier)
                }>
                Delete Project
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteProjectByIdentifier: id => {
      dispatch(actions.deleteProjectByIdentifier(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(ProjectItem);
