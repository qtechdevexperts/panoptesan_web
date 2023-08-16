/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import logo from "../../Assets/Images/Group-546.png";
import { Layout } from "../Layout/Layout";
import { FieldArray, Formik, useFormik } from "formik";
import * as yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import { CreateDriver } from "../../Services/Auth";
import APP_ROLES from "../../SharedComponents/role";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import smile from "../../Assets/Images/smile.svg";
import "./Driver.css";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  medical_condition: yup
    .string("Enter your medical conditions")
    .required("Medical conditions required"),

  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
      "Password must contain at least 8 characters with one alphabet, one digit and one special character"
    )
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  name: yup.string("Enter your name").required("Name is required"),
  vehicle_model: yup.string("").required("Vehicle model is required"),
  medical_notes: yup.string("").required("Medical notes are required"),
  medications: yup.string("").required("Medications are required"),
  allergies: yup.string("").required("Allergies are required"),
  organ_donor: yup.string("").required("Organ Donor is required"),
  weight: yup.string("").required("Weight is required"),
  height: yup.string("").required("Height is required"),
  phone_number: yup.string("").required("Number is required"),
  repeat_password: yup
    .string("")
    .required("Repeat Password is required")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
  contacts: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Name is required"),
      relationship: yup.string().required("Relationship is required"),
      number: yup.string().required("Number is required"),
    })
  ),
});
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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

