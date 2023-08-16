import React, { useState } from "react";
import "./index.css";
import logo from "../../Assets/Images/logo-w.png";
import APP_ROLES from "../../SharedComponents/role";
import { GoogleLogin, Login, FacebookLogin } from "../../Services/Auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link, useNavigate } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { makeStyles } from "@material-ui/core";
import { CustomTextField } from "./customTextField";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const useStyles = makeStyles({
  outlinedInput: {
    borderRadius: "20px", // Adjust the value as per your preference
  },
  inputLabel: {
    padding: 0, // Remove padding around the label
  },
});

export const LoginElements = ({ role, setToken }) => {
  localStorage.setItem("role", role);
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  const firebaseConfig = {
    apiKey: "AIzaSyAj0mGv2HyBoxbDFOKVJCldDdhB8JDTA-Y",
    authDomain: "pnpauth.firebaseapp.com",
    projectId: "pnpauth",
    storageBucket: "pnpauth.appspot.com",
    messagingSenderId: "215625149961",
    appId: "1:215625149961:web:b509938a7802ffd46f92d8",
    measurementId: "G-2CBFFM1X7H",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const handleSignInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      const res = await firebase.auth().signInWithPopup(provider);
      const tkn = await res.user.getIdToken();
      const validated = await GoogleLogin(role, JSON.stringify({ token: tkn }));
      if (validated) {
        // Handle successful login
        setData(validated);
      }
    } catch (error) {}
  };

  const handleSignInWithFacebook = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();

    try {
      const res = await firebase.auth().signInWithPopup(provider);
      const tkn = await res.user.getIdToken();
      const validated = await FacebookLogin(
        role,
        JSON.stringify({ token: tkn })
      );
      if (validated) {
        // Handle successful login
        setData(validated);
      }
    } catch (error) {}
  };

  const LoginFleetManager = async (values) => {
    try {
      const payload = JSON.stringify(values);
      const res = await Login(APP_ROLES.FLEET_MANAGER, payload);
      if (+res?.code === 200) {
        // Handle success
        localStorage.setItem("token", res?.data?.token);
        setSnackbarSeverity("success");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
        setIsLoggedIn(APP_ROLES.FLEET_MANAGER);
        setToken(res?.data?.token);
        navigationURL("/home");
      } else if (+res?.code !== 200) {
        setSnackbarSeverity("error");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
        setIsLoggedIn(false);
      }
    } catch (error) {
      // Handle error
      setSnackbarSeverity("error");
      setSnackbarMessage(error?.message);
      setSnackbarOpen(true);
      setIsLoggedIn(false);
    }
  };
  const LoginAdmin = async (values) => {
    try {
      const payload = JSON.stringify(values);
      const res = await Login(APP_ROLES.ADMIN, payload);
      if (+res?.code === 200) {
        // Handle success
        localStorage.setItem("token", res?.data?.token);
        setSnackbarSeverity("success");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
        setIsLoggedIn(APP_ROLES.ADMIN);
        navigationURL("/superadmin/home");
      } else if (+res?.code !== 200) {
        setSnackbarSeverity("error");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
        setIsLoggedIn(false);
      }
    } catch (error) {
      // Handle error
      setSnackbarSeverity("error");
      setSnackbarMessage(error?.message);
      setSnackbarOpen(true);
      setIsLoggedIn(false);
    }
  };
  const navigateToRegister = (url) => {
    return navigationURL(url);
  };
  const webLogin = (values) => {
    if (role === APP_ROLES.ADMIN) {
      LoginAdmin(values);
    } else {
      LoginFleetManager(values);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      webLogin(values);
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const classes = useStyles();

  return (
    <div>
      <div class="formwrap ">
        <div class="left-position">
          {role === APP_ROLES.ADMIN && (
            <AppBar position="fixed" color="default" style={{ top: 0 }}>
              <Toolbar style={{ justifyContent: "center" }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flex: 1, textAlign: "center" }}
                >
                  Admin Portal
                </Typography>
              </Toolbar>
            </AppBar>
          )}

          <div class="image d-flex align-items-center">
            <img src={logo} alt="" />
          </div>
        </div>
        <div class="right-position d-flex align-items-center">
          <div class="container">
            <div class="row">
              <div class="form-group">
                <form
                  className="form-bg"
                  action=""
                  autocomplete="off"
                  onSubmit={formik.handleSubmit}
                >
                  <h1 class="heading text-center">Login</h1>
                  <p class="have-account text-center">
                    Please fill the form below to login
                  </p>
                  <div className="text-field">
                    <p className="input-labels">Email</p>
                    <CustomTextField
                      className="email-box form-group"
                      fullWidth
                      id="email"
                      name="email"
                      // label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                      variant="outlined"
                      InputProps={{
                        classes: {
                          root: classes.outlinedInput,
                        },
                        endAdornment: (
                          <InputAdornment
                            style={{
                              width: "auto",
                              marginRight: "10px",
                              border: "none",
                            }}
                            position="end"
                          >
                            <EmailIcon></EmailIcon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>

                  <div className="text-field">
                    <p className="input-labels">Password</p>
                    <CustomTextField
                      className="text-field password-box"
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      // label="Password"
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      variant="outlined"
                      InputProps={{
                        classes: {
                          root: classes.outlinedInput,
                        },
                        endAdornment: (
                          <InputAdornment
                            style={{
                              width: "auto",
                              marginRight: "10px",
                              border: "none",
                            }}
                            position="end"
                          >
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>

                  <div className="remember-forgot">
                    <div className="rememberMe">
                      <input
                        type="radio"
                        id="rememberMe"
                        name="rememberMe"
                        value="rememberMe"
                      />
                      <label htmlFor="rememberMe">Remember Me</label>
                    </div>
                    <div className="forgotPassword">
                      <p
                        onClick={() =>
                          role === APP_ROLES.ADMIN
                            ? navigationURL("/superadmin/forgot-password")
                            : navigationURL("/forgot-password")
                        }
                      >
                        Forgot Password?
                      </p>
                    </div>
                  </div>
                  <div className="linkbtn">
                    <Button
                      style={{ borderRadius: "50px", padding: "22.5px" }}
                      color="primary"
                      variant="contained"
                      fullWidth
                      type="submit"
                      className="btn btn-primary"
                    >
                      <span className="login-text">Login</span>
                    </Button>
                    <div className="d-flex mt-2 justify-content-end">
                      {role === APP_ROLES.FLEET_MANAGER ? (
                        <Link
                          style={{
                            color: "white",
                            textDecoration: "underline",
                          }}
                          to={"/superadmin/login"}
                        >
                          Login as an Admin
                        </Link>
                      ) : (
                        <Link
                          style={{
                            color: "white",
                            textDecoration: "underline",
                          }}
                          to={"/login"}
                        >
                          Login as User
                        </Link>
                      )}
                    </div>
                    {/* <div className="btn or">
                <div></div>
                <p>OR</p>
                <div></div>
              </div>
              <button type="button" className="btn" onClick={handleSignInWithFacebook}>
                <img src={fblogo} />
                Login with Facebook
              </button>
              <button type="button" className="btn" onClick={handleSignInWithGoogle}>
                <img src={googlelogo} />
                Login with Google
              </button>
              <button type="button" className="btn">
                <img src={maclogo} />
                Login with Apple
              </button> */}
                  </div>
                </form>
                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={3000}
                  onClose={handleSnackbarClose}
                >
                  <Alert
                    severity={snackbarSeverity}
                    onClose={handleSnackbarClose}
                  >
                    {snackbarMessage}
                  </Alert>
                </Snackbar>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="./assets/js/mlib.js"></script>
      <script src="./assets/js/functions.js"></script>
    </div>
  );
};
