import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import maskGroup43 from "../../Assets/Images/maskGroup43.png";
import "../AllVideos/index";
import { VideoList } from "../../Components/VideoPlayer/List";
import { useEffect } from "react";
import { GetVideos, GetDriver } from "../../Services/Auth";
import APP_ROLES from "../../SharedComponents/role";
import { Button } from "@mui/material";

export const AllVideos = ({ role }) => {
  const [videos, setVideos] = React.useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();
  console.log("videos lenght");
  console.log(videos?.length);
  useEffect(() => {
    GetFleetVideos();
  }, [offset, limit]);

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
    if (offset > 0) {
      setOffset(offset - 1);
    }
  };

  const handleNextPage = () => {
    if (videos?.length === limit) {
      // Only proceed to the next page if the number of fetched packages is equal to the limit
      setOffset(offset + 1);
    }
  };

  const navigateToHome = () => {
    navigate("/home");
  };

  console.log("DRIVERS OFF SET LIMIT");
  console.log(offset);
  console.log(limit);
  console.log(videos?.length);
  return (
    <div class="body-wrapper overflow-x-hidden">
      {/* <div class="video-title">
        <p>My Drivers</p>
      </div> */}
      <div className="">
        <section class="section-container">
          <div class="row mb-4">
            <div className="grid grid-cols-3">
              <div class="video-title">
                <p className="ml-6">All Videos</p>
              </div>
              <div></div>
              <button
                class="btn btn-primary btn-sm w-40 ml-52 mt-5"
                onClick={navigateToHome}
              >
                Back To Home
              </button>
            </div>
            <div class="col-lg-6 text-right">
              <a href="#" class="fz-30">
                <i class="icon-menu_navigation_direction_arrow_location_icon"></i>
              </a>
            </div>
          </div>
          <div className="video-list cols-1 md: cols-3 ml-6">
            <VideoList videos={videos} />
          </div>

          <div className="d-flex justify-content-end">
            {/* Render pagination buttons */}
            {offset > 0 && (
              <Button
                style={{ marginRight: "15px" }}
                onClick={handlePreviousPage}
                variant="contained"
              >
                Previous
              </Button>
            )}
            {videos?.length === limit && (
              <Button onClick={handleNextPage} variant="contained">
                Next
              </Button>
            )}
          </div>
        </section>
        <script src="./assets/js/mlib.js"></script>
        <script src="./assets/js/functions.js"></script>
      </div>
    </div>
  );
};
