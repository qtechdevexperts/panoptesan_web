import React from "react";
import company_logo from "../../Assets/Images/logo-w.png";
import home_logo from "../../Assets/Images/home_logo.png";
import profile_logo from "../../Assets/Images/profile_logo.png";
import archive_logo from "../../Assets/Images/archive_logo.png";
import subscription_logo from "../../Assets/Images/subscription_logo.png";
import terms_logo from "../../Assets/Images/terms_logo.png";
import about_logo from "../../Assets/Images/about_logo.png";
import privacy_logo from "../../Assets/Images/privacy_logo.png";
import settings_logo from "../../Assets/Images/settings_logo.png";
import faq_logo from "../../Assets/Images/settings_logo.png";
import verify_logo from "../../Assets/Images/verify_logo.png";
import crash_logo from "../../Assets/Images/crash_logo.png";
import logout_logo from "../../Assets/Images/logout_logo.png";
import fleet_logo from "../../Assets/Images/fleet_logo.png";
import invite_logo from "../../Assets/Images/invite_logo.png";
import bell_logo from "../../Assets/Images/bell_logo.png";
import profile_image from "../../Assets/Images/profile_image.png";
import { HomeComponents } from "../Home/index.js";
// import { Layout } from '../Layout/Layout'
import { Navbar } from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import QuickreplyOutlinedIcon from "@mui/icons-material/QuickreplyOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import APP_ROLES from "../../SharedComponents/role";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import { AutoGraphOutlined } from "@mui/icons-material";

export const Sidebar = ({ role }) => {
  return (
    <div class="sidebar">
      <div class="sidebar-logo">
        <img class="logo" src={company_logo} alt="logo" />
      </div>
      {role === APP_ROLES.ADMIN ? <AdminSidebar /> : <UserSidebar />}
    </div>
  );
};

export const AdminSidebar = () => {
  const navigationURL = useNavigate();
  const navigation = (url) => {
    navigationURL(url);
  };
  return (
    <ul class="side-menu ">
      <li class="menu-item active">
        <a
          onClick={() => navigation("/superadmin/home")}
          class="menu-link"
          style={{ textDecoration: "none" }}
        >
          <HomeOutlinedIcon style={{ fontSize: "23px", marginRight: "10px" }} />
          Home
        </a>
      </li>

      <li class="menu-item">
        <a
          onClick={() => navigation("/superadmin/users")}
          class="menu-link"
          style={{ textDecoration: "none" }}
        >
          <InventoryOutlinedIcon
            style={{ fontSize: "23px", marginRight: "10px" }}
          />
          Users
        </a>
      </li>
      <li class="menu-item">
        <a
          onClick={() => navigation("/superadmin/create-package")}
          class="menu-link"
          style={{ textDecoration: "none" }}
        >
          <InventoryOutlinedIcon
            style={{ fontSize: "23px", marginRight: "10px" }}
          />
          Create Package
        </a>
      </li>
      <li class="menu-item">
        <a
          onClick={() => navigation("/superadmin/storagepackages")}
          class="menu-link"
          style={{ textDecoration: "none" }}
        >
          <ChecklistOutlinedIcon
            style={{ fontSize: "23px", marginRight: "10px" }}
          />
          Package Listing
        </a>
      </li>
      <li class="menu-item">
        <a
          onClick={() => navigation("/superadmin/requests")}
          style={{ textDecoration: "none" }}
          class="menu-link"
        >
          <FolderCopyOutlinedIcon
            style={{ fontSize: "23px", marginRight: "10px" }}
          />
          Requests
        </a>
      </li>
      <li class="menu-item">
        <a
          onClick={() => navigation("/superadmin/settings")}
          style={{ textDecoration: "none" }}
          class="menu-link"
        >
          <SettingsOutlinedIcon
            style={{ fontSize: "23px", marginRight: "10px" }}
          />
          Settings
        </a>
      </li>

      <li class="menu-item logout">
        <a
          onClick={() => navigation("/superadmin/login")}
          style={{ textDecoration: "none" }}
          class="menu-link"
        >
          <LogoutOutlinedIcon
            style={{ fontSize: "23px", marginRight: "10px" }}
          />
          Logout
        </a>
      </li>
    </ul>
  );
};

