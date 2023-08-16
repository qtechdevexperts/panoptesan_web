import visa from "../../Assets/Images/visa.png";
import paypal from "../../Assets/Images/paypal.png";
import pay from "../../Assets/Images/pay.png";
import "./index.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetPackage } from "../../Services/Profile";
import { useLocation } from "react-router-dom";
import APP_ROLES from "../../SharedComponents/role";

import { GetProfile } from "../../Services/Profile";
export const PackagesComponent = () => {
  const profileRole = localStorage.getItem("role");
  const [packages, setPackages] = useState([]);
  const [apiPayload, setApiPayload] = useState();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const fetchPackage = async () => {
    const data = await GetPackage();
    return data;
  };

  const fetchPackageData = () => {
    fetchPackage().then((data) => {
      setPackages(data?.data);
    });
  };

  useEffect(() => {
    fetchPackageData();
    fetchProfile().then((data) => {
      setApiPayload(data);
    });
  }, []);

  const userId = searchParams.get("user_id") ?? apiPayload?.data?.id;
  const fetchProfile = async () => {
    const user_role =
      profileRole === APP_ROLES.ADMIN
        ? APP_ROLES.ADMIN
        : APP_ROLES.FLEET_MANAGER;
    const profileData = await GetProfile(user_role);
    return profileData;
  };

  return (
    <div className="body-wrapper">
      <div className="content pt-4">
        <section className="section-container p-0 mt-2">
          <div className="archive-title mb-4">
            <p>Packages</p>
          </div>
          <div className="row">
            {packages?.map((item) => (
              <div className="col-lg-3 custom-column-gap mb-5" key={item.id}>
                <div className="packlist">
                  <div className="package-title">
                    <h6>{item.name} PACKAGE</h6>
                  </div>
                  <div className="description-container">
                    <div className="container">
                      <div
                        style={{ paddingRight: "12px" }}
                        className="tick-icon"
                      >
                        &#10003;
                      </div>
                      <div className="content-text">
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="package-price-container">
                    <h2 className="price">
                      <sup>{item.currency_symbol}</sup>
                      {item.price}
                    </h2>
                    <p>Monthly</p>
                  </div>
                  <Link
                    to={`/payment-method?user_id=${userId}&packageId=${
                      item.id
                    }&price=${item.price * 100}`}
                    className="btn btn-primary btn-sm w-50 package-btn"
                  >
                    Choose
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-start mt-5">
            <p className="grey">
              If you have any questions, please feel free to contact us.
            </p>
            <div className="d-flex justify-content-start align-items-center grey">
              We accept
              <img className="mx-2" src={visa} alt="..." />
              <img className="mx-2" src={paypal} alt="..." />
              <img className="" src={pay} alt="..." />
            </div>
          </div>
        </section>
        <script src="./assets/js/mlib.js"></script>
        <script src="./assets/js/functions.js"></script>
      </div>
    </div>
  );
};
