import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./Main";
import Landing from "./Pages/Landing";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Header from "./Components/Header";
import axios from "axios";
import UserContext from "./Context/AuthedProfileContext";
import { AuthedProfileProvider } from "./Context/AuthedProfileContext";

function App() {
  console.log(process);
  axios.defaults.baseURL =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:3000/api";
  axios.defaults.withCredentials = true;

  return (
    <Router>
      <Switch>
        <AuthedProfileProvider>
          <Route
            path="/profile"
            component={(props) => <Profile {...props} />}
          />

          <Route path="/search" component={(props) => <Main {...props} />} />

          <Route
            path="/registration"
            exact
            component={(props) => <Registration {...props} />}
          />
          <Route
            path="/login"
            exact
            component={(props) => <Login {...props} />}
          />

          <Route path="/" exact component={(props) => <Landing {...props} />} />
        </AuthedProfileProvider>
      </Switch>
    </Router>
  );
}

export default App;
