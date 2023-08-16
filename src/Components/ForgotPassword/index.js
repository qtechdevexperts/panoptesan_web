import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import APP_ROLES from '../../SharedComponents/role';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ForgotPassword } from '../../Services/Auth';
import logo from "../../Assets/Images/logo-w.png"
import '../Login/index.css'
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import {InputLabel, makeStyles } from '@material-ui/core';
import { CustomTextField } from "../Login/customTextField";


const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});

const useStyles = makeStyles({
  outlinedInput: {
    borderRadius: '20px', // Adjust the value as per your preference
  },
  inputLabel: {
    padding: 0, // Remove padding around the label
  },
});

export const ForgotPasswordElements = ({role}) => {
  const navigationURL = useNavigate()
  const [data, setData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
 
  const ForgotPasswordFleetManager = async (values) => {
    try {
      const payload = JSON.stringify(values);
      const res = await ForgotPassword(APP_ROLES.FLEET_MANAGER, payload);
      if (+res?.code === 200) {
        // Handle success
        setSnackbarSeverity("success");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
        navigationURL("/otp",{ state: { email:values.email } })
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
  const ForgotPasswordAdmin = async (values) => {
    try {
      const payload = JSON.stringify(values);
      const res = await ForgotPassword(APP_ROLES.ADMIN, payload);
      if (+res?.code === 200) {
        // Handle success
        setSnackbarSeverity("success");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
        navigationURL("/superadmin/otp", { state: { email:values.email } })
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
  
  const webAPI = (values) => {
    if (role === APP_ROLES.ADMIN) {
      ForgotPasswordAdmin(values);
    } else {
      ForgotPasswordFleetManager(values);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      webAPI(values);
    },
  });

  const classes = useStyles();

    return (
      <div>
        <div class="formwrap">
        <div class="left-position">
            <div class="image d-flex align-items-center">
                <img src={logo} alt=""/>
            </div>
        </div>
        <div class="right-position d-flex align-items-center p-5">
            <div class="container">
                <div class="row">
                    <div class="form-group">
                    <form className="form-bg" onSubmit={formik.handleSubmit}>
                    <h1 classname="heading text-center">Forgot Password</h1>
                    <p class="have-account text-center">Enter your email</p>
  
              <div className="form-group">
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
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        variant="outlined"
                        InputProps={{
                          classes: {
                            root: classes.outlinedInput,
                          },
                          endAdornment: (
                            <InputAdornment style={{width: 'auto', marginRight: '10px', border: 'none'}} position="end">
                            <EmailIcon></EmailIcon>
                            </InputAdornment>
                          ),
                        }}
                      />
               </div>
              </div>
              <div className="linkbtn">
                <Button 
                  style={{borderRadius: '50px', padding: '22.5px'}}
                  color="primary" 
                  variant="contained" 
                  fullWidth 
                  type="submit"
                  className="btn btn-primary w-100">
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
        </div>
    </div>
    <script src="./assets/js/mlib.js"></script>
    <script src="./assets/js/functions.js"></script>
      </div>
    )
}


{/* <div >
<div className="formwrap">
<div classname="left-position">
<div classname="image d-none d-lg-block">
<img src={logo} alt="" />
</div>
</div>
<div classname="right-position d-flex align-items-center">
<div classname="container">
<div classname="row">
 <div classname="col-lg-8 mx-auto">
 <form className="form-bg" onSubmit={formik.handleSubmit}>
 <h1 classname="heading text-center">Forgot Password</h1>
 <div classname="have-account text-center">Enter your email</div>

 <div className="form-group">
     <TextField className="text-field email-box"
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
   />
 </div>
 <div className="linkbtn">
   <Button 
     color="primary" 
     variant="contained" 
     fullWidth 
     type="submit"
     className="btn btn-primary w-100">
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
</div>
</div>

<script src="./assets/js/mlib.js"></script>
<script src="./assets/js/functions.js"></script>
</div> */}