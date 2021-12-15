import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// components
import Home from "./components/home";
import Error from "./components/error";
import Navbar from "./components/navbar";
import InputEmployee from "./components/inputEmployee";
import ListEmployees from "./components/listEmployee";
import Login from "./components/login";
import Logout from "./components/logout";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  const [state, setState] = useState(false);
  const callbackFunction = (data) => {
    setState(data);
  };
  return (
    <Fragment>
      <div className="container" style={{ marginTop: "5rem" }}>
        <Router>
          <Navbar userState={state} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/login"
              element={<Login callbackFunction={callbackFunction} />}
            />
            <Route
              path="/logout"
              element={<Logout callbackFunction={callbackFunction} />}
            />
            <Route path="/input" element={<ProtectedRoute route={"/input"} />}>
              <Route path="/input" element={<InputEmployee />} />
            </Route>
            <Route path="/list" element={<ProtectedRoute route={"/list"} />}>
              <Route path="/list" element={<ListEmployees />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </div>
    </Fragment>
  );
}

export default App;
