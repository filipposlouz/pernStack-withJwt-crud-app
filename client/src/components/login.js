import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import Button from "@material-ui/core/Button";
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import auth from "./auth";

const Login = ({ callbackFunction }) => {
  const [userInputs, setUserInputs] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  let navigate = useNavigate();

  const handleClickShowPassword = () => {
    setUserInputs({ ...userInputs, showPassword: !userInputs.showPassword });
  };

  const handleMouseDownPassword = () => {
    setUserInputs({ ...userInputs, showPassword: !userInputs.showPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInputs.username && !userInputs.password) {
      return 0;
    } else {
      if (await auth.login(userInputs)) {
        callbackFunction(true);
        navigate(auth.getRoute().route);
      } else {
        navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInputs({ ...userInputs, [name]: value });
  };

  return (
    <Fragment>
      <h1 style={{ marginBottom: "2rem", fontWeight: "bold", fontSize: 55 }}>
        Login
      </h1>
      <div>
        <TextField
          type="text"
          fullWidth
          variant="filled"
          label="Username"
          name="username"
          id="username"
          value={userInputs.username}
          onChange={handleChange}
        />
      </div>
      <div
        style={{
          marginTop: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <FormControl variant="filled" fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <FilledInput
            type={userInputs.showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={userInputs.password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {userInputs.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "1.5rem" }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </div>
    </Fragment>
  );
};

export default Login;
