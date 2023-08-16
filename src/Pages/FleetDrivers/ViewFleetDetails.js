import React, { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import driverImg from "../../Assets/Images/driver.png";
import { useLocation, useNavigate } from "react-router-dom";
import { GetDriverById, DeleteDriverById } from "../../Services/Auth";
import APP_ROLES from "../../SharedComponents/role";
import "./FleetDriver.css";
import { VideoList } from "../../Components/VideoPlayer/List";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import { Button } from "@mui/material";
export const ViewFleetDetails = ({ role }) => {
  const [driver, setDriver] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const { data } = location.state || "";
  useEffect(() => {
    getDriverDetails();
  }, [offset, limit]);
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };
  const navigationURL = (event, id) => {
    if (role === APP_ROLES.ADMIN) {
      navigate("/superadmin/packages");
    } else if (role === APP_ROLES.FLEET_MANAGER) {
      navigate(`/packages?user_id=${id}`);
    }
  };
  const getInitials = (value) => {
    const initials = value
      ?.split(" ")
      ?.map((word) => word?.charAt(0))
      ?.join("");
    return initials;
  };
  const getDriverDetails = async () => {
    try {
      const res = await GetDriverById(APP_ROLES.FLEET_MANAGER, data?.id);
      if (+res?.code === 200) {
        // Handle success
        setDriver(res?.data);
      } else if (+res?.code !== 200) {
        setDriver([]);
      }
    } catch (error) {
      // Handle error
      setDriver([]);
    }
  };
  const navigateToEdit = () => {
    navigate("/edit-fleetdriver", { state: { id: driver?.id } });
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset(offset - 1);
    }
  };

  const handleNextPage = () => {
    if (driver?.length === limit) {
      // Only proceed to the next page if the number of fetched drivers is equal to the limit
      setOffset(offset + 1);
    }
  };

  const handleProfileDelete = async () => {
    try {
      const res = await DeleteDriverById(APP_ROLES.FLEET_MANAGER, data?.id);
      if (+res?.code == 200) {
        // Handle success
        // setDriver(res?.data);

        navigate("/fleet-driver");
      } else if (+res?.code !== 200) {
        console.log("HEELO ELSE");
        setDriver([]);
      }
    } catch (error) {
      // Handle error
      console.log("Data Deleted Successfully");
      navigate("/fleet-driver");

      console.log("CAtch error");
      //setDriver([]);
    }
  };
  console.log("drivers in fleet details");
  console.log(driver);
  return (
    <Layout role={role}>
      <div class="body-wrapper">
        <div class="content">
          <section class="section-padding">
            <div class="text-right edit-delete">
              <a onClick={() => navigateToEdit()} class="btn btn-primary mr-2">
                Edit
              </a>
              <a onClick={handleProfileDelete} class="btn btn-secondary">
                Delete
              </a>
            </div>
            <div class="info">
              {driver?.user_detail?.profile_img ? (
                <img
                  class="proimg"
                  src={driver?.user_detail?.profile_img}
                  alt=""
                />
              ) : (
                <Avatar className="profile-avatar" sx={{ bgcolor: blue[500] }}>
                  {getInitials(driver.user_detail?.name)}
                </Avatar>
              )}
              <h2 class="title mb-2">{driver?.user_detail?.name}</h2>
              <p class="mb-1">
                <b>{driver?.email}</b>
              </p>
              <div class="row">
                <div class="col-lg-8">
                  <p>{driver?.user_detail?.description}</p>
                </div>
                <div class="col-lg-4 text-lg-right">
                  <a
                    style={{ fontSize: "12px" }}
                    onClick={(event) => navigationURL(event, driver?.id)}
                    class="btn btn-primary"
                  >
                    Increase Storage Pack
                  </a>
                </div>
              </div>

              <h4>{driver?.user_detail?.vehicle_make} Detail</h4>

              <h6 class="mb-1">Model</h6>
              <p>{driver?.user_detail?.vehicle_model}</p>

              <div class="row my-4">
                <div class="col-lg-3">
                  <h6 class="mb-1">Purchase Date</h6>
                  <p>
                    {new Date(
                      driver?.user_detail?.created_at
                    )?.toLocaleDateString(undefined, options)}
                  </p>
                </div>
                <div class="col-lg-3">
                  <h6 class="mb-1">Vehicle Name</h6>
                  <p>{driver?.user_detail?.vehicle_name}</p>
                </div>
                <div class="col-lg-3">
                  <h6 class="mb-1">Driving Habit</h6>
                  <p>{driver?.user_detail?.driving_habit}</p>
                </div>
              </div>
              <div class="row m-0">
                <div className="col-12 mb-5">
                  <hr />
                </div>
                {driver?.video_clips?.length > 0 ? (
                  <VideoList className="mt-6" videos={driver?.video_clips} />
                ) : (
                  <p className="d-flex justify-content-center align-items-center w-100 flex-column mt-5">
                    <MovieFilterIcon className="video-icon" />
                    <b className="blue">No Videos Found</b>
                  </p>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end">
              {/* Render pagination buttons */}

              {offset > 0 && (
                <Button
                  style={{
                    backgroundColor: "white", // Background color for normal state
                    color: "black", // Text color for normal state
                    fontWeight: "bold", // Font weight for normal state
                    padding: "10px 20px", // Padding for the button
                    borderRadius: "5px", // Border radius for the button
                    cursor: "pointer", // Show pointer cursor on hover
                    marginRight: "15px",
                    marginTop: "10px",
                  }}
                  onClick={handlePreviousPage}
                  variant="contained"
                >
                  Previous
                </Button>
              )}
              {driver?.length === limit && (
                <Button
                  style={{
                    backgroundColor: "white", // Background color for normal state
                    color: "black", // Text color for normal state
                    fontWeight: "bold", // Font weight for normal state
                    padding: "10px 20px", // Padding for the button
                    borderRadius: "5px", // Border radius for the button
                    cursor: "pointer", // Show pointer cursor on hover
                    marginRight: "15px",
                    marginTop: "10px",
                  }}
                  onClick={handleNextPage}
                  variant="contained"
                  disabled={driver?.length < limit} // Disable the button if there are no more drivers on the next page
                >
                  Next
                </Button>
              )}
            </div>
          </section>
          <script src="./assets/js/mlib.js"></script>
          <script src="./assets/js/functions.js"></script>
        </div>
      </div>
    </Layout>
  );
};
