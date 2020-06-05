import { combineReducers } from "redux";
import { project } from "./projectReducer";
import { projectTask } from "./projectTaskReducer";
const rootReducer = combineReducers({ project, projectTask });

export default rootReducer;
