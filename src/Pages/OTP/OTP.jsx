import React, { useState } from "react";
import logo from "../../Assets/Images/logo-w.png";
import APP_ROLES from "../../SharedComponents/role";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { SetPassword, VerifyOTP } from "../../Services/Auth";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useFormik } from "formik";
import * as yup from "yup";
import { CustomOTPInput, RoundedInput } from "./customOTPInput";

export const OTP = ({ role }) => {
  const navigationURL = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [value, setValue] = useState("");
  const location = useLocation();
  const { email } = location.state || "";

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleComplete = (e) => {
    e?.preventDefault();
    setValue(value);
    webAPI();
  };
  const SetPasswordFleetManager = async () => {
    try {
      const payload = JSON.stringify({ otp: value, email });
      const res = await VerifyOTP(APP_ROLES.FLEET_MANAGER, payload);
      if (+res?.code === 200) {
        // Handle success
        setSnackbarSeverity("success");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
        navigationURL("/set-password", { state: { otp: value, email: email } });
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
  const SetPasswordAdmin = async () => {
    try {
      const payload = JSON.stringify({ otp: value, email });
      const res = await VerifyOTP(APP_ROLES.ADMIN, payload);
      if (+res?.code === 200) {
        // Handle success
        setSnackbarSeverity("success");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
        navigationURL("/superadmin/set-password", {
          state: { otp: value, email: email },
        });
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

  const webAPI = () => {
    if (role === APP_ROLES.ADMIN) {
      SetPasswordAdmin();
    } else {
      SetPasswordFleetManager();
    }
  };

  return (
    <div className="formwrap">
      <div className="formwrap">
        <div class="left-position">
          <div class="image d-flex align-items-center">
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="right-position d-flex align-items-center p-5">
          <div className="container">
            <div className="row">
              <div class="form-group">
                <form className="form-bg" action="" autocomplete="off">
                  <h1 class="heading text-center">One Time Password</h1>
                  <p
                    class="have-account text-center"
                    style={{ marginBottom: "8px" }}
                  >
                    Enter your OTP
                  </p>

                  <div style={{ marginBottom: "10px" }}>
                    <CustomOTPInput
                      length={6}
                      value={value}
                      onChange={handleChange}
                      style={{ height: "50px" }}
                      inputStyle={RoundedInput}
                    />
                  </div>
                  <div className="linkbtn">
                    <Button
                      style={{ borderRadius: "50px", padding: "22.5px" }}
                      color="primary"
                      variant="contained"
                      fullWidth
                      type="submit"
                      onClick={handleComplete}
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
                  <Alert
                    severity={snackbarSeverity}
                    onClose={handleSnackbarClose}
                  >
                    {snackbarMessage}
                  </Alert>
                </Snackbar>
              </div>
              {/* <div className="col-lg-8 mx-auto">
                <div className="company-logo">
                  <img src={logo} alt="" />
                </div>
                <h1 className="heading">One Time Password</h1>
                <div className="have-account">Enter your OTP</div>
                <MuiOtpInput
                    length={6}
                    value={value}
                    onChange={handleChange}
                />
                <div className="linkbtn">
              <Button 
                color="primary" 
                variant="contained" 
                fullWidth 
                type="submit"
                onClick={handleComplete}
                className="btn btn-primary">
                <span className="login-text">Continue</span>
              </Button>
            </div>
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