export const UserSidebar = () => {
  const navigationURL = useNavigate();
  const navigation = (url) => {
    navigationURL(url);
  };
  return (
    <ul class="side-menu ">
      <li class="menu-item active">
        <Link to={"/home"} class="menu-link" style={{ textDecoration: "none" }}>
          <HomeOutlinedIcon style={{ fontSize: "23px", marginRight: "10px" }} />
          Home
        </Link>
      </li>
      <li class="menu-item">
        <Link
          to={"/profile-detail"}
          style={{ textDecoration: "none" }}
          class="menu-link"
        >
          <AccountCircleOutlinedIcon
            style={{ fontSize: "23px", marginRight: "10px" }}
          />
          Profile
        </Link>
      </li>
      <li class="menu-item">
        <Link
          to={"/archive"}
          style={{ textDecoration: "none" }}
          class="menu-link"
        >
          <FolderCopyOutlinedIcon
            style={{ fontSize: "23px", marginRight: "10px" }}
          />
          Archive
        </Link>
      </li>
      <li class="menu-item">
        <Link
          to={"/packages"}
          style={{ textDecoration: "none" }}
          class="menu-link"
        >
          <CalendarMonthOutlinedIcon
            style={{ fontSize: "23px", marginRight: "10px" }}
          />
          Storage Packages
        </Link>
      </li>
      <li class="menu-item">
        <Link
          to={"/terms-conditions"}
          style={{ textDecoration: "none" }}
          class="menu-link"
        >
          <ListAltOutlinedIcon
            style={{ fontSize: "23px", marginRight: "10px" }}
          />
          Term & Conditions
        </Link>
      </li>
      <li class="menu-item">
        <Link
          to={"/about-app"}
          style={{ textDecoration: "none" }}
          class="menu-link"
        >
          <BorderColorOutlinedIcon
            style={{ fontSize: "23px", marginRight: "10px" }}
          />
          About App
        </Link>
      </li>
      <li class="menu-item">
        <Link
          to={"/privacy-policy"}
          style={{ textDecoration: "none" }}
          class="menu-link"
        >
          <ListAltOutlinedIcon
            style={{ fontSize: "23px", marginRight: "10px" }}
          />
          Privacy Policy
        </Link>
      </li>
      <li class="menu-item">
        <Link
          to={"/settings"}
          style={{ textDecoration: "none" }}
          class="menu-link"
        >
          <SettingsOutlinedIcon
            style={{ fontSize: "23px", marginRight: "10px" }}
          />
          Settings
        </Link>
      </li>
      <li class="menu-item">
        <Link to={"/faqs"} style={{ textDecoration: "none" }} class="menu-link">
          <HelpOutlineOutlinedIcon
            style={{ fontSize: "23px", marginRight: "10px" }}
          />
          FAQs
        </Link>
      </li>
      <li class="menu-item">
        <Link
          to={"/crash"}
          style={{ textDecoration: "none" }}
          class="menu-link"
        >
          <QuickreplyOutlinedIcon
            style={{ fontSize: "23px", marginRight: "10px" }}
          />
          Crash
        </Link>
      </li>
      <li class="menu-item logout">
        <Link
          to={"/login"}
          style={{ textDecoration: "none" }}
          class="menu-link"
        >
          <LogoutOutlinedIcon
            style={{ fontSize: "23px", marginRight: "10px" }}
          />
          Logout
        </Link>
      </li>
      <li class="menu-item">
        <Link
          to={"/fleet-driver"}
          style={{ textDecoration: "none" }}
          class="menu-link"
        >
          <PeopleAltOutlinedIcon
            style={{ fontSize: "23px", marginRight: "10px" }}
          />
          Fleet Driver
        </Link>
      </li>
      <li class="menu-item">
        <Link
          to={"/invite-driver"}
          style={{ textDecoration: "none" }}
          class="menu-link"
        >
          <DirectionsCarFilledOutlinedIcon
            style={{ fontSize: "23px", marginRight: "10px" }}
          />
          Invite Drivers
        </Link>
      </li>
    </ul>
  );
};
