import React, { useEffect, useState } from "react";
import { EditUserById } from "../../Services/Auth";
import { useFormik } from "formik";
import * as yup from "yup";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { useNavigate } from "react-router-dom";

export const EditUser = ({ role }) => {
  const [id, setId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
  });
  const validationSchema = yup.object().shape({
    id: yup.string().required("Id is required"),

    name: yup
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(35, "Name must not contain more than 35 characters")
      .required("Name is required"),
    email: yup
      .string()

      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleUserEdit(values);
    },
  });

  const handleUserEdit = (formData) => {
    const payload = {
      id: formData.id,
      name: formData.name,
      email: formData.email,
    };
    EditUserById(payload).then((res) => {
      setSnackbarSeverity("success");
      setSnackbarMessage(res?.message);
      setSnackbarOpen(true);
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    console.log("Search Params");
    console.log(searchParams);
    setId();
    if (searchParams.get("id")) {
      setFormData({
        id: searchParams.get("id"),
        name: searchParams.get("name"),
        email: searchParams.get("email"),
      });
    }
  }, []);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate({
      pathname: "/superadmin/users",
    });
  };

  console.log("FORM DATA");
  console.log(formData);
  return (
    <div class="body-wrapper">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbarSeverity} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <div class="content">
        <section class="section-padding">
          <div class="row">
            <div class="col-lg-10">
              <form class="" autocomplete="off" onSubmit={formik.handleSubmit}>
                <div class="form-row row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        autocomplete="off"
                        required
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                        }}
                      />
                      {formik.errors.name && (
                        <span style={{ color: "red" }}>
                          {formik.errors.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        class="form-control"
                        autocomplete="off"
                        required
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                        }}
                      />
                      {formik.errors.email && (
                        <span style={{ color: "red" }}>
                          {formik.errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div class="col-lg-4">
                    <button class="btn btn-primary w-100 mt-4" type="submit">
                      Save
                    </button>
                  </div>

                  <div class="col-lg-4">
                    <button
                      class="btn btn-secondary w-100 mt-4"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        <script src="./assets/js/mlib.js"></script>
        <script src="./assets/js/functions.js"></script>
      </div>
    </div>
  );
};
