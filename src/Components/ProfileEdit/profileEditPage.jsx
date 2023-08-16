import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GetProfile,
  UpdateProfile,
  UploadProfilePic,
} from "../../Services/Profile";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import group778 from "../../Assets/Images/group778.png";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export const ProfileEditPageComponent = ({ role }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    detail: "",
    dobDate: "",
    dobMonth: "",
    dobYear: "",
    gender: "",
  });
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    username: yup.string().min(2, "Username must be at least 4 characters"),
    password: yup.string().min(8, "Password must be at least 8 characters"),
    detail: yup
      .string()
      .min(15, "Description must be at least 15 characters")
      .required("Description is required"),
  });

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleRegister(values);
    },
  });
  const [apiPayload, setApiPayload] = useState({});

  const handleRegister = (formData) => {
    const payload = {
      name: formData.name,
      username: formData.username,
      ...(formData.password && { password: formData.password }),
      dob: `${formData.dobDate}-${formData.dobMonth}-${formData.dobYear}`,
      gender: formData.gender,
      description: formData.detail,
    };
    UpdateProfile(payload).then((res) => {
      navigate("/profile-detail");
    });
  };

  const fetchProfile = async () => {
    const profileData = await GetProfile();
    return profileData;
  };

  const uploadProfilePic = async (pic) => {
    const profileData = await UploadProfilePic(pic);
    return profileData;
  };

  const fetchProfileData = () => {
    fetchProfile().then((data) => {
      setApiPayload(data);
      setFormData({
        name: data.data.user_detail.name,
        gender: data.data.user_detail.gender,
        dobDate: data.data.user_detail.dob.split("-")[0],
        dobMonth: data.data.user_detail.dob.split("-")[1],
        dobYear: data.data.user_detail.dob.split("-")[2],
        detail: data.data.user_detail.description,
        username: data.data.username,
      });
    });
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("photo", file);
    uploadProfilePic(formData).then((res) => {
      fetchProfileData();
    });
  };

  return (
    <div class="body-wrapper">
      <div class="content">
        <section class="section-padding">
          <div class="row">
            <div class="col-lg-10">
              <form class="" autocomplete="off" onSubmit={formik.handleSubmit}>
                <div class="proimg">
                  <img
                    src={apiPayload?.data?.user_detail?.profile_img || group778}
                    alt=""
                  />
                  <div class="upload cam">
                    <input type="file" onChange={handleFileInputChange} />
                    <CameraAltIcon
                      style={{ color: "white", fontSize: "25px" }}
                    />
                  </div>
                </div>
                <h2 class="title">{apiPayload?.data?.user_detail?.name}</h2>
                <p>{apiPayload?.data?.email}</p>
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
                      <label>Username</label>
                      <input
                        type="text"
                        class="form-control"
                        autocomplete="off"
                        required
                        value={formData.username}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            username: e.target.value,
                          });
                        }}
                      />
                      {formik.errors.username && (
                        <span style={{ color: "red" }}>
                          {formik.errors.username}
                        </span>
                      )}
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        autocomplete="off"
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          });
                        }}
                      />
                      {formik.errors.password && (
                        <span style={{ color: "red" }}>
                          {formik.errors.password}
                        </span>
                      )}
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-row row">
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label class="">Date</label>
                          <select
                            name=""
                            id=""
                            class="form-control"
                            value={formData.dobDate}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                dobDate: e.target.value,
                              });
                            }}
                          >
                            <option value="01">1</option>
                            <option value="02">2</option>
                            <option value="03">3</option>
                            <option value="04">4</option>
                            <option value="05">5</option>
                            <option value="06">6</option>
                            <option value="07">7</option>
                            <option value="08">8</option>
                            <option value="09">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label class="">Month</label>
                          <select
                            name=""
                            id=""
                            class="form-control"
                            value={formData.dobMonth}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                dobMonth: e.target.value,
                              });
                            }}
                          >
                            <option value="01">Jan</option>
                            <option value="02">Feb</option>
                            <option value="03">Mar</option>
                            <option value="04">Apr</option>
                            <option value="05">May</option>
                            <option value="06">Jun</option>
                            <option value="07">Jul</option>
                            <option value="08">Aug</option>
                            <option value="09">Sep</option>
                            <option value="10">Oct</option>
                            <option value="11">Nov</option>
                            <option value="12">Dec</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label class="">Year</label>
                          <select
                            name=""
                            id=""
                            class="form-control"
                            value={formData.dobYear}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                dobYear: e.target.value,
                              });
                            }}
                          >
                            <option value="1990">1990</option>
                            <option value="1991">1991</option>
                            <option value="1992">1992</option>
                            <option value="1993">1993</option>
                            <option value="1994">1994</option>
                            <option value="1995">1995</option>
                            <option value="1996">1996</option>
                            <option value="1997">1997</option>
                            <option value="1998">1998</option>
                            <option value="1999">1999</option>
                            <option value="2000">2000</option>
                            <option value="2001">2001</option>
                            <option value="2002">2002</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="">Gender</label>
                      <select
                        name=""
                        id=""
                        class="form-control"
                        value={formData.gender}
                        onChange={(e) => {
                          setFormData({ ...formData, gender: e.target.value });
                        }}
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="">Other</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label>About yourself</label>
                      <input
                        type="text"
                        class="form-control"
                        autocomplete="off"
                        required
                        value={formData.detail}
                        onChange={(e) => {
                          setFormData({ ...formData, detail: e.target.value });
                        }}
                      />
                      {formik.errors.detail && (
                        <span style={{ color: "red" }}>
                          {formik.errors.detail}
                        </span>
                      )}
                    </div>
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
