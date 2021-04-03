import React from "react";
import "./styles/App.css";

import { Switch, Route } from "react-router-dom";
import Landing from "./screens/Landing";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Dashboard from "./screens/Dashboard";
import NoteForm from "./screens/NoteForm";
import Businesses from "./screens/Businesses";
import Decision from "./screens/Decision.";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/decision" component={Decision} />
      <Route exact path="/noteform" component={NoteForm} />
      <Route exact path="/businesses" component={Businesses} />
    </Switch>
  );
}

export default App;