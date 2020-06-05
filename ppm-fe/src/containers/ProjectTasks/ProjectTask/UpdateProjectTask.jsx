import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/actions";
import moment from "moment";

class UpdateProjectTask extends Component {
  state = {
    id: "",
    projectSequence: this.props.match.params.projectSequence,
    summary: "",
    acceptanceCriteria: "",
    status: "",
    priority: "",
    dueDate: "",
    projectIdentifier: this.props.match.params.projectIdentifier,
  };

  componentDidMount() {
    console.log("Update PT did mount");
    this.props.getProjectTask(
      this.props.match.params.projectIdentifier,
      this.props.match.params.projectSequence
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.creatingProjectTask) {
      this.props.history.push(`/backlog/${this.state.projectIdentifier}`);
    }
    return true;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.projectTask.id && props.projectTask.id !== state.id) {
      console.log("getDerivedStateFromProps is updating state");
      let {
        id,
        summary,
        acceptanceCriteria,
        status,
        priority,
        dueDate,
      } = props.projectTask;
      if (dueDate == null) {
        dueDate = "";
      } else {
        dueDate = moment(dueDate).format("YYYY-MM-DD");
      }
      return {
        id,
        summary,
        acceptanceCriteria,
        status,
        priority,
        dueDate,
      };
    }
    return null;
  }

  onSubmitHandler = e => {
    e.preventDefault();
    const projectTask = {
      id: this.state.id,
      projectSequence: this.state.projectSequence,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      projectIdentifier: this.state.projectIdentifier,
    };
    this.props.patchProjectTask(
      this.state.projectIdentifier,
      this.state.projectSequence,
      projectTask
    );
  };

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  backToProjectBoardHandler = () =>
    this.props.history.push(`/backlog/${this.state.projectIdentifier}`);

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

              <h4 className="display-4 text-center">Update Project Task</h4>
              <p className="lead text-center">{this.state.projectSequence}</p>
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

const mapStateToProps = state => ({
  projectTask: state.projectTask.projectTask,
  errors: state.projectTask.errors,
  creatingProjectTask: state.projectTask.creatingProjectTask,
});

const mapDispatchToProps = dispatch => ({
  getProjectTask: (projectIdentifier, projectSequence) => {
    dispatch(actions.getProjectTask(projectIdentifier, projectSequence));
  },
  patchProjectTask: (projectIdentifier, projectSequence, projectTask) =>
    dispatch(
      actions.patchProjectTask(projectIdentifier, projectSequence, projectTask)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProjectTask);
