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

export const AdminProfilePageComponent = ({ role }) => {
  const profileRole = localStorage.getItem("role");
  const [videos, setVideos] = useState([]);

  const [apiPayload, setApiPayload] = useState({});

  const fetchProfile = async () => {
    const profileData = await GetProfile(profileRole);
    return profileData;
  };

  useEffect(() => {
    fetchProfile().then((data) => {
      setApiPayload(data);
    });
  }, []);

  console.log("ADMIN PRFILE MY PAGE");
  console.log(apiPayload);
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
