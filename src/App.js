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
  axios.defaults.baseURL = `${process.env.BACKEND_URL}`;
  //axios.defaults.withCredentials = true;
  // const [user, setUser] = useState(null);

  // const value = useMemo(() => ({ user, setUser }), [user, setUser]);

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
