import React, { Fragment, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import auth from "./auth";
import Navbar from "./navbar";

const Login = () => {
  const [userInputs, setUserInputs] = useState({
    username: "",
    password: "",
  });
  const [userState, setUserState] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await auth.login(userInputs)) {
      setUserState(true);
      navigate(auth.getRoute().route);
    } else {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInputs({ ...userInputs, [name]: value });
  };

  return (
    <Fragment>
      {/* <Navbar userState={userState} /> */}
      <h1>Login</h1>
      <div style={{ whiteSpace: "nowrap" }}>
        <h4
          style={{
            marginTop: "1rem",
            marginRight: "2rem",
            display: "inline-block",
            float: "left",
          }}
        >
          Username:
        </h4>
        <input
          type="text"
          className="form-control"
          style={{ display: "inline-block" }}
          name="username"
          id="username"
          value={userInputs.username}
          onChange={handleChange}
        />
      </div>
      <div style={{ whiteSpace: "nowrap" }}>
        <h4
          style={{
            marginTop: "1rem",
            marginRight: "2.3rem",
            display: "inline-block",
            float: "left",
          }}
        >
          Password:
        </h4>
        <input
          type="text"
          className="form-control"
          style={{ display: "inline-block" }}
          name="password"
          id="password"
          value={userInputs.password}
          onChange={handleChange}
        />
      </div>
      <button className="btn mt-2" onClick={handleSubmit}>
        Login
      </button>
    </Fragment>
  );
};

export default Login;
