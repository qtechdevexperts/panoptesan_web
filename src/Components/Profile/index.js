import React, { useState } from 'react'
import './index.css'
import down_small from '../../Assets/Images/down_small.png'
import upload_small from '../../Assets/Images/upload_small.png'
import { useNavigate } from 'react-router-dom'
import APP_ROLES from '../../SharedComponents/role'
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import { Alert, Button, MenuItem, Select, Snackbar } from "@mui/material";
import { Profile, UploadProfile } from '../../Services/Auth'
import loginBg from '../../Assets/Images/login_bg.png'
import companyLogo from '../../Assets/Images/company_logo.png'
import '../../Pages/Profile/Profile.css'
import '../../Assets/css/style.css'


export const ProfileComponent = ({ role }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
    uploadProfilePic();
  };
  const uploadProfilePic = async () => {
    try {
      const formData = new FormData();
      formData.append('photos', selectedFile);
      const res = await UploadProfile(role, formData, "PROFILE");
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
  }
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  const navigationURL = useNavigate()
  const navigateToHome = () => {
    if (role === APP_ROLES.ADMIN) {
      navigationURL("/superadmin/home")
    }
    if (role === APP_ROLES.FLEET_MANAGER) {
      navigationURL("/home")
    }
  }
  const previewImage = () => {
    console.log('Hello World')
    const chooseFile = document.getElementById("image-upload");
    const imgPreview = document.getElementById("dp");

    console.log(chooseFile)

    const files = chooseFile.files[0];
    console.log(files)

    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener('load', function () {
        console.log(this.result);
        imgPreview.style.backgroundImage = `url(${this.result})`;
      })
    }

  }

  const handleProfile = async (values) => {
    try {
      const payload = JSON.stringify(values);
      const res = await Profile(APP_ROLES.FLEET_MANAGER, payload);
      if (+res?.code === 200) {
        // Handle success
        setSnackbarSeverity("success");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
        // navigationURL("/home")
        navigateToHome()
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
  }
  const validationSchema = yup.object().shape({
    // img: yup
    //   .string()
    //   .required("Image is required"),
    username: yup
      .string()
      .required("Name is required"),
    description: yup
      .string()
      .min(20, "Description must be at least 20 characters")
      .max(200, "Description must be maximum 200 characters")
      .required("Description is required"),
    dob: yup
      .string()
      .required("DOB is required"),
    gender: yup
      .string()
      .required("gender is required")
      .test("gender-match", function (value) {
        if (value.toLowerCase() === 'male' || value.toLowerCase() === 'female') { return value }
      }),
    city: yup
      .string()
      .required('city is required!')

  });

  const formik = useFormik({
    initialValues: {
      // img:"",
      username: "",
      description: "",
      dob: "",
      gender: "",
      city: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (role === APP_ROLES.FLEET_MANAGER) {
        handleProfile(values);
      }
    },
  });

  const options = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];

  const TextAreaWithDropDown = () => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };
  }
  return (
    <div className="flex-container">
      <div className="flex-item">
        <img className='loginBg' src={loginBg} />
      </div>
      <div className="flex-item">
        <div className='Login-right-container'>
          <img className='img-thumbnail' src={companyLogo} /><br />
          <div className='elements-container'>
            {/* <ProfileComponent role={role}/> */}
            <div className='pre-card-info'>
              <div className='card'>
                <form className="login-form" onSubmit={formik.handleSubmit}>
                  <div className='dp' id='dp'>
                    <label htmlFor="image-upload" className="upload-icon">
                      <img src={upload_small} />
                    </label>
                    <input name='img' id="image-upload" type="file" accept="image/*" onChange={(e) => handleFileInputChange(e)} />
                  </div>

                  <TextField
                    className="email-box"
                    fullWidth
                    id="username"
                    name="username"
                    label="Name"
                    placeholder="Enter your name"
                    type="text"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                  />
                  <TextField
                    className="email-box"
                    fullWidth
                    id="description"
                    name="description"
                    label="About Yourself"
                    placeholder="Enter your description"
                    type="text"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                  <TextField
                    className="email-box"
                    fullWidth
                    id="dob"
                    name="dob"
                    label="DoB"
                    placeholder="Enter your Date of Birth"
                    type="text"
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.dob && Boolean(formik.errors.dob)}
                    helperText={formik.touched.dob && formik.errors.dob}
                  />
                  {/* <div className='email-box'>
                    <label htmlFor="email">About yourself:</label>
                    <br/>
                    <textarea type="text" id="text" name="text" placeholder="Enter your email" />
                </div> */}

                  {/* <div className='dob-box'>
                    <label htmlFor="dob">DOB:</label>
                    <br/>
                    <div className='dob-container'>
                    <input type="text" id="day" name="day" placeholder="Enter your day" />
                    <input type="text" id="month" name="month" min='1' max='12' placeholder="Enter your month" />
                    <input type="year" id="year" name="year" placeholder="Enter your year" />
                    </div>
                </div> */}
                  <Select
                    labelId="demo-simple-select-label"
                    fullWidth
                    id="gender"
                    name="gender"
                    label="Gender"
                    placeholder="Select Gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                  >
                    <MenuItem value={'Male'}>MALE</MenuItem>
                    <MenuItem value={'Female'}>FEMALE</MenuItem>
                  </Select>
                  {/* <div className='gender-box'>
                    <label htmlFor="gender">Gender:</label>
                    <br/>
                    <div>
                        <select type="text" id="gender" name="gender" placeholder="Enter your gender">
                            <option value=''></option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                        <img src={down_small} />
                    </div>
                </div> */}

                  <TextField
                    className="email-box"
                    fullWidth
                    id="city"
                    name="city"
                    label="City, State"
                    placeholder="Enter your city, state"
                    type="text"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />

                  <div className='linkbtn'>
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      type="submit"
                      className="btn btn-primary">
                      <span className="login-text">Continue</span>
                    </Button>
                    {/* <button type="submit"  className="btn btn-primary">Continue</button> */}
                  </div>
                </form>
              </div>
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

  )
}