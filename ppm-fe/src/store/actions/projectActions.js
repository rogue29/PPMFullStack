import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const createProject = () => {
  return {
    type: actionTypes.CREATE_PROJECT,
  };
};

const postProjectSuccess = () => {
  return {
    type: actionTypes.POST_PROJECT_SUCCESS,
  };
};

const postProjectFailure = data => {
  return {
    type: actionTypes.POST_PROJECT_FAILURE,
    payload: data,
  };
};

export const postProject = project => {
  return dispatch => {
    console.log("creating project", project);
    axios
      .post("/api/project", project)
      .then(res => {
        console.log("create project res", res.data);
        dispatch(postProjectSuccess());
      })
      .catch(err => {
        console.log("create project err", err);
        dispatch(postProjectFailure(err.response.data));
      });
  };
};

const storeProjects = projects => {
  return {
    type: actionTypes.STORE_PROJECTS,
    payload: projects,
  };
};

export const getAllProjects = () => {
  return dispatch => {
    console.log("get all projects");
    axios
      .get("/api/project/all")
      .then(res => {
        console.log("get all projects res ", res.data);
        dispatch(storeProjects(res.data));
      })
      .catch(err => {
        console.log("get all projects err ", err);
      });
  };
};

const storeProject = project => {
  return {
    type: actionTypes.STORE_PROJECT,
    payload: project,
  };
};

export const getProject = id => {
  return dispatch => {
    dispatch(createProject());
    console.log("Get project ", id);
    axios
      .get(`/api/project/${id}`)
      .then(res => {
        console.log("get project res ", res.data);
        dispatch(storeProject(res.data));
      })
      .catch(err => {
        console.log("get project err ", err);
      });
  };
};

const deleteProject = id => ({
  type: actionTypes.DELETE_PROJECT,
  payload: id,
});

export const deleteProjectByIdentifier = id => {
  return dispatch => {
    console.log("Delete project ", id);
    axios
      .delete(`/api/project/${id}`)
      .then(res => {
        console.log("Delete project res ", res.data);
        dispatch(deleteProject(id));
      })
      .catch(err => {
        console.log("Delete project err ", err);
      });
  };
};
