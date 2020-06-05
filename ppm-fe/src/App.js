import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Header from "./containers/Header";
import Dashboard from "./containers/Dashboard";
import ProjectForm from "./containers/ProjectForm";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import store from "./store";
import UpdateForm from "./containers/UpdateForm";
import ProjectBoard from "./containers/ProjectBoard";
import AddProjectTask from "./containers/ProjectTasks/ProjectTask/AddProjectTask";
import UpdateProjectTask from "./containers/ProjectTasks/ProjectTask/UpdateProjectTask";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/newProject" exact component={ProjectForm} />
            <Route path="/updateProject/:id" component={UpdateForm} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/backlog/:id" exact component={ProjectBoard} />
            <Route
              path="/backlog/:id/newTask"
              exact
              component={AddProjectTask}
            />
            <Route
              path="/backlog/:projectIdentifier/:projectSequence"
              exact
              component={UpdateProjectTask}
            />
            <Route path="/" exact component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
