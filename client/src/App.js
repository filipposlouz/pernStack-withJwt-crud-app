import React, { Fragment } from "react";
import "./App.css";

// components
import InputEmployee from "./components/inputEmployee";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputEmployee />
      </div>
    </Fragment>
  );
}

export default App;
