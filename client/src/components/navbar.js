import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ userState }) => {
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
        {userState ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </li>
    </ul>
  );
};

export default Navbar;
