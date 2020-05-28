import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";

class ProjectForm extends Component {
  state = {
    projectName: "",
    projectIdentifier: "",
    description: "",
    start_date: "",
    end_date: "",
  };

  componentDidMount() {
    console.log("Project form did mount");
    this.props.createProject();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.creatingProject) {
      this.props.history.push("/dashboard");
    }
    return true;
  }

  postProjectHandler = event => {
    event.preventDefault();
    this.props.postProject(this.state);
  };

  inputChangedHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Project form</h5>
              <hr />
              <form>
                <div className="form-group">
                  <input
                    name="projectName"
                    value={this.state.projectName}
                    onChange={this.inputChangedHandler}
                    type="text"
                    className={
                      "form-control form-control-lg " +
                      (errors.projectName ? "is-invalid" : "")
                    }
                    placeholder="Project Name"
                  />
                  {errors.projectName && (
                    <div className="invalid-feedback d-block">
                      {errors.projectName}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    name="projectIdentifier"
                    value={this.state.projectIdentifier}
                    onChange={this.inputChangedHandler}
                    type="text"
                    className={
                      "form-control form-control-lg " +
                      (errors.projectIdentifier ? "is-invalid" : "")
                    }
                    placeholder="Unique Project ID"
                  />
                  {errors.projectIdentifier && (
                    <div className="invalid-feedback d-block">
                      {errors.projectIdentifier}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    name="description"
                    value={this.state.description}
                    className={
                      "form-control form-control-lg " +
                      (errors.description ? "is-invalid" : "")
                    }
                    onChange={this.inputChangedHandler}
                    placeholder="Project Description"></textarea>
                  {errors.description && (
                    <div className="invalid-feedback d-block">
                      {errors.description}
                    </div>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    name="start_date"
                    value={this.state.start_date}
                    onChange={this.inputChangedHandler}
                    type="date"
                    className="form-control form-control-lg"
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    name="end_date"
                    value={this.state.end_date}
                    onChange={this.inputChangedHandler}
                    type="date"
                    className="form-control form-control-lg"
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                  onClick={this.postProjectHandler}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.project.errors,
  creatingProject: state.project.creatingProject,
});

const mapDispatchToProps = dispatch => {
  return {
    postProject: project => dispatch(actions.postProject(project)),
    createProject: () => {
      dispatch(actions.createProject());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
