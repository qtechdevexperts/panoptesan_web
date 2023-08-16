import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import maskGroup43 from "../../Assets/Images/maskGroup43.png";
import ellipse46 from "../../Assets/Images/ellipse46.png";
import ellipse515 from "../../Assets/Images/ellipse515.png";
import group778 from "../../Assets/Images/group778.png";
import group779 from "../../Assets/Images/group779.png";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import VideocamIcon from "@mui/icons-material/Videocam";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { GetDriver, GetVideos } from "../../Services/Auth";
import APP_ROLES from "../../SharedComponents/role";
import { VideoList } from "../../Components/VideoPlayer/List";
import "./FleetDriver.css";

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

export const FleetDriver = ({ role }) => {
  const [value, setValue] = React.useState(0);
  const [videos, setVideos] = React.useState([]);
  const [drivers, setDrivers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    GetFleetDrivers();
    GetFleetVideos();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDrivers = drivers.filter((driver) =>
    driver.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigationURL = (data) => {
    if (role === APP_ROLES.ADMIN) {
      navigate("/superadmin/fleet-user-profile", {
        state: { data: data },
      });
    } else if (role === APP_ROLES.FLEET_MANAGER) {
      navigate("/fleet-user-profile", { state: { data: data } });
    }
  };
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };
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
  const GetFleetVideos = async () => {
    try {
      const res = await GetVideos(APP_ROLES.FLEET_MANAGER);
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
  return (
    <Layout role={role}>
      <div class="body-wrapper">
        <div class="content">
          <Box sx={{ width: "100%" }}>
            {value ? (
              <div class="row my-4">
                <div class="col-lg-6 title-fleet">
                  <p>Videos Posted By Driver</p>
                </div>
                <div class="col-lg-6 video-tab">
                  <div class="btn-group dropdown-filter">
                    <button
                      type="button"
                      class="btn btn-primary dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      onChange={handleSearch}
                    >
                      Filter
                      <SearchIcon />
                    </button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li class="dropdown-header">Resources</li>
                      <li>
                        <label>
                          <input type="checkbox" />
                          Will
                        </label>
                        <label>
                          <input type="checkbox" />
                          Braine
                        </label>
                        <label>
                          <input type="checkbox" />
                          John
                        </label>
                        <label>
                          <input type="checkbox" />
                          Smith
                        </label>
                        <label>
                          <input type="checkbox" />
                          John
                        </label>
                      </li>
                      <li role="separator" class="divider"></li>

                      <li class="dropdown-header">Date</li>
                      <li class="d-flex">
                        <input type="date" class="form-control mr-2" />
                        <input type="date" class="form-control" />
                      </li>
                      <li class="action">
                        <button>Clear all filters</button>
                        <div>
                          <button>Cancel</button>
                          <button>Apply</button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div class="my-4">
                <div class="col-lg-6 title-fleet">
                  <p>Fleet Driver</p>
                </div>
                <div class="col-lg-6 d-flex justify-content-end">
                  <div class="search">
                    <SearchIcon style={{ color: "black" }} />
                    <input
                      className="fleet-input"
                      type="text"
                      placeholder="Search Driver..."
                      onChange={handleSearch}
                    />
                  </div>
                </div>
              </div>
            )}

            <Box
              className="box-button"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab className="tabs" label="Fleet Driver" {...a11yProps(0)} />
                <Tab
                  className="tabs"
                  label="Videos Posted By Driver"
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              {console.log("Tab value : ", value)}
              <div class="row">
                {filteredDrivers?.map((driver, index) => {
                  return (
                    <div key={driver?.id} class="col-lg-4">
                      <div class="driver mx-0 d-flex">
                        <div class="image">
                          <img src={maskGroup43} alt="" />
                        </div>
                        <div class="content driver-info">
                          <div className="driver-info-content d-flex justify-content-start">
                            <p class="driver-name">
                              {driver?.user_detail?.name}
                            </p>
                            <p class="driver-detail">
                              {driver?.user_detail?.description}
                            </p>
                          </div>
                          <div className="driver-info-btn">
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
            <TabPanel value={value} index={1}>
              {console.log("Tab value : ", value)}
              {/* <div class="row my-4">
                    <div class="col-lg-6">
                        <h2 class="title">Videos Posted By Driver</h2>
                    </div>
                    <div class="col-lg-6 text-lg-right">
                        <div class="btn-group dropdown-filter">
                            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                Filter 
                                <SearchIcon />
                            </button>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li class="dropdown-header">Resources</li>
                                <li>
                                    <label>
                                        <input type="checkbox" />Will
                                    </label>
                                    <label>
                                        <input type="checkbox" />Braine
                                    </label>
                                    <label>
                                        <input type="checkbox"/>John
                                    </label>
                                    <label>
                                        <input type="checkbox"/>Smith
                                    </label>
                                    <label>
                                        <input type="checkbox"/>John
                                    </label>
                                </li>
                                <li role="separator" class="divider"></li>

                                <li class="dropdown-header">Date</li>
                                <li class="d-flex">
                                    <input type="date" class="form-control mr-2"/>
                                    <input type="date" class="form-control"/>
                                </li>
                                <li class="action">
                                    <button>Clear all filters</button>
                                    <div>
                                        <button>Cancel</button>
                                        <button>Apply</button>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div> */}
              <div class="row m-0">
                <VideoList videos={videos} />
              </div>
            </TabPanel>
          </Box>
        </div>
      </div>
    </Layout>
  );
};
