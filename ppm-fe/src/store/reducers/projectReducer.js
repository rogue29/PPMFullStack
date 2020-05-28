import * as actionTypes from "../actions/actionTypes";

const initialState = {
  errors: "",
  creatingProject: false,
  projects: [],
  project: {},
};

export const project = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PROJECT:
      return {
        ...state,
        errors: "",
        creatingProject: true,
      };
    case actionTypes.POST_PROJECT_SUCCESS:
      return {
        ...state,
        errors: "",
        creatingProject: false,
      };
    case actionTypes.POST_PROJECT_FAILURE:
      return { ...state, errors: action.payload };
    case actionTypes.STORE_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case actionTypes.STORE_PROJECT:
      return {
        ...state,
        project: action.payload,
      };
    case actionTypes.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          project => project.projectIdentifier !== action.payload
        ),
      };
    default:
      return state;
  }
};
