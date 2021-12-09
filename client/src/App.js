import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// components
import Home from "./components/home";
import Error from "./components/error";
import Navbar from "./components/navbar";
import InputEmployee from "./components/inputEmployee";
import ListEmployees from "./components/listEmployee";

function App() {
  return (
    <Fragment>
      <div className="container">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/input" element={<InputEmployee />} />
            <Route path="/list" element={<ListEmployees />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </div>
    </Fragment>
  );
}

export default App;
