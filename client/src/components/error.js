import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Error = () => {
  return (
    <Fragment>
      <h1 style={{ fontWeight: "bold", fontSize: 55, marginBottom: "1.5rem" }}>
        Error Page
      </h1>
      <Link to="/">
        <Button variant="contained" color="primary">
          Back Home
        </Button>
      </Link>
    </Fragment>
  );
};

export default Error;
