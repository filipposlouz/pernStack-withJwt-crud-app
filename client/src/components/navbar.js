import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import auth from "./auth";
import "./navbar.css";

const Navbar = (userState) => {
  const [state, setState] = useState(userState);
  console.log(auth.isAuthenticated());
  useEffect(() => {
    setState(auth.isAuthenticated());
  }, [state]);
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/list">Show/Edit Employees</Link>
      </li>
      <li>
        <Link to="/input">Add Employees</Link>
      </li>
      <li className="login">
        {state ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </li>
    </ul>
  );
};

export default Navbar;
