import React, { useState, useEffect } from "react";
import "./index.css";
import cover from "../../Assets/Images/bsten3_create_a_background_for_a_website_with_a_light_blue_wash_1144f318-4ead-43db-8410-d6efc6865f3c.png";
import profile from "../../Assets/Images/pro2.png";
import { Link, useNavigate } from "react-router-dom";
import APP_ROLES from "../../SharedComponents/role";
import { useFormik } from "formik";
import * as yup from "yup";
import { Alert, Button, MenuItem, Snackbar } from "@mui/material";
import { Profile, UploadProfile } from "../../Services/Auth";
import "../../Pages/Profile/Profile.css";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import { GetProfile, GetVideos } from "../../Services/Profile";
import { VideoList } from "../VideoPlayer/List";

export const ProfilePageComponent = ({ role }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [selectedFile, setSelectedFile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
    uploadProfilePic();
  };
  const [apiPayload, setApiPayload] = useState({});
  const fetchProfile = async () => {
    const profileData = await GetProfile();
    return profileData;
  };
  const getVideos = async () => {
    const user_role =
      role === APP_ROLES.ADMIN ? APP_ROLES.ADMIN : APP_ROLES.FLEET_MANAGER;
    const videoData = await GetVideos(user_role, offset, limit);
    return videoData;
  };
  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset(offset - 1);
    }
  };

  const handleNextPage = () => {
    setOffset(offset + 1);
  };
  useEffect(() => {
    fetchProfile().then((data) => {
      setApiPayload(data);
    });
  }, []);
  useEffect(() => {
    getVideos().then((data) => {
      setVideos(data.data);
    });
  }, [offset, limit]);
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const navigationURL = useNavigate();
  const navigateToHome = () => {
    if (role === APP_ROLES.ADMIN) {
      navigationURL("/superadmin/home");
    }
    if (role === APP_ROLES.FLEET_MANAGER) {
      navigationURL("/home");
    }
  };
  const previewImage = () => {
    const chooseFile = document.getElementById("image-upload");
    const imgPreview = document.getElementById("dp");
    const files = chooseFile.files[0];
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", function () {
        imgPreview.style.backgroundImage = `url(${this.result})`;
      });
    }
  };
  const uploadProfilePic = async () => {
    try {
      const formData = new FormData();
      formData.append("photos", selectedFile);
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
  };
  const handleProfile = async (values) => {
    try {
      const payload = JSON.stringify(values);
      const res = await Profile(APP_ROLES.FLEET_MANAGER, payload);
      if (+res?.code === 200) {
        // Handle success
        setSnackbarSeverity("success");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
        navigationURL("/home");
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
  const validationSchema = yup.object().shape({
    img: yup.string().required("Image is required"),
    name: yup.string().required("Name is required"),
    description: yup
      .string()
      .min(20, "Description must be at least 20 characters")
      .max(200, "Description must be maximum 200 characters")
      .required("Description is required"),
    dob: yup.string().required("DOB is required"),
    gender: yup
      .string()
      .required("gender is required")
      .test("gender-match", function (value) {
        if (
          value.toLowerCase() === "male" ||
          value.toLowerCase() === "female"
        ) {
          return value;
        }
      }),
    city: yup.string().required("city is required!"),
  });

  const formik = useFormik({
    initialValues: {
      img: "",
      name: "",
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
  };
  return (
    <>
      <div class="body-wrapper">
        <div class="content pt-4">
          <section class="section-container p-0 mt-2">
            <div class="cover-photo">
              <img
                src={apiPayload?.data?.user_detail?.cover_img || cover}
                alt=""
              />
              <div class="upload cover-upload">
                <Link to={"/profile-edit"}>
                  <BorderColorOutlinedIcon style={{ color: "white" }} />
                </Link>
              </div>
            </div>
            <div class="profile-info">
              <div class="proimg">
                <img
                  src={apiPayload?.data?.user_detail?.profile_img || profile}
                  alt=""
                />
              </div>
              <div className="user-details-outer">
                <div className="user-details">
                  <h4>{apiPayload?.data?.user_detail?.name}</h4>
                  <h6>{apiPayload?.data?.email}</h6>
                  <p>{apiPayload?.data?.user_detail?.description}</p>
                </div>

                <div
                  class="text-lg-right my-lg-0 my-4"
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "end",
                  }}
                >
                  <a
                    href="/packages"
                    class="btn btn-primary py-4"
                    style={{ width: "225px" }}
                  >
                    Buy Storage Pack
                  </a>
                </div>
              </div>
            </div>

            <div className="videos-section row mt-4 ml-0 px-4">
              <div className="profile-video-title">
                <p>Videos</p>
              </div>
              <hr />
              <div className="p-0 mt-3">
                <VideoList videos={videos} />
                <div className="d-flex justify-content-end">
                  {/* Render pagination buttons */}
                  {offset > 0 && (
                    <Button
                      style={{ marginRight: "15px" }}
                      onClick={handlePreviousPage}
                      variant="contained"
                    >
                      Previous
                    </Button>
                  )}
                  {videos?.length === limit && (
                    <Button onClick={handleNextPage} variant="contained">
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </section>
          <script src="./assets/js/mlib.js"></script>
          <script src="./assets/js/functions.js"></script>
        </div>
      </div>
    </>
  );
};
