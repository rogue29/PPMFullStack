import * as actionTypes from "../actions/actionTypes";

const initialState = {
  projectTasks: [],
  projectTask: {},
  errors: {},
  creatingProjectTask: false,
  toastAlert: "",
};

export const projectTask = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PROJECT_TASK:
      return {
        ...state,
        errors: {},
        creatingProjectTask: true,
      };
    case actionTypes.ADD_PROJECT_TASK_SUCCESS:
      return {
        ...state,
        errors: {},
        creatingProjectTask: false,
      };
    case actionTypes.ADD_PROJECT_TASK_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };
    case actionTypes.GET_PROJECT_TASKS_SUCCESS:
      return {
        ...state,
        projectTasks: action.payload,
        toastAlert: "",
      };
    case actionTypes.GET_PROJECT_TASKS_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };
    case actionTypes.GET_PROJECT_TASK:
      return {
        ...state,
        errors: {},
        creatingProjectTask: true,
      };
    case actionTypes.STORE_PROJECT_TASK:
      return {
        ...state,
        projectTask: action.payload,
      };
    case actionTypes.PATCH_PROJECT_TASK_SUCCESS:
      return {
        ...state,
        projectTask: action.payload,
        errors: {},
        creatingProjectTask: false,
      };
    case actionTypes.PATCH_PROJECT_TASK_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };
    case actionTypes.DELETE_PROJECT_TASK_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        toastAlert: action.payload.data,
        projectTasks: state.projectTasks.filter(
          PT => PT.projectSequence !== action.payload.PT
        ),
      };
    default:
      return state;
  }
};
