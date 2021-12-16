import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import auth from "./auth";

const Logout = ({ callbackFunction }) => {
  callbackFunction(false);
  const handleClick = () => {
    auth.logout();
  };
  return (
    <Fragment>
      <h1
        style={{
          marginBottom: "3rem",
          fontWeight: "bold",
          fontSize: 55,
        }}
      >
        Successfuly logged out.
      </h1>
      <Link to="/">
        <Button variant="contained" color="primary" onClick={handleClick}>
          Back Home
        </Button>
      </Link>
    </Fragment>
  );
};

export default Logout;
