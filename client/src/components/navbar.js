import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
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
    </ul>
  );
};

export default Navbar;
