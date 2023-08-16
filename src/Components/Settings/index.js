import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import APP_ROLES from "../../SharedComponents/role";
import Switch from "@mui/material/Switch";
import "./index.css";
import { ToggleNotifications, ToggleCrashVideos } from "../../Services/Auth";
import { GetProfile } from "../../Services/Profile";
import Toggle from "react-toggle";
import "react-toggle/style.css";

const label = { inputProps: { "aria-label": "Switch demo" } };

export const SettingsPageComponent = ({ role }) => {
  const [profileData, setProfileData] = useState("");
  const profileRole = localStorage.getItem("role");

  const fetchProfile = async () => {
    const profile = await GetProfile(profileRole);
    return profile;
  };

  useEffect(() => {
    fetchProfile().then((data) => {
      setProfileData(data);
    });
  }, []);

  const handleToggle = async () => {
    try {
      const res = await ToggleNotifications(
        APP_ROLES.FLEET_MANAGER,
        !profileData?.data?.notification_enable ? 1 : 0
      );
      if (+res?.code === 200) {
        // Handle success
        setProfileData((prevData) => ({
          ...prevData,
          data: {
            ...prevData.data,
            notification_enable: !prevData.data.notification_enable,
          },
        }));
        console.log("HELLO SUCCESS");
      } else if (+res?.code !== 200) {
        console.log("Hello Failure");
      }
    } catch (error) {
      // Handle error
      console.log("Catch Block");
    }
  };

  const handleCrashToggle = async () => {
    try {
      const res = await ToggleCrashVideos(
        APP_ROLES.FLEET_MANAGER,
        !profileData?.data?.crash_enable ? 1 : 0
      );
      if (+res?.code === 200) {
        // Handle success
        setProfileData((prevData) => ({
          ...prevData,
          data: {
            ...prevData.data,
            crash_enable: !prevData.data.crash_enable,
          },
        }));
        console.log("HELLO SUCCESS");
      } else if (+res?.code !== 200) {
        console.log("Hello Failure");
      }
    } catch (error) {
      // Handle error
      console.log("Catch Block");
    }
  };

  return (
    <div class="body-wrapper">
      <div class="content">
        <section class="section-padding">
          <div class="row">
            <div class="col-lg-12">
              <h2 class="title">Settings</h2>
              <div class="notification">
                <ul>
                  {/* ... */}
                  <li>
                    <div class="custom-control custom-switch flex-style">
                      <label
                        class="custom-control-label"
                        for="Notifications"
                        data-toggle="modal"
                        data-target="#invite"
                      >
                        Notifications
                      </label>
                      <Toggle
                        checked={profileData?.data?.notification_enable}
                        onChange={handleToggle}
                      />
                    </div>
                  </li>
                  <li>
                    <Link
                      to={
                        role === APP_ROLES.FLEET_MANAGER
                          ? "/push-notifications"
                          : "/superadmin/notifications"
                      }
                    >
                      <div class="custom-control custom-switch">
                        <label
                          class="custom-control-label"
                          for="PushNotification"
                        >
                          Push Notification
                        </label>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={
                        role === APP_ROLES.FLEET_MANAGER
                          ? "/disclaimer"
                          : "/superadmin/disclaimer"
                      }
                    >
                      <div class="custom-control custom-switch">
                        <label class="custom-control-label" for="Disclaimer">
                          Disclaimer
                        </label>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={
                        role === APP_ROLES.FLEET_MANAGER
                          ? "/support"
                          : "/superadmin/support"
                      }
                    >
                      <div class="custom-control custom-switch">
                        <label class="custom-control-label" for="HelpSupport">
                          Help & Support
                        </label>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={
                        role === APP_ROLES.FLEET_MANAGER
                          ? "/faqs"
                          : "/superadmin/faqs"
                      }
                    >
                      <div class="custom-control custom-switch">
                        <label class="custom-control-label" for="FAQs">
                          FAQs
                        </label>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={
                        role === APP_ROLES.FLEET_MANAGER
                          ? "/invite-driver"
                          : "/superadmin/invite-driver"
                      }
                    >
                      <div class="custom-control custom-switch">
                        <label class="custom-control-label" for="InviteDrivers">
                          Invite Drivers
                        </label>
                      </div>
                    </Link>
                  </li>

                  <li>
                    <div class="custom-control custom-switch flex-style">
                      <label
                        class="custom-control-label"
                        for="CrashVideos"
                        data-toggle="modal"
                        data-target="#invite"
                      >
                        Crash Videos
                      </label>
                      <Toggle
                        checked={profileData?.data?.crash_enable}
                        onChange={handleCrashToggle}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
