import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./Main";
import Landing from "./Pages/Landing";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import axios from "axios";
import UserContext from "./Context/AuthedProfileContext";
import { AuthedProfileProvider } from "./Context/AuthedProfileContext";

function App() {
  axios.defaults.baseURL = `http://localhost:8080/api`;

  // const [user, setUser] = useState(null);

  // const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <Switch>
        <AuthedProfileProvider>
          {/* <UserContext.Provider value={value}> */}
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
          {/* </UserContext.Provider> */}

          <Route path="/" exact component={(props) => <Landing {...props} />} />
        </AuthedProfileProvider>
      </Switch>
    </Router>
  );
}

export default App;
