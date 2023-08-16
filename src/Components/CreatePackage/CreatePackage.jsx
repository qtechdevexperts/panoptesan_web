import React, { useEffect, useState } from "react";
import { CreatePackageAdmin } from "../../Services/Profile";
import { useFormik } from "formik";
import * as yup from "yup";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export const CreatePackageComponent = ({ role }) => {
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
    name: "",
    price: "",
    storage: "",
    currency_symbol: "USD ",
    description: "",
    type: "Trial",
  });
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(35, "Name must not contain more than 35 characters")
      .required("Name is required"),
    price: yup
      .string()
      .matches(/^[0-9]+$/, "Price must be a number")
      .min(2, "Price must be greater than 9")
      .max(4, "Price must be less than 10000")
      .required("Price is required"),
    storage: yup
      .string()
      .min(2, "Storage must be at least 2 characters")
      .max(35, "Storage must not contain more than 35 characters")
      .required("Storage is required"),
    currency_symbol: yup
      .string()

      .required("Currency Symbol is required"),
    description: yup
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(200, "Description must not contain more than 200 characters")
      .required("Description is required"),
    type: yup
      .string()

      .required("Type is required"),
  });

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handlePackageCreate(values);
    },
  });

  const handlePackageCreate = (formData) => {
    const payload = {
      ...(id && { id }),
      name: formData.name,
      price: formData.price,
      storage: formData.storage,
      currency_symbol: formData.currency_symbol,
      description: formData.description,
      type: formData.type,
    };
    CreatePackageAdmin(payload).then((res) => {
      setSnackbarSeverity("success");
      setSnackbarMessage(res?.message);
      setSnackbarOpen(true);
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setId();
    if (searchParams.get("id")) {
      setFormData({
        name: searchParams.get("name"),
        price: searchParams.get("price"),
        storage: searchParams.get("storage"),
        currency_symbol: searchParams.get("currency_symbol"),
        description: searchParams.get("description"),
        type: searchParams.get("type"),
      });
    }
  }, []);

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
                      <label>Price</label>
                      <input
                        type="number"
                        class="form-control"
                        autocomplete="off"
                        required
                        value={formData.price}
                        onChange={(e) => {
                          setFormData({ ...formData, price: e.target.value });
                        }}
                      />
                      {formik.errors.price && (
                        <span style={{ color: "red" }}>
                          {formik.errors.price}
                        </span>
                      )}
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="">Storage</label>
                      <input
                        type="text"
                        class="form-control"
                        autocomplete="off"
                        value={formData.storage}
                        onChange={(e) => {
                          setFormData({ ...formData, storage: e.target.value });
                        }}
                      />
                      {formik.errors.storage && (
                        <span style={{ color: "red" }}>
                          {formik.errors.storage}
                        </span>
                      )}
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="">Currency Symbol</label>
                      <select
                        class="form-control"
                        value={formData?.currency_symbol}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            currency_symbol: e.target.value,
                          });
                        }}
                      >
                        <option value="USD">USD</option>
                        <option value="GBP">Pound</option>
                        <option value="PKR">PKR</option>
                        <option value="INR">INR</option>
                        <option value="SAR">SAR</option>
                      </select>
                      {formik.errors.currency_symbol && (
                        <span style={{ color: "red" }}>
                          {formik.errors.currency_symbol}
                        </span>
                      )}
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="">Type</label>
                      <select
                        class="form-control"
                        value={formData.type}
                        onChange={(e) => {
                          setFormData({ ...formData, type: e.target.value });
                        }}
                      >
                        <option value="Trial">Trial</option>
                        <option value="Normal">Normal</option>
                      </select>
                      {formik.errors.type && (
                        <span style={{ color: "red" }}>
                          {formik.errors.type}
                        </span>
                      )}
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label>Description</label>
                      <input
                        type="text"
                        class="form-control"
                        autocomplete="off"
                        required
                        value={formData.description}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          });
                        }}
                      />
                      {formik.errors.description && (
                        <span style={{ color: "red" }}>
                          {formik.errors.description}
                        </span>
                      )}
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <button class="btn btn-primary w-100 mt-4" type="submit">
                      Save
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
