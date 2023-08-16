import React, { useState } from "react";
import "../Login/index.css";
import eyelogo from "../../Assets/Images/eye_logo.png";
import { Register } from "../../Services/Auth";
import APP_ROLES from "../../SharedComponents/role";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
      "Password must contain at least 8 characters with one alphabet, one digit and one special character"
    )
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  repeatPassword: yup
    .string()
    .required("Repeat password is required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

export const SignupElements = ({ role }) => {
  const [city_id, setCity] = useState("6");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigationURL = useNavigate();

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const RegisterAsFleetManager = async (values) => {
    try {
      const payload = JSON.stringify({ ...values, city_id });
      const res = await Register(APP_ROLES.FLEET_MANAGER, payload);
      if (+res?.code === 200) {
        // Handle success
        localStorage.setItem("token", res?.data?.token);
        setSnackbarSeverity("success");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
        navigationURL("/profile");
      } else if (+res?.code !== 200) {
        setSnackbarSeverity("error");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
      }
    } catch (error) {
      // Handle error
      setSnackbarSeverity("error");
      setSnackbarMessage(error?.message);
      setSnackbarOpen(true);
    }
  };
  const navigateToLogin = (url) => {
    return navigationURL(url);
  };
  const RegisterAsAdmin = async (values) => {
    try {
      const payload = JSON.stringify({ ...values, city_id });
      const res = await Register(APP_ROLES.ADMIN, payload);
      if (+res?.code === 200) {
        // Handle success
        localStorage.setItem("token", res?.data?.token);
        setSnackbarSeverity("success");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
        navigationURL("/superadmin/profile");
      } else if (+res?.code !== 200) {
        setSnackbarSeverity("error");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
      }
    } catch (error) {
      // Handle error
      setSnackbarSeverity("error");
      setSnackbarMessage(error?.message);
      setSnackbarOpen(true);
    }
  };
  const handleRegister = (values) => {
    if (role === APP_ROLES.ADMIN) {
      RegisterAsAdmin(values);
    } else {
      RegisterAsFleetManager(values);
    }
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      city_id: "1",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleRegister(values);
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="card">
      <h1>Sign Up</h1>
      <p>
        Enter your account details below or{" "}
        <span>
          {role === APP_ROLES.ADMIN ? (
            <Button onClick={() => navigateToLogin("/superadmin/login")}>
              login
            </Button>
          ) : (
            <Button onClick={() => navigateToLogin("/login")}>login</Button>
          )}
        </span>
      </p>

      <form className="login-form" onSubmit={formik.handleSubmit}>
        <TextField
          className="email-box"
          fullWidth
          id="username"
          name="username"
          label="Name"
          placeholder="Enter your name"
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          className="email-box"
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          className="password-box"
          fullWidth
          id="password"
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment
                style={{ width: "auto", marginRight: "10px", border: "none" }}
                position="end"
              >
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          className="password-box"
          id="repeatPassword"
          name="repeatPassword"
          label="Repeat Password"
          type="password"
          placeholder="Repeat your password"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.repeatPassword &&
            Boolean(formik.errors.repeatPassword)
          }
          helperText={
            formik.touched.repeatPassword && formik.errors.repeatPassword
          }
        />
        <div className="remember-forgot-pre">
          <div className="remember-forgot">
            <div className="rememberMe">
              <input
                type="radio"
                id="rememberMe"
                name="rememberMe"
                value="rememberMe"
              />
              <label htmlFor="rememberMe">
                I agree to the <span>term of service</span> &{" "}
                <span>privacy</span>
              </label>
            </div>
          </div>
        </div>
        <div className="linkbtn">
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            className="btn btn-primary"
          >
            <span className="login-text">Signup</span>
          </Button>
        </div>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbarSeverity} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
