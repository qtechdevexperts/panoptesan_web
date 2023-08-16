import React from "react";
import "./index.css";
import company_logo from "../../Assets/Images/company_logo.png";
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
import { HomeComponents } from "../../Components/Home/index.js";
import { useNavigate } from "react-router-dom";
import APP_ROLES from "../../SharedComponents/role";

export const Navbar = ({ role, children }) => {
  const navigationURL = useNavigate();
  const navigation = (url) => {
    navigationURL(url);
  };
  return (
    <div className="">
      <div className="sidebar-inverted">
        <div className="sidebar">
          <div className="sidebar-logo">
            <img src={company_logo} />
          </div>
          <div className="sidebar-menu">
            <div className="sidebar-menu-1">
              <div onClick={() => navigation("/home")} className="outter-box">
                <img src={home_logo} />
                <p>Home</p>
              </div>
              <div
                onClick={() =>
                  navigation(
                    role === APP_ROLES.ADMIN
                      ? "/superadmin/profile-detail"
                      : "/profile-detail"
                  )
                }
                className="outter-box"
              >
                <img src={profile_logo} />
                <p>Profile</p>
              </div>
              <div className="outter-box">
                <img src={archive_logo} />
                <p>Archive</p>
              </div>
              <div className="outter-box">
                <img src={subscription_logo} />
                <p>Storage Packages</p>
              </div>
              <div className="outter-box">
                <img src={terms_logo} />
                <p>Terms & Conditions</p>
              </div>
              <div className="outter-box">
                <img src={about_logo} />
                <p>About app</p>
              </div>
              <div className="outter-box">
                <img src={privacy_logo} />
                <p>Privacy Policy</p>
              </div>
              <div className="outter-box">
                <img src={settings_logo} />
                <p>Settings</p>
              </div>
              <div className="outter-box">
                <img src={faq_logo} />
                <p>FAQs</p>
              </div>
              <div className="outter-box">
                <img src={verify_logo} />
                <p>Verified History</p>
              </div>
              <div className="outter-box">
                <img src={crash_logo} />
                <p>Crash</p>
              </div>
              <div className="outter-box">
                <img src={logout_logo} />
                <p>Logout</p>
              </div>
            </div>
            <div className="sidebar-menu-2">
              <div className="outter-box">
                <img src={fleet_logo} />
                <p>Fleet Driver</p>
              </div>
              <div className="outter-box">
                <img src={invite_logo} />
                <p>Invite Drivers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="">
        <div className="navbar">
          <div className="navbar-inner">
            <div className="navbar-inner-bell-icon">
              <p>2</p>
              <img src={bell_logo} />
            </div>
            <div className="profile-button">
              <div className="profile-button-img-container">
                <img src={profile_image} />
              </div>
              <div className="profile-button-text-container">
                <h5>Name</h5>
                <p>Email</p>
              </div>
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};
