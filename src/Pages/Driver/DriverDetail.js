import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Layout } from "../Layout/Layout";
import smile from "../../Assets/Images/smile.svg";
import check from "../../Assets/Images/check.svg";
import "./Driver.css";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { InviteDriver } from "../../Services/Auth";
import { useState } from "react";
import APP_ROLES from "../../SharedComponents/role";
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useNavigate } from 'react-router-dom';
import {InviteSentModal} from './InviteSentModal'
import {InputLabel, makeStyles } from '@material-ui/core';
import { CustomTextField } from "../../Components/Login/customTextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';


const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(0),
    backgroundColor: 'transparent',
    position: 'relative',
    width: 'auto',
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  }
}));

const useStyles = makeStyles({
  outlinedInput: {
    borderRadius: '20px', // Adjust the value as per your preference
  },
  inputLabel: {
    padding: 0, // Remove padding around the label
  },
});

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 1 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[100],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
export const InviteDriverDetail = ({ role }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [data, setData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigationURL = useNavigate()
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  const InviteFleetManager = async (values) => {
    try {
      const payload = JSON.stringify(values);
      const res = await InviteDriver(APP_ROLES.FLEET_MANAGER, payload);
      if (+res?.code === 200) {
        // Handle success
        setSnackbarSeverity("success");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
        handleClickOpen()
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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const goBack = () =>{
    navigationURL("/fleet-driver")
  }
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      InviteFleetManager(values);
    },
  });

  const [isopen, setIsOpen] = useState(false)
  const classes = useStyles();
  return (
    <>
        <Layout role={role}>
            <div className="body-wrapper">
              <div className="content">
              <form  autocomplete="off" onSubmit={formik.handleSubmit}>
                <section className="section-padding">
                  <h2 className="title">Invite Driver</h2>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group">
                    <div className="text-field">
                      <p className="input-labels" style={{color: "#000000", fontSize: "15px", fontWeight: "medium", marginBottom: "10px"}}>Driver ID:</p>
                      <CustomTextField
                            className="email-box form-group"
                            fullWidth
                            id="email"
                            name="email"
                            placeholder="example@gmail.com"
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
                              style: {
                                padding: '5px',
                                paddingLeft: '20px'
                              },

                            }}
                          />
                      </div>
                      </div>
                      <div className="linkbtn">
                        <Button
                          color="primary" 
                          variant="contained" 
                          fullWidth 
                          type="submit"
                          className="btn btn-primary">
                          <span className="login-text">Send Request</span>
                        </Button>
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
                      <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                      >
                        <DialogContent className="dailog-content">
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                  <a 
                                  style={{display:'flex',justifyContent:'end',alignItems:'center',width:'100%'}}
                                  onClick={handleClose}>
                                  <CloseIcon
                                  sx={{
                                      color: (theme) => theme.palette.error.main,
                                    }}
                                  />
                                  </a>
                              </div>
                              <div className="modal-body-customized">
                                <div className="text-center mb-2">
                                  <div className="img-container">
                                      <img
                                        src={check}
                                        width="100"
                                        alt="logo"
                                      />
                                  </div>
                                  {/* <div className="modal-header" >
                                      <a 
                                      onClick={handleClose}>
                                      <CloseIcon
                                      sx={{
                                          color: (theme) => theme.palette.error.main,
                                        }}
                                      />
                                      </a>
                                  </div> */}
                                  <div className="mt-4 congratulations">
                                      <h4>Congratulations</h4>
                                      <p>
                                        Your request has been sent to the driver
                                      </p>
                                  </div>
                                  <div className="mt-3">
                                    <a onClick={goBack} 
                                    style={{width: '250px', borderRadius: '0px 0px 15px 15px'}}
                                    className="btn btn-primary" >Go Back</a>
                                </div>
                                </div>
                              </div>
                            </div>
                            {/* <div>
                                <a onClick={goBack} 
                                style={{width: '250px',marginLeft: '-16px', borderRadius: '0px 0px 15px 15px'}}
                                className="btn btn-primary" >Go Back</a>
                            </div> */}
                          </div>
                        </DialogContent>
                      </BootstrapDialog>
                    </div>
                  </div>
                </section>
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
          </Layout>
    </>
  );
};
