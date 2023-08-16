import React, { useEffect, useState } from "react";
import profile from "../../Assets/Images/profile.png";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import NotificationBell from "./NotificationBell.js";
import { GetProfile } from "../../Services/Profile";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import APP_ROLES from "../../SharedComponents/role";
import { logoutUser } from "../../Services/Auth";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import "./index.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    "&:hover": {
      backgroundColor: "yellow",
    },
  },
}));

export const Header = ({ role }) => {
  const profileRole = localStorage.getItem("role");
  console.log("PROFILE ROLE");
  console.log(profileRole);
  const [apiPayload, setApiPayload] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigationURL = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNavigate = (url, url2) => {
    if (role === APP_ROLES.FLEET_MANAGER) {
      navigationURL(url);
    } else {
      navigationURL(url2);
    }
  };
  const logout = (url, url2) => {
    if (role === APP_ROLES.FLEET_MANAGER) {
      logoutUser(APP_ROLES.FLEET_MANAGER);
      navigationURL(url);
    } else {
      logoutUser(APP_ROLES.ADMIN);
      navigationURL(url2);
    }
  };
  const fetchProfile = async () => {
    const user_role =
      role === APP_ROLES.ADMIN ? APP_ROLES.ADMIN : APP_ROLES.FLEET_MANAGER;
    const profileData = await GetProfile(user_role);
    return profileData;
  };

  useEffect(() => {
    fetchProfile().then((data) => {
      setApiPayload(data);
    });
  }, []);
  const getInitials = (value) => {
    const initials = value
      ?.split(" ")
      ?.map((word) => word?.charAt(0))
      ?.join("");
    return initials;
  };

  const classes = useStyles();

  return (
    <header class="header-main">
      <div class="top-bar">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="navbar-right">
                <ul class="nav-menu">
                  <li class="nav-item dropdown notification">
                    <a
                      class="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{ marginRight: "40px", padding: "0" }}
                    >
                      {profileRole !== APP_ROLES.ADMIN && (
                        <div>
                          <Link to={"/notifications"}>
                            <NotificationBell />
                          </Link>
                        </div>
                      )}

                      {/* <i class="icon-Icon-awesome-bell"></i>
                        <span class="badge badge-pill badge-danger">5</span> */}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <ul>
                        <li>
                          <a href="#">
                            <i class="icon-Icon-awesome-bell"></i> Lorem ipsum
                            donet In eu purus libero.{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="icon-Icon-awesome-bell"></i> Lorem ipsum
                            donet In eu purus libero.{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="icon-Icon-awesome-bell"></i> Lorem ipsum
                            donet In eu purus libero.{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="icon-Icon-awesome-bell"></i> Lorem ipsum
                            donet In eu purus libero.{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li class="nav-item dropdown account-item">
                    <a
                      class="nav-link dropdown-toggle"
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      {apiPayload?.data?.user_detail?.profile_img ? (
                        <img
                          src={apiPayload?.data?.user_detail?.profile_img}
                          alt=""
                        />
                      ) : (
                        <Avatar sx={{ bgcolor: blue[500] }}>
                          {getInitials(apiPayload?.data?.user_detail?.name)}
                        </Avatar>
                      )}
                      <span style={{ marginLeft: "5px" }}>
                        <h4>{apiPayload?.data?.user_detail?.name}</h4>
                        <p>{apiPayload?.data?.email}</p>
                      </span>
                      <div style={{ marginLeft: "5px" }}>
                        <KeyboardArrowDownSharpIcon />
                      </div>
                    </a>
                    <div className="dropdown-menu">
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                        PaperProps={{
                          style: {
                            backgroundColor: "#E8F1FE",
                            borderRadius: "10px",
                            marginTop: "5px",
                            marginLeft: "60px",
                            padding: "8px 8px 4px 8px",
                            fontWeight: "light",
                          },
                        }}
                      >
                        <div className="menu-option">
                          <div className="menu-option-items">
                            <MenuItem
                              className={classes.menuItem}
                              onClick={() =>
                                handleNavigate(
                                  "/profile-detail",
                                  "/superadmin/profile-detail"
                                )
                              }
                            >
                              <p>My Profile</p>
                            </MenuItem>
                          </div>

                          <div className="menu-option-items">
                            <MenuItem
                              className={classes.menuItem}
                              onClick={() =>
                                handleNavigate(
                                  "/settings",
                                  "/superadmin/settings"
                                )
                              }
                            >
                              <p>Settings</p>
                            </MenuItem>
                          </div>

                          <div className="menu-option-items">
                            <MenuItem
                              className={classes.menuItem}
                              onClick={() =>
                                logout("/login", "/superadmin/login")
                              }
                            >
                              <p>Signout</p>
                            </MenuItem>
                          </div>
                        </div>
                      </Menu>
                    </div>

                    {/* <div
                        class="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <ul>
                          <li>
                            <a href="#" class="">
                              My Profile
                            </a>
                          </li>
                          <li>
                            <a href="#" class="">
                              Settings
                            </a>
                          </li>
                          <li>
                            <a href="#" class="logout-modal">
                              Signout
                            </a>
                          </li>
                        </ul>
                      </div> */}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