export const CreateDriverProfile = ({ role }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigationURL = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(false);
  const theme = useTheme();
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  const goBack = () => {
    navigationURL("/fleet-user-profile", { state: { data: data } });
  };
  const initialValues = {
    contacts: [{ name: "", relationship: "", number: "" }],
    medical_condition: "",
    email: "",
    password: "",
    name: "",
    vehicle_model: "",
    medical_notes: "",
    medications: "",
    allergies: "YES",
    organ_donor: "YES",
    weight: "",
    height: "",
    address: "",
    repeat_password: "",
    phone_number: "",
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const CreateFleetDriver = async (values) => {
    try {
      const payload = JSON.stringify(values);
      const res = await CreateDriver(APP_ROLES.FLEET_MANAGER, payload);
      if (+res?.code === 200) {
        // Handle success
        setData(res?.data);
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
  const handleSubmit = (values) => {
    CreateFleetDriver(values);
  };

  return (
    <Layout role={role}>
      <div>
        <div className="body-wrapper">
          <div className="content p-0 m-0">
            <div className="section-padding">
              <div className="section-title">
                <p>Create Driver</p>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleSubmit,
                  handleChange,
                  handleBlur,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="row gx-3">
                      <div className="col-lg-6 field-array px-2">
                        <p className="col-title">Create ID</p>
                        <div className="form-group">
                          <label htmlFor="">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors?.name && touched?.name && (
                            <div className="red">{errors?.name}</div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Phone Number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="XXX XXX XXXX"
                            name="phone_number"
                            value={values.phone_number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors?.phone_number && touched?.phone_number && (
                            <div className="red">{errors?.phone_number}</div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Car Detail</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Vehicle Model"
                            name="vehicle_model"
                            value={values.vehicle_model}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors?.vehicle_model && touched?.vehicle_model && (
                            <div className="red">{errors?.vehicle_model}</div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Email</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="abc@xyz.com"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors?.email && touched?.email && (
                            <div className="red">{errors?.email}</div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors?.password && touched?.password && (
                            <div className="red">{errors?.password}</div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Repeat Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Repeat Password"
                            name="repeat_password"
                            value={values.repeat_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors?.repeat_password &&
                            touched?.repeat_password && (
                              <div className="red">
                                {errors?.repeat_password}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-lg-6 field-array px-2">
                        <p className="col-title">Medical Information</p>
                        <div className="form-group">
                          <label htmlFor="">Medical Conditions</label>
                          <input
                            type="text"
                            className="form-control"
                            name="medical_condition"
                            value={values.medical_condition}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Type your medical conditions..."
                          />
                          {errors?.medical_condition &&
                            touched?.medical_condition && (
                              <div className="red">
                                {errors?.medical_condition}
                              </div>
                            )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Medical Notes</label>
                          <textarea
                            className="form-control"
                            name="medical_notes"
                            id="medical_notes"
                            cols="30"
                            rows="5"
                            placeholder="Write something about medical history..."
                            value={values.medical_notes}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          ></textarea>
                          {errors?.medical_notes && touched?.medical_notes && (
                            <div className="red">{errors?.medical_notes}</div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Allergies & Reaction</label>
                          <select
                            className="form-control"
                            name="allergies"
                            value={values.allergies}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="allergies"
                          >
                            <option value="YES">Yes</option>
                            <option value="NO">No</option>
                          </select>
                          {errors?.allergies && touched?.allergies && (
                            <div className="red">{errors?.allergies}</div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Medications</label>
                          <input
                            type="text"
                            className="form-control"
                            name="medications"
                            value={values.medications}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Please type the name of medications you take..."
                          />
                          {errors?.medications && touched?.medications && (
                            <div className="red">{errors?.medications}</div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="">Organ Donor</label>
                          <select
                            name="organ_donor"
                            value={values.organ_donor}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="organ_donor"
                            className="form-control"
                          >
                            <option value="YES">Yes</option>
                            <option value="NO">No</option>
                          </select>
                          {errors?.organ_donor && touched?.organ_donor && (
                            <div className="red">{errors?.organ_donor}</div>
                          )}
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label htmlFor="">Weight</label>
                              <input
                                type="text"
                                className="form-control"
                                name="weight"
                                value={values.weight}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="/lb"
                              />
                              {errors?.weight && touched?.weight && (
                                <div className="red">{errors?.weight}</div>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label htmlFor="">Height</label>
                              <input
                                type="text"
                                className="form-control"
                                name="height"
                                value={values.height}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Foot-inch"
                              />
                              {errors?.height && touched?.height && (
                                <div className="red">{errors?.height}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <FieldArray name="contacts">
                        {({ push, remove }) => (
                          <div className="col-lg-6 field-array px-2">
                            <p className="col-title">Emergency Contact</p>
                            {values?.contacts?.map((_, index) => (
                              <div key={index}>
                                <div className="form-group">
                                  <label htmlFor="">Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name={`contacts[${index}].name`}
                                    value={values.contacts[index].name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Type name of your emergency contact person..."
                                  />
                                  {errors?.contacts &&
                                    errors?.contacts[index] &&
                                    errors?.contacts[index].name &&
                                    touched?.contacts?.[index]?.name && (
                                      <div className="red">
                                        {errors?.contacts[index].name}
                                      </div>
                                    )}
                                </div>

                                <div className="form-group">
                                  <label htmlFor="">Relationship</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name={`contacts[${index}].relationship`}
                                    value={values.contacts[index].relationship}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Your relation with emergency contact person..."
                                  />
                                  {errors.contacts &&
                                    errors.contacts[index] &&
                                    errors.contacts[index].relationship &&
                                    touched?.contacts?.[index]
                                      ?.relationship && (
                                      <div className="red">
                                        {errors.contacts[index].relationship}
                                      </div>
                                    )}
                                </div>
                                <div className="form-group">
                                  <label htmlFor="">Contact Number</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name={`contacts[${index}].number`}
                                    value={values.contacts[index].number}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Contact Number..."
                                  />
                                  {errors.contacts &&
                                    errors.contacts[index] &&
                                    errors.contacts[index].number &&
                                    touched?.contacts?.[index]?.number && (
                                      <div className="red">
                                        {errors.contacts[index].number}
                                      </div>
                                    )}
                                </div>
                                <a type="button" onClick={() => remove(index)}>
                                  <DeleteIcon /> Remove
                                </a>
                              </div>
                            ))}
                            <div className="mb-4 d-flex align-items-center justify-content-end">
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
                            </div>
                            <div className="d-flex justify-content-start">
                              <button
                                type="submit"
                                className="btn btn-primary w-50 p-4"
                              >
                                <p className="mb-0">Add Now</p>
                              </button>
                            </div>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </form>
                )}
              </Formik>
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
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <DialogContent>
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
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
                              color: (theme) => theme.palette.error.main,
                            }}
                          />
                        </a>
                      </div>
                      <div className="modal-body">
                        <div className="text-center mb-2">
                          <img
                            className="mb-4"
                            src={smile}
                            width="100"
                            alt="logo"
                          />
                          <h4 className="mb-0">Congratulations</h4>
                          <p className="mb-4">
                            You have successfully created a driver profile
                          </p>
                          <a onClick={goBack} className="btn btn-primary w-100">
                            Go Back
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </BootstrapDialog>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
