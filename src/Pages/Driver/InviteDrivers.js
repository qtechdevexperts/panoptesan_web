import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../Layout/Layout";

export const InviteDriver = ({ role }) => {
  return (
    <Layout role={role}>
      <div>
        <div className="body-wrapper">
          <div className="content">
            <section className="section-padding">
              <h2 className="title">Invite Driver</h2>
              <div className="d-flex invite-driver-btn">
                <Link
                  to={"/invite-driver-detail"}
                  className="btn btn-primary mr-20"
                  style={{margin: "5px"}}
                >
                  Invite Driver
                </Link>
                <Link 
                to={"/create-driver"} className="btn btn-secondary"
                style={{margin: "5px"}}
                >
                  Create Driver
                </Link>
              </div>
            </section>
          </div>
        </div>
        <script src="./assets/js/mlib.js"></script>
        <script
          type="text/javascript"
          src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"
        ></script>
        <script src="./assets/js/functions.js"></script>
      </div>
    </Layout>
  );
};
