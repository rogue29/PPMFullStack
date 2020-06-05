import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const addProjectTask = () => {
  return {
    type: actionTypes.ADD_PROJECT_TASK,
  };
};

const addProjectTaskSuccess = () => {
  return {
    type: actionTypes.ADD_PROJECT_TASK_SUCCESS,
  };
};

const addProjectTaskFailure = data => {
  return {
    type: actionTypes.ADD_PROJECT_TASK_FAILURE,
    payload: data,
  };
};

export const createProjectTask = (projectTask, projectIdentifier) => {
  return dispatch => {
    console.log("Adding Project Task ", projectTask);
    axios
      .post(`/api/backlog/${projectIdentifier}`, projectTask)
      .then(res => {
        console.log("Add PT result ", res.data);
        dispatch(addProjectTaskSuccess());
      })
      .catch(err => {
        console.log(err.response.data);
        dispatch(addProjectTaskFailure(err.response.data));
      });
  };
};

const getProjectTasksSuccess = data => {
  return {
    type: actionTypes.GET_PROJECT_TASKS_SUCCESS,
    payload: data,
  };
};

const getProjectTasksFailure = data => {
  return {
    type: actionTypes.GET_PROJECT_TASKS_FAILURE,
    payload: data,
  };
};

export const getProjectTasksByIdentifier = projectIdentifier => {
  return dispatch => {
    axios
      .get(`/api/backlog/${projectIdentifier}`)
      .then(res => {
        // console.log("Get Project Tasks ", res.data);
        dispatch(getProjectTasksSuccess(res.data));
      })
      .catch(err => {
        console.log("Get Project Tasks ", err.response.data);
        dispatch(getProjectTasksFailure(err.response.data));
      });
  };
};

const storeProjectTask = data => {
  return {
    type: actionTypes.STORE_PROJECT_TASK,
    payload: data,
  };
};

export const getProjectTask = (projectIdentifier, projectSequence) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_PROJECT_TASK });
    axios
      .get(`/api/backlog/${projectIdentifier}/${projectSequence}`)
      .then(res => {
        // console.log("get PT res ", res.data);
        dispatch(storeProjectTask(res.data));
      })
      .catch(err => {
        console.log("get PT err ", err.response);
      });
  };
};

const patchProjectTaskSuccess = data => ({
  type: actionTypes.PATCH_PROJECT_TASK_SUCCESS,
  payload: data,
});

const patchProjectTaskFailure = data => ({
  type: actionTypes.PATCH_PROJECT_TASK_FAILURE,
  payload: data,
});

export const patchProjectTask = (
  projectIdentifier,
  projectSequence,
  projectTask
) => {
  return dispatch => {
    axios
      .patch(
        `/api/backlog/${projectIdentifier}/${projectSequence}`,
        projectTask
      )
      .then(res => {
        // console.log("patchProjectTask res ", res.data);
        dispatch(patchProjectTaskSuccess(res.data));
      })
      .catch(err => {
        console.log("patchProjectTask err ", err.response);
        dispatch(patchProjectTaskFailure(err.response.data));
      });
  };
};

const deleteProjectTaskSuccess = (data, PT) => ({
  type: actionTypes.DELETE_PROJECT_TASK_SUCCESS,
  payload: { data, PT },
});

const deleteProjectTaskFailure = data => ({
  type: actionTypes.DELETE_PROJECT_TASK_FAILURE,
  payload: data,
});

export const deleteProjectTask = (
  projectIdentifier,
  projectSequence
) => dispatch => {
  console.log("Delete project task - ", projectSequence);
  axios
    .delete(`/api/backlog/${projectIdentifier}/${projectSequence}`)
    .then(res => {
      console.log("Delete PT res ", res.data);
      dispatch(deleteProjectTaskSuccess(res.data, projectSequence));
    })
    .catch(err => {
      console.log("Delete PT err ", err.response);
      dispatch(deleteProjectTaskFailure(err.response.data));
    });
};
