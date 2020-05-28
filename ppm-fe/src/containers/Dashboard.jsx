import React, { Component } from "react";
import * as actions from "../store/actions/actions";
import { connect } from "react-redux";
import ProjectItem from "./ProjectItem";

class Dashboard extends Component {
  componentDidMount() {
    console.log("Dashboard did mount");
    this.props.getAllProjects();
  }

  createProjectHandler = () => {
    this.props.history.push("/newProject");
  };

  render() {
    const { projects } = this.props;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
              <button
                className="btn btn-lg btn-info"
                onClick={this.createProjectHandler}>
                Create a Project
              </button>
              <br />
              <hr />

              <div className="container">
                {projects.map(project => {
                  return <ProjectItem key={project.id} project={project} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.project.projects,
});

const mapDispatchToProps = dispatch => {
  return {
    getAllProjects: () => {
      dispatch(actions.getAllProjects());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
