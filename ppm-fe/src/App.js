import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Header from "./containers/Header";
import Dashboard from "./containers/Dashboard";
import ProjectForm from "./containers/ProjectForm";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import store from "./store";
import UpdateForm from "./containers/UpdateForm";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/newProject" exact component={ProjectForm} />
          <Route path="/updateProject/:id" component={UpdateForm} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Dashboard} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
