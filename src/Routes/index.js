import { Routes, Route } from "react-router-dom";
import { Login } from "../Pages/Login/Login";
import APP_ROLES from "../SharedComponents/role";
import { Register } from "../Pages/Register/Register";
import { Navbar } from "../Components/Navbar";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProfileComponent } from "../Components/Profile/index";
import { ErrorPage } from "../Components/ErrorPage";
import { Profile } from "../Pages/Profile/Profile";
import { Layout } from "../Pages/Layout/Layout";
import { HomeComponents } from "../Components/Home";
import { Packages } from "../Pages/Packages/Packages";
import { Archive } from "../Pages/Archive/Archive";
import { ForgotPassword } from "../Pages/ForgotPassword/ForgotPassword";
import { OTP } from "../Pages/OTP/OTP";
import { SetPasswordPage } from "../Pages/SetPassword/SetPassword";
import { ProfileEdit } from "../Pages/ProfileEdit/ProfileEdit";
import {
  CreateDriver,
  CreateDriverProfile,
} from "../Pages/Driver/CreateDriver";
import { InviteDriver } from "../Pages/Driver/InviteDrivers";
import { FleetDriver } from "../Pages/FleetDrivers/FleetDrivers";
import { InviteDriverDetail } from "../Pages/Driver/DriverDetail";
import { ViewFleetDetails } from "../Pages/FleetDrivers/ViewFleetDetails";
import { PaymentMethod } from "../Pages/PaymentMethod/PaymentMethod";
import { EditFleetDriver } from "../Pages/FleetDrivers/EditFleetDriver";
import { NotificationPage } from "../Pages/Notification/Notification";
import { AdminHomeComponents } from "../Components/Home/AdminHome";
import TicketRequests from "../Pages/Requests/Requests";
import { useState } from "react";
import { Settings } from "../Pages/Settings/Settings";
import { Disclaimer } from "../Pages/Disclaimer/Disclaimer";
import { FAQs } from "../Pages/FAQs/FAQs";
import { Support } from "../Pages/Support/Support";
import { NotificationsListing } from "../Pages/Notifications/Notifications";
import { CreatePackagePage } from "../Pages/CreatePackage/CreatePackage";
import { PackageListing } from "../Pages/PackageListing/PackageListing";
import { TermsComponent } from "../Pages/TermsConditions/terms";
import { PrivacyComponent } from "../Pages/Privacy/index";
import { UsersList } from "../Pages/User/index";
import { EditUser } from "../Pages/User/edit-user";
import { GraphComponent } from "../Pages/Graph/index";
import { AdminProfilePageComponent } from "../Components/Profile/adminProfile";
import { AllVideos } from "../Pages/AllVideos/index";
import { About } from "../Pages/About/index";
import { Crash } from "../Pages/Crash/index";
import { DriverDetails } from "../Pages/DriverDetails/index";
import { match } from "assert";
import { UserContext } from "../Pages/User/index";
import React, { createContext } from "react";
import { MyContext } from "../Pages/MyContext";
const AppRouter = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [usersContext, setUsersContext] = useState({});
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Login setToken={setToken} role={APP_ROLES.FLEET_MANAGER} />}
      />
      <Route
        exact
        path="/login"
        element={<Login setToken={setToken} role={APP_ROLES.FLEET_MANAGER} />}
      />
      <Route
        exact
        path="/superadmin/login"
        element={<Login setToken={setToken} role={APP_ROLES.ADMIN} />}
      />
      <Route
        exact
        path="/register"
        element={<Register role={APP_ROLES.FLEET_MANAGER} />}
      />
      {/* <Route
        exact
        path="/superadmin/register"
        element={<Register role={APP_ROLES.ADMIN} />}
      /> */}
      <Route
        exact
        path="/set-password"
        element={<SetPasswordPage role={APP_ROLES.FLEET_MANAGER} />}
      />
      <Route
        exact
        path="/superadmin/set-password"
        element={<SetPasswordPage role={APP_ROLES.ADMIN} />}
      />
      <Route
        exact
        path="/home"
        element={
          <ProtectedRoute token={token}>
            <Layout role={APP_ROLES.FLEET_MANAGER}>
              <HomeComponents />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/superadmin/home"
        element={
          <Layout role={APP_ROLES.ADMIN}>
            <GraphComponent />
          </Layout>
        }
      />
      <Route
        exact
        path="/packages"
        element={
          <ProtectedRoute token={token}>
            <Packages role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/packages?user_id=${id}"
        element={
          <ProtectedRoute token={token}>
            <Packages role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/support"
        element={
          <ProtectedRoute token={token}>
            <Support role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      {/* <Route
        exact
        path="/superadmin/packages"
        element={
          <Packages role={APP_ROLES.ADMIN} />
        }
      /> */}
      <Route
        exact
        path="/archive"
        element={
          <ProtectedRoute token={token}>
            <Archive role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      {/* <Route
        exact
        path="/superadmin/archive"
        element={
          <Archive role={APP_ROLES.ADMIN} />
        }
      /> */}
      <Route
        exact
        path="/profile"
        element={
          <ProtectedRoute token={token}>
            <ProfileComponent role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/otp"
        element={
          <ProtectedRoute token={token}>
            <OTP role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/superadmin/otp"
        element={
          <ProtectedRoute token={token}>
            <OTP role={APP_ROLES.ADMIN} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/profile-detail"
        element={
          <ProtectedRoute token={token}>
            <Profile role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/superadmin/profile-detail"
        element={
          <Layout role={APP_ROLES.ADMIN}>
            <AdminProfilePageComponent role={APP_ROLES.ADMIN} />
          </Layout>
        }
      />
      <Route
        exact
        path="/forgot-password"
        element={<ForgotPassword role={APP_ROLES.FLEET_MANAGER} />}
      />
      <Route
        exact
        path="/superadmin/forgot-password"
        element={<ForgotPassword role={APP_ROLES.ADMIN} />}
      />
      <Route
        exact
        path="/profile-edit"
        element={
          <ProtectedRoute token={token}>
            <ProfileEdit role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="superadmin/create-package"
        element={
          <ProtectedRoute token={token}>
            <CreatePackagePage role={APP_ROLES.ADMIN} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/notifications"
        element={
          <ProtectedRoute token={token}>
            <NotificationsListing role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="superadmin/notificationslisting"
        element={
          <ProtectedRoute token={token}>
            <NotificationsListing role={APP_ROLES.ADMIN} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="superadmin/storagepackages"
        element={
          <ProtectedRoute token={token}>
            <PackageListing role={APP_ROLES.ADMIN} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/payment-method"
        element={
          <ProtectedRoute token={token}>
            <PaymentMethod role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/crash"
        element={
          <ProtectedRoute token={token}>
            <Layout role={APP_ROLES.FLEET_MANAGER}>
              <Crash />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/settings"
        element={
          <ProtectedRoute token={token}>
            <Settings role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/invite-driver"
        element={
          <ProtectedRoute token={token}>
            <InviteDriver role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/push-notifications"
        element={
          <ProtectedRoute token={token}>
            <NotificationPage role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/superadmin/notifications"
        element={
          <ProtectedRoute token={token}>
            <NotificationPage role={APP_ROLES.ADMIN} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/disclaimer"
        element={
          <ProtectedRoute token={token}>
            <Disclaimer role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/superadmin/disclaimer"
        element={
          <ProtectedRoute token={token}>
            <Disclaimer role={APP_ROLES.ADMIN} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/create-driver"
        element={
          <ProtectedRoute token={token}>
            <CreateDriverProfile role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/invite-driver-detail"
        element={
          <ProtectedRoute token={token}>
            <InviteDriverDetail role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/fleet-driver"
        element={
          <ProtectedRoute token={token}>
            <FleetDriver role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/superadmin/settings"
        element={
          <ProtectedRoute token={token}>
            <Settings role={APP_ROLES.ADMIN} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/faqs"
        element={
          <ProtectedRoute token={token}>
            <FAQs role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/superadmin/faqs"
        element={
          <ProtectedRoute token={token}>
            <FAQs role={APP_ROLES.ADMIN} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/support"
        element={
          <ProtectedRoute token={token}>
            <Support role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/superadmin/support"
        element={
          <ProtectedRoute token={token}>
            <Support role={APP_ROLES.ADMIN} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/about-app"
        element={
          <ProtectedRoute token={token}>
            <Layout role={APP_ROLES.FLEET_MANAGER}>
              <About />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/terms-conditions"
        element={
          <ProtectedRoute token={token}>
            <Layout role={APP_ROLES.FLEET_MANAGER}>
              <TermsComponent />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/privacy-policy"
        element={
          <ProtectedRoute token={token}>
            <Layout role={APP_ROLES.FLEET_MANAGER}>
              <PrivacyComponent />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/fleet-user-profile"
        element={
          <ProtectedRoute token={token}>
            <ViewFleetDetails role={APP_ROLES.FLEET_MANAGER} />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/superadmin/requests"
        element={
          <ProtectedRoute token={token}>
            <Layout role={APP_ROLES.ADMIN}>
              <TicketRequests />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/edit-fleetdriver"
        element={
          <ProtectedRoute token={token}>
            <Layout role={APP_ROLES.ADMIN}>
              <EditFleetDriver />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="superadmin/users"
        element={
          <ProtectedRoute token={token}>
            <Layout role={APP_ROLES.ADMIN}>
              <MyContext.Provider value={{ usersContext, setUsersContext }}>
                <UsersList />
              </MyContext.Provider>
            </Layout>
          </ProtectedRoute>
        }
      >
        <Route
          path=":id"
          element={
            <Layout role={APP_ROLES.ADMIN}>
              <DriverDetails />
            </Layout>
          }
        />
      </Route>

      <Route
        exact
        path="superadmin/edit-user"
        element={
          <ProtectedRoute token={token}>
            <Layout role={APP_ROLES.ADMIN}>
              <EditUser />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="superadmin/graph"
        element={
          <ProtectedRoute token={token}>
            <Layout role={APP_ROLES.ADMIN}>
              <GraphComponent />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/user/all-videos"
        element={
          <Layout role={APP_ROLES.FLEET_MANAGER}>
            <AllVideos role={APP_ROLES.FLEET_MANAGER} />
          </Layout>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
