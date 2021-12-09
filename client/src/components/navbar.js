import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <ul>
      <li>
        <Link className="a" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="a" to="/list">
          Show/Edit Employees
        </Link>
      </li>
      <li>
        <Link className="a" to="/input">
          Add Employees
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
