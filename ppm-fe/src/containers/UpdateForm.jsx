import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/actions";

class UpdateForm extends Component {
  state = {
    id: "",
    projectName: "",
    projectIdentifier: "",
    description: "",
    start_date: "",
    end_date: "",
  };

  componentDidMount() {
    console.log("Update form did mount : state ", this.state);
    this.props.getProject(this.props.match.params.id);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.creatingProject) {
      this.props.history.push("/dashboard");
    }
    return true;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.project.id && props.project.id !== state.id) {
      console.log("getDerivedStateFromProps is updating state");
      let {
        id,
        projectName,
        projectIdentifier,
        description,
        start_date,
        end_date,
      } = props.project;
      if (start_date == null) start_date = "";
      if (end_date == null) end_date = "";
      return {
        id,
        projectName,
        projectIdentifier,
        description,
        start_date,
        end_date,
      };
    }
    return null;
  }

  inputChangedHandler = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.updateProject(this.state);
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Edit Project form</h5>
              <hr />
              <form onSubmit={this.onSubmitHandler}>
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
                    disabled
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
  project: state.project.project,
  errors: state.project.errors,
  creatingProject: state.project.creatingProject,
});

const mapDispatchToProps = dispatch => {
  return {
    getProject: id => {
      dispatch(actions.getProject(id));
    },
    updateProject: project => {
      dispatch(actions.postProject(project));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateForm);
