import * as React from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { Layout } from "../Layout/Layout";
import { SendNotification } from "../../Services/Auth";
import { useState } from "react";
import APP_ROLES from "../../SharedComponents/role";
import { useFormik } from "formik";
import * as yup from "yup";
import { Snackbar, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { CustomTextField } from "../../Components/Login/customTextField";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import { GetDrivers } from "../../Services/Profile";

const validationSchema = yup.object({
  title: yup.string("Enter Title").required("Title is required"),
  message: yup.string("Enter Message").required("Message is required"),
});

const useStyles = makeStyles({
  outlinedInput: {
    borderRadius: "20px", // Adjust the value as per your preference
  },
  inputLabel: {
    padding: 0, // Remove padding around the label
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const NotificationPage = ({ role }) => {
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [names, setNames] = useState([]);
  const [personName, setPersonName] = React.useState([]);

  const [selectedNames, setSelectedNames] = useState([]);

  const handleSearch = (event, newValue) => {
    setSelectedNames(newValue);
  };

  const fetchDriversAPI = async () => {
    let data = await GetDrivers(role);
    data = data?.data;
    if (role !== APP_ROLES.ADMIN) {
      data = data?.map((user) => user.user_detail);
    }
    return data;
  };

  const fetchDrivers = () => {
    fetchDriversAPI().then((res) => {
      console.log(res);
      setNames(res);
    });
  };

  React.useEffect(() => {
    fetchDrivers();
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setPersonName(
      // On autofill we get a stringified value.

      typeof value === "string" ? value.split(",") : value
    );
  };

  const nameToId = () => {
    var receiverId = selectedNames.map(
      (person) =>
        names.find((temp) =>
          temp?.name
            ? temp?.name === person
            : temp?.email
            ? temp?.email === person
            : temp?.username === person
        )?.id
    );

    return receiverId;
  };

  const receiverId = nameToId();
  const profileRole = localStorage.getItem("role");
  const sendPushNotification = async (values) => {
    try {
      const payload = JSON.stringify({ ...values, user_id: receiverId });
      const res = await SendNotification(profileRole, payload);
      if (+res?.code === 200) {
        // Handle success
        setSnackbarSeverity("success");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
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

  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      sendPushNotification(values);
    },
  });
  const classes = useStyles();
  return (
    <>
      <Layout role={role}>
        <div className="body-wrapper">
          <div className="content">
            <form autocomplete="off" onSubmit={formik.handleSubmit}>
              <section className="section-padding">
                <h2 className="title">Push Notification</h2>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-group">
                      <div className="text-field">
                        <p
                          className="input-labels font-extrabold"
                          style={{
                            color: "#000000",
                            fontSize: "15px",
                            fontWeight: "medium",
                            marginBottom: "10px",
                          }}
                        >
                          Title
                        </p>
                        <CustomTextField
                          className="email-box form-group"
                          fullWidth
                          id="title"
                          name="title"
                          placeholder="Title"
                          value={formik.values.title}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.title && Boolean(formik.errors.title)
                          }
                          helperText={
                            formik.touched.title && formik.errors.title
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
                        <br></br>
                        <p
                          className="input-labels font-extrabold"
                          style={{
                            color: "#000000",
                            fontSize: "15px",
                            fontWeight: "medium",
                            marginBottom: "10px",
                          }}
                        >
                          Message
                        </p>
                        <CustomTextField
                          className="email-box form-group"
                          fullWidth
                          id="message"
                          name="message"
                          placeholder="Message"
                          value={formik.values.message}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.message &&
                            Boolean(formik.errors.message)
                          }
                          helperText={
                            formik.touched.message && formik.errors.message
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
                    </div>

                    <div className="">
                      <p className="font-bold">Send To</p>
                      <Autocomplete
                        multiple
                        id="search-users"
                        options={names
                          ?.map(
                            (user) =>
                              user?.name || user?.email || user?.username
                          )
                          .filter(Boolean)}
                        value={selectedNames}
                        onChange={handleSearch}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                        className="p-2 rounded-md text-gray-800 w-full mb-4"
                      />
                    </div>
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
                        <span className="login-text">Send</span>
                      </Button>
                    </div>
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
