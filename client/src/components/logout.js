import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Logout = ({ callbackFunction }) => {
  callbackFunction(false);
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
        <Button variant="contained" color="primary">
          Back Home
        </Button>
      </Link>
    </Fragment>
  );
};

export default Logout;
