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
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import APP_ROLES from "../../SharedComponents/role";
import { useFormik } from "formik";
import * as yup from "yup";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { CustomTextField } from "../../Components/Login/customTextField";
import { EditDriver, GetDriverById } from "../../Services/Auth";
import { useEffect } from "react";
//import { FieldArray } from "formik";
const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  contact_number: yup.string("").required("Contact name is required"),
  vehicle_name: yup.string("").required("Vehicle name is required"),
});
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const useStyles = makeStyles({
  outlinedInput: {
    borderRadius: "20px", // Adjust the value as per your preference
  },
  inputLabel: {
    padding: 0, // Remove padding around the label
  },
});

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
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
export const EditFleetDriver = ({ role }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [data, setData] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigationURL = useNavigate();
  const location = useLocation();
  const { id } = location.state || "";
  const [apiPayload, setApiPayload] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    contact_number: "",
    vehicle_name: "",
    medications: "",
    medical_notes: "",
    height: "",
    weight: "",
    organ_donor: "",
    allergies: "",
  });
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  const getDriverDetails = async () => {
    try {
      const res = await GetDriverById(APP_ROLES.FLEET_MANAGER, id);
      console.log("Get Driver By Id");
      console.log(res);
      if (+res?.code === 200) {
        // Handle success
        setData(res?.data);
      } else if (+res?.code !== 200) {
        setData([]);
      }
    } catch (error) {
      // Handle error
      setData([]);
    }
  };
  useEffect(() => {
    getDriverDetails();
    fetchProfileData();
  }, []);
  const fetchProfile = async () => {
    const profileData = await getDriverDetails();

    return profileData;
  };

  const fetchProfileData = () => {
    fetchProfile().then((data) => {
      setData(data);
      setFormData({
        name: data?.user_detail?.name,
        contact_number: data?.contact_number,
        vehicle_name: data?.user_detail?.vehicle_name,
        medications: data?.user_detail?.medications,
        medical_notes: data?.user_detail?.medical_notes,
        allergies: data?.user_detail?.allergies,
        height: data?.user_detail?.height,
        weight: data?.user_detail?.weight,
        organ_donor: data?.user_detail?.organ_donor,
      });
    });
  };
  console.log("MEDICAL NOTES");
  console.log(data?.user_detail?.medical_notes);
  const EditFleetUser = async (values) => {
    try {
      const payload = JSON.stringify(values);
      const res = await EditDriver(APP_ROLES.FLEET_MANAGER, payload, id);
      if (+res?.code === 200) {
        // Handle success
        setSnackbarSeverity("success");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
        handleClickOpen();
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
  const goBack = () => {
    navigationURL("/fleet-driver");
  };
  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      EditFleetUser(values);
    },
  });

  const classes = useStyles();

  console.log("DATA");
  console.log(data);
  return (
    <>
      <Layout role={role}>
        <div className="body-wrapper">
          <div className="content">
            <form autocomplete="off" onSubmit={formik.handleSubmit}>
              <section className="section-padding">
                <h2 className="title">Edit Driver Profile</h2>

                <div className="">
                  <div className="grid grid-cols-2">
                    <div>
                      {" "}
                      <div className="form-group">
                        <div className="text-field">
                          <p
                            className="input-labels"
                            style={{
                              color: "#000000",
                              fontSize: "15px",
                              fontWeight: "medium",
                              marginBottom: "10px",
                            }}
                          >
                            Name:
                          </p>
                          <CustomTextField
                            className="email-box form-group"
                            fullWidth
                            id="name"
                            name="name"
                            placeholder="example@gmail.com"
                            value={data?.user_detail?.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.name && Boolean(formik.errors.name)
                            }
                            helperText={
                              formik.touched.name && formik.errors.name
                            }
                            variant="outlined"
                            InputProps={{
                              classes: {
                                root: classes.outlinedInput,
                              },
                              style: {
                                padding: "5px",
                                paddingLeft: "20px",
                              },
                            }}
                          />
                        </div>
                        <div className="text-field">
                          <p
                            className="input-labels"
                            style={{
                              color: "#000000",
                              fontSize: "15px",
                              fontWeight: "medium",
                              marginBottom: "10px",
                            }}
                          >
                            Phone Number:
                          </p>
                          <CustomTextField
                            className="email-box form-group"
                            fullWidth
                            id="contact_number"
                            name="contact_number"
                            placeholder="example@gmail.com"
                            value={data?.contact_number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.contact_number &&
                              Boolean(formik.errors.contact_number)
                            }
                            helperText={
                              formik.touched.contact_number &&
                              formik.errors.contact_number
                            }
                            variant="outlined"
                            InputProps={{
                              classes: {
                                root: classes.outlinedInput,
                              },
                              style: {
                                padding: "5px",
                                paddingLeft: "20px",
                              },
                            }}
                          />
                        </div>

                        <div className="text-field">
                          <p
                            className="input-labels"
                            style={{
                              color: "#000000",
                              fontSize: "15px",
                              fontWeight: "medium",
                              marginBottom: "10px",
                            }}
                          >
                            Car Detail:
                          </p>
                          <CustomTextField
                            className="email-box form-group"
                            fullWidth
                            id="vehicle_name"
                            name="vehicle_name"
                            placeholder="example@gmail.com"
                            value={data?.user_detail?.vehicle_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.vehicle_name &&
                              Boolean(formik.errors.vehicle_name)
                            }
                            helperText={
                              formik.touched.vehicle_name &&
                              formik.errors.vehicle_name
                            }
                            variant="outlined"
                            InputProps={{
                              classes: {
                                root: classes.outlinedInput,
                              },
                              style: {
                                padding: "5px",
                                paddingLeft: "20px",
                              },
                            }}
                          />
                        </div>
                        <div className="text-field">
                          <p
                            className="input-labels"
                            style={{
                              color: "#000000",
                              fontSize: "15px",
                              fontWeight: "medium",
                              marginBottom: "10px",
                            }}
                          >
                            Medications
                          </p>
                          <CustomTextField
                            className="email-box form-group"
                            fullWidth
                            id="medications"
                            name="medications"
                            placeholder="Medications you have been taking"
                            value={data?.user_detail?.medications}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.medications &&
                              Boolean(formik.errors.medications)
                            }
                            helperText={
                              formik.touched.medications &&
                              formik.errors.medications
                            }
                            variant="outlined"
                            InputProps={{
                              classes: {
                                root: classes.outlinedInput,
                              },
                              style: {
                                padding: "5px",
                                paddingLeft: "20px",
                              },
                            }}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="">Height</label>
                          <input
                            type="text"
                            className="form-control"
                            name="height"
                            value={data?.user_detail?.height}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="/ft"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      {" "}
                      <div className="form-group ml-4">
                        <div className="text-field">
                          <p
                            className="input-labels"
                            style={{
                              color: "#000000",
                              fontSize: "15px",
                              fontWeight: "medium",
                              marginBottom: "10px",
                            }}
                          >
                            Medical Condition
                          </p>
                          <CustomTextField
                            className="email-box form-group"
                            fullWidth
                            id="medical_condition"
                            name="medical_condition"
                            placeholder="Briefly describe your medical condition"
                            value={data?.user_detail?.medical_condition}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.medical_condition &&
                              Boolean(formik.errors.medical_condition)
                            }
                            helperText={
                              formik.touched.medical_condition &&
                              formik.errors.medical_condition
                            }
                            variant="outlined"
                            InputProps={{
                              classes: {
                                root: classes.outlinedInput,
                              },
                              style: {
                                padding: "5px",
                                paddingLeft: "20px",
                              },
                            }}
                          />
                        </div>
                        <div className="text-field">
                          <p
                            className="input-labels"
                            style={{
                              color: "#000000",
                              fontSize: "15px",
                              fontWeight: "medium",
                              marginBottom: "10px",
                            }}
                          >
                            Medical Notes
                          </p>
                          <CustomTextField
                            className="email-box form-group"
                            fullWidth
                            id="medical_notes"
                            name="medical_notes"
                            placeholder="Medical Notes"
                            value={data?.user_detail?.medical_notes}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.medical_notes &&
                              Boolean(formik.errors.medical_notes)
                            }
                            helperText={
                              formik.touched.medical_notes &&
                              formik.errors.medical_notes
                            }
                            variant="outlined"
                            InputProps={{
                              classes: {
                                root: classes.outlinedInput,
                              },
                              style: {
                                padding: "5px",
                                paddingLeft: "20px",
                              },
                            }}
                          />
                        </div>

                        <div className="text-field">
                          <p
                            className="input-labels"
                            style={{
                              color: "#000000",
                              fontSize: "15px",
                              fontWeight: "medium",
                              marginBottom: "10px",
                            }}
                          >
                            Allergies and Reactions
                          </p>
                          <select
                            name="Allergies"
                            value={data?.user_detail?.allergies}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id="Allergies"
                            className="form-control"
                          >
                            <option value="YES">Yes</option>
                            <option value="NO">No</option>
                          </select>
                        </div>
                        <div className="text-field">
                          <p
                            className="input-labels"
                            style={{
                              color: "#000000",
                              fontSize: "15px",
                              fontWeight: "medium",
                              marginBottom: "10px",
                            }}
                          >
                            Organ Donor
                          </p>
                          <select
                            name="organ_donor"
                            value={data?.user_detail?.organ_donor}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            id="organ_donor"
                            className="form-control"
                          >
                            <option value="YES">Yes</option>
                            <option value="NO">No</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label htmlFor="">Weight</label>
                          <input
                            type="text"
                            className="form-control"
                            name="weight"
                            value={data?.user_detail?.weight}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="/lb"
                          />
                          {/* {errors?.weight && touched?.weight && (
                            <div className="red">{errors?.weight}</div>
                          )} */}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="field-array px-2">
                        <p className="col-title">Emergency Contact</p>
                        <div>
                          <div className="form-group">
                            <label htmlFor="">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              //   name={`contacts[${index}].name`}
                              //  value={data?.user_contacts[0]?.name ?? "N/A"}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              placeholder="Type name of your emergency contact person..."
                            />
                            {/* {errors?.contacts &&
                                  errors?.contacts[index] &&
                                  errors?.contacts[index].name &&
                                  touched?.contacts?.[index]?.name && (
                                    <div className="red">
                                      {errors?.contacts[index].name}
                                    </div>
                                  )} */}
                          </div>

                          <div className="form-group">
                            <label htmlFor="">Relationship</label>
                            <input
                              type="text"
                              className="form-control"
                              // name={`contacts[${index}].relationship`}
                              // value={
                              //   data?.user_contacts[0]?.relationship ?? "N/A"
                              // }
                              //onChange={handleChange}
                              //onBlur={handleBlur}
                              //placeholder="Your relation with emergency contact person..."
                            />
                            {/* {errors.contacts &&
                                  errors.contacts[index] &&
                                  errors.contacts[index].relationship &&
                                  touched?.contacts?.[index]?.relationship && (
                                    <div className="red">
                                      {errors.contacts[index].relationship}
                                    </div>
                                  )} */}
                          </div>
                          <div className="form-group">
                            <label htmlFor="">Contact Number</label>
                            <input
                              type="text"
                              className="form-control"
                              //name={`contacts[${index}].number`}
                              //  value={data?.user_contacts[0]?.number ?? "N/A"}
                              //onChange={handleChange}
                              //onBlur={handleBlur}
                              placeholder="Contact Number..."
                            />
                            {/* {errors.contacts &&
                                  errors.contacts[index] &&
                                  errors.contacts[index].number &&
                                  touched?.contacts?.[index]?.number && (
                                    <div className="red">
                                      {errors.contacts[index].number}
                                    </div>
                                  )} */}
                          </div>
                        </div>

                        {/* <div className="mb-4 d-flex align-items-center justify-content-end">
                            <a
                              type="button"
                              onClick={() =>
                                push({
                                  name: "",
                                  relationship: "",
                                  number: "",
                                })
                              }
                              className="d-flex align-items-center"
                            >
                              <img
                                className="logo mr-2"
                                src={logo}
                                alt="logo"
                              />
                              <p className="mb-0">Add More</p>
                            </a>
                          </div> */}
                        {/* <div className="d-flex justify-content-start">
                            <button
                              type="submit"
                              className="btn btn-primary w-50 p-4"
                            >
                              <p className="mb-0">Add Now</p>
                            </button>
                          </div> */}
                      </div>
                    </div>

                    <div className="col-lg-4"></div>
                    <div className="linkbtn">
                      <Button
                        style={{
                          borderRadius: "50px",
                          padding: "22.5px",
                          width: "60%",
                        }}
                        color="primary"
                        variant="contained"
                        fullWidth
                        type="submit"
                        className="btn btn-primary"
                      >
                        <span className="login-text">Update</span>
                      </Button>
                    </div>
                    <BootstrapDialog
                      onClose={handleClose}
                      aria-labelledby="customized-dialog-title"
                      open={open}
                    >
                      <DialogContent
                        style={{ backgroundColor: "black", padding: "0" }}
                      >
                        <div
                          className="modal-dialog modal-dialog-centered"
                          style={{ backgroundColor: "grey" }}
                        >
                          <div
                            className="modal-content"
                            style={{
                              backgroundColor: "transparent",
                              padding: "0",
                              paddingTop: "20px",
                            }}
                          >
                            <div className="modal-body">
                              <div
                                className="text-center mb-2"
                                style={{
                                  position: "relative",
                                  backgroundColor: "#E8F1FE",
                                  width: "280px",
                                  height: "200px",
                                  margin: "0",
                                  borderTopLeftRadius: "10px",
                                  borderTopRightRadius: "10px",
                                }}
                              >
                                <div>
                                  <img
                                    className="mb-4"
                                    style={{
                                      postion: "absolute",
                                      marginTop: "-50px",
                                      backgroundColor: "#E8F1FE",
                                      border: "1px solid black",
                                      padding: "10px",
                                      borderRadius: "50px",
                                    }}
                                    src={check}
                                    width="100"
                                    alt="logo"
                                  />
                                </div>
                                <div
                                  className="modal-header"
                                  style={{
                                    position: "absolute",
                                    padding: "0",
                                    marginTop: "-65px",
                                    marginLeft: "245px",
                                  }}
                                >
                                  <a
                                    style={{
                                      display: "flex",
                                      justifyContent: "end",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                    onClick={handleClose}
                                  >
                                    <CloseIcon
                                      sx={{
                                        color: (theme) =>
                                          theme.palette.error.main,
                                      }}
                                    />
                                  </a>
                                </div>
                                <div>
                                  <h4 className="mb-0">Congratulations</h4>
                                  <p
                                    className="mb-4"
                                    style={{
                                      marginTop: "10px",
                                      marginBottom: "0",
                                    }}
                                  >
                                    You have successfully updated the profile.
                                  </p>
                                </div>
                                <div style={{ padding: "0px", width: "100%" }}>
                                  <a
                                    onClick={goBack}
                                    className="btn btn-primary"
                                    style={{
                                      borderRadius: "0",
                                      borderBottomLeftRadius: "10px",
                                      borderBottomRightRadius: "10px",
                                    }}
                                  >
                                    Go Back
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
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
