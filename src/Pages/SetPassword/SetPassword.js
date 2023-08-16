import React, { useState } from "react";
import "../../Components/Login/index";
import APP_ROLES from "../../SharedComponents/role";
import { useLocation, useNavigate } from "react-router-dom";
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
import { SetPassword } from "../../Services/Auth";
import logo from "../../Assets/Images/logo-w.png";
import EmailIcon from "@material-ui/icons/Email";
import { InputLabel, makeStyles } from "@material-ui/core";
import { CustomTextField } from "../../Components/Login/customTextField";
import companyLogo from "../../Assets/Images/company_logo.png";
import { omit } from "lodash";
const validationSchema = yup.object().shape({
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
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
      "Password must contain at least 8 characters with one alphabet, one digit and one special character"
    )
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

const useStyles = makeStyles({
  outlinedInput: {
    borderRadius: "20px", // Adjust the value as per your preference
  },
  inputLabel: {
    padding: 0, // Remove padding around the label
  },
});

export const SetPasswordPage = ({ role }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [showContinue, setShowContinue] = useState(false);
  const navigationURL = useNavigate();
  const location = useLocation();
  const { email } = location.state || "";
  const { otp } = location.state || "000000";
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const SetPasswordFleetManager = async (values) => {
    try {
      const payload = JSON.stringify({ ...values, otp, email });
      const res = await SetPassword(APP_ROLES.FLEET_MANAGER, payload);
      if (+res?.code === 200) {
        // Handle success
        localStorage.setItem("token", res?.data?.token);
        setSnackbarSeverity("success");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
        navigationURL("/login");
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

  const SetPasswordAdmin = async (values) => {
    try {
      const payload = JSON.stringify({ ...values, otp, email });
      delete payload.repeatPassword;
      const res = await SetPassword(APP_ROLES.ADMIN, payload);
      if (+res?.code === 200) {
        // Handle success
        localStorage.setItem("token", res?.data?.token);
        setSnackbarSeverity("success");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
        navigationURL("/superadmin/login");
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
    const valuesWithoutRepeatPassword = omit(values, "repeatPassword"); // Remove the repeatPassword field
    if (role === APP_ROLES.ADMIN) {
      SetPasswordAdmin(valuesWithoutRepeatPassword);
    } else {
      SetPasswordFleetManager(valuesWithoutRepeatPassword);
    }
  };
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: validationSchema,
    //  validationSchema: validationSchema.password,
    onSubmit: (values) => {
      http: handleRegister(values);
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleMouseDownRepeatPassword = (event) => {
    event.preventDefault();
  };

  const classes = useStyles();

  return (
    <div>
      <div class="formwrap">
        <div class="left-position">
          <div class="image d-flex align-items-center">
            <img src={logo} alt="" />
          </div>
        </div>
        <div class="right-position d-flex align-items-center p-5">
          <div class="container">
            <div class="row">
              <div class="form-group">
                <form
                  className="form-bg"
                  action=""
                  autocomplete="off"
                  onSubmit={formik.handleSubmit}
                >
                  <h1 class="heading text-center">Create new Password</h1>
                  <p class="have-account text-center">Enter your password</p>

                  {/* <TextField className="text-field email-box form-group"
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                // variant="outlined"
              /> */}
                  <div className="text-field">
                    <p className="input-labels">Enter New Password</p>
                    <CustomTextField
                      className="text-field password-box"
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

                  <div className="text-field mb-3">
                    <p className="input-labels">Repeat Password</p>
                    <CustomTextField
                      className="text-field password-box"
                      type={showRepeatPassword ? "text" : "password"}
                      // label="Password"
                      id="repeatPassword"
                      name="repeatPassword"
                      value={formik.values.repeatPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.repeatPassword &&
                        Boolean(formik.errors.repeatPassword)
                      }
                      helperText={
                        formik.touched.repeatPassword &&
                        formik.errors.repeatPassword
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
                              onClick={handleClickShowRepeatPassword}
                              onMouseDown={handleMouseDownRepeatPassword}
                              edge="end"
                            >
                              {showRepeatPassword ? (
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

                  {formik.isValid ? (
                    <div className="linkbtn">
                      <Button
                        style={{ borderRadius: "50px", padding: "22.5px" }}
                        color="primary"
                        variant="contained"
                        fullWidth
                        type="submit"
                        className="btn btn-primary"
                      >
                        <span className="login-text">Continue</span>
                      </Button>
                    </div>
                  ) : (
                    <p className="text-red-700">
                      Password And Repeat Password DoNot Match{" "}
                    </p>
                  )}
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
        {/* <div class="right-position d-flex align-items-center p-5">
            <div class="container">
                <div class="row">
                    <div class="form-group">
                    <form className="login-form" onSubmit={formik.handleSubmit}>
                    <h1 class="heading text-center">Create New Password</h1>
                    <p class="have-account text-center">Please create your new password</p>
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
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter new password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment style={{width: 'auto', marginRight: '10px', border: 'none'}} position="end">
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
        <div className="linkbtn">
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            className="btn btn-primary"
          >
            <span className="login-text">Continue</span>
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
                </div>
            </div>
        </div> */}
      </div>
      <script src="./assets/js/mlib.js"></script>
      <script src="./assets/js/functions.js"></script>
    </div>
  );
};
