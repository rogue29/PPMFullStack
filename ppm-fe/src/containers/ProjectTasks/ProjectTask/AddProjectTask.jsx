import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";

class AddProjectTask extends Component {
  state = {
    summary: "",
    acceptanceCriteria: "",
    status: "",
    priority: 0,
    dueDate: "",
  };

  componentDidMount() {
    console.log("AddProjectTask did mount");
    this.props.addProjectTask();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.creatingProjectTask) {
      this.props.history.push(`/backlog/${this.props.match.params.id}`);
    }
    return true;
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const projectTask = {
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
    };
    this.props.createProjectTask(projectTask, this.props.match.params.id);
  };

  backToProjectBoardHandler = () => {
    this.props.history.goBack();
  };

  render() {
    const { errors } = this.props;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <button
                className="btn btn-light"
                onClick={this.backToProjectBoardHandler}>
                Back to Project Board
              </button>

              <h4 className="display-4 text-center">Add Project Task</h4>
              <p className="lead text-center">
                New Task for Project : {this.props.match.params.id}
              </p>
              <form onSubmit={this.onSubmitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    className={
                      "form-control form-control-lg " +
                      (errors.summary ? "is-invalid" : "")
                    }
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange={this.onChangeHandler}
                  />
                  {errors.summary && (
                    <div className="invalid-feedback d-block">
                      {errors.summary}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChangeHandler}
                  />
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChangeHandler}>
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChangeHandler}>
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.projectTask.errors,
    creatingProjectTask: state.projectTask.creatingProjectTask,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProjectTask: (projectTask, projectIdentifier) => {
      dispatch(actions.createProjectTask(projectTask, projectIdentifier));
    },
    addProjectTask: () => {
      dispatch(actions.addProjectTask());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectTask);
