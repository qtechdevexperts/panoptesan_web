import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import maskGroup43 from "../../Assets/Images/maskGroup43.png";
import "./index.css";
import { VideoList } from "../VideoPlayer/List";
import { useEffect } from "react";
import { GetVideos, GetDriver } from "../../Services/Auth";
import APP_ROLES from "../../SharedComponents/role";
import { Button } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const HomeComponents = ({ role }) => {
  const [videos, setVideos] = React.useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(1000);
  const [drivers, setDrivers] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    GetFleetVideos();
    GetFleetDrivers();
  }, [offset, limit]);

  const GetFleetDrivers = async () => {
    try {
      const res = await GetDriver(APP_ROLES.FLEET_MANAGER);
      if (+res?.code === 200) {
        // Handle success
        setDrivers(res?.data);
      } else if (+res?.code !== 200) {
        setDrivers([]);
      }
    } catch (error) {
      // Handle error
      setDrivers([]);
    }
  };
  const navigationURL = (data) => {
    if (role === APP_ROLES.ADMIN) {
      navigate("/superadmin/fleet-user-profile", {
        state: { data: data },
      });
    } else {
      navigate("/fleet-user-profile", { state: { data: data } });
    }
  };
  const GetFleetVideos = async () => {
    try {
      const res = await GetVideos(APP_ROLES.FLEET_MANAGER, offset, limit);
      if (+res?.code === 200) {
        // Handle success
        setVideos(res?.data);
      } else if (+res?.code !== 200) {
        setVideos([]);
      }
    } catch (error) {
      // Handle error
      setVideos([]);
    }
  };
  const handlePreviousPage = () => {
    if (offset > 1) {
      setOffset(offset - 1);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNextPage = () => {
    if (videos?.length === limit) {
      // Only proceed to the next page if the number of fetched packages is equal to the limit
      setOffset(offset + 1);
    }
  };
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextTab = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevTab = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const navigateToAllVideos = () => {
    navigate("/user/all-videos");
  };
  const itemsPerPage = 2; // Show 3 tabs per page

  // Calculate the start and end index of the drivers array to display for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, drivers.length);

  return (
    <div class="body-wrapper overflow-x-hidden">
      {/* <div class="video-title">
        <p>My Drivers</p>
      </div> */}
      <div className="">
        <div className="">
          <div className="flex flex-1 justify-end mr-20 mt-6"></div>
          <div className="grid grid-cols-3">
            <div class="video-title">
              <p className="ml-6">Fleet Driver</p>
            </div>
            <div></div>
            <button
              class="btn btn-primary btn-sm w-40 ml-52"
              onClick={navigateToAllVideos}
            >
              All Videos
            </button>
          </div>
          <div className="flex flex-1 justify-end mr-10">
            {drivers.length > itemsPerPage && (
              <div className=" ml-80">
                {/* Show navigation arrows only if there are more than itemsPerPage drivers */}
                <button
                  className="arrow-button"
                  onClick={handlePrevTab}
                  disabled={currentPage === 0}
                >
                  <ArrowBackIcon></ArrowBackIcon>
                </button>
              </div>
            )}
            {drivers.length > itemsPerPage && (
              <div className=" ml-16">
                {/* Show navigation arrows only if there are more than itemsPerPage drivers */}
                <button
                  className="arrow-button"
                  onClick={handleNextTab}
                  disabled={endIndex >= drivers.length}
                >
                  <ArrowForwardIcon className="h-16 w-16"></ArrowForwardIcon>
                </button>
              </div>
            )}{" "}
          </div>

          <div className="">
            <TabPanel value={value} index={0}>
              {console.log("Tab value : ")}
              <div class="row">
                {drivers?.slice(startIndex, endIndex).map((driver, index) => {
                  return (
                    <div key={driver?.id} className="col-lg-4">
                      {" "}
                      <div class="driver mx-0 d-flex">
                        <div class="image">
                          <img src={maskGroup43} alt="" />
                        </div>
                        <div class="content driver-info">
                          <div className="driver-info-content d-flex justify-content-start">
                            <p class="driver-name">
                              {driver?.user_detail?.name}
                            </p>
                          </div>
                          <div className="mr-4">
                            <button
                              class="btn btn-primary btn-sm w-100"
                              onClick={() => navigationURL(driver)}
                            >
                              View Detail
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabPanel>
          </div>
          <div></div>
        </div>
        <section className="ml-6">
          <div class="row mb-4">
            <div class="video-title">
              <p>Recent Videos</p>
            </div>
            <div class="col-lg-6 text-right">
              <a href="#" class="fz-30">
                <i class="icon-menu_navigation_direction_arrow_location_icon"></i>
              </a>
            </div>
          </div>
          <div className="video-list cols-1 md: cols-3">
            <VideoList videos={videos?.slice(0, 10)} />
          </div>
        </section>
        <script src="./assets/js/mlib.js"></script>
        <script src="./assets/js/functions.js"></script>
      </div>
    </div>
  );
};
