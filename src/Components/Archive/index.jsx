import { useEffect, useState } from "react";
import { VideoList } from "../VideoPlayer/List";
import {
  GetArchiveVideos,
  GetVideos,
  GetFilterVideos,
} from "../../Services/Auth";
import APP_ROLES from "../../SharedComponents/role";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import "./index.css";
import { Button } from "@mui/material";
export const ArchiveComponent = () => {
  const today = new Date().toISOString().slice(0, 10);

  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(today);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetFleetVideos();
  }, [offset, limit]);

  const GetFleetVideos = async () => {
    try {
      const res = await GetVideos(APP_ROLES.FLEET_MANAGER, offset, limit);
      if (+res?.code === 200) {
        // Handle success
        setVideos(res?.data);
        setIsLoading(false);
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
      setOffset(offset + 1);
    }
  };

  const GetFilteredVideos = async () => {
    setIsLoading(true);
    try {
      const res = await GetFilterVideos(
        APP_ROLES.FLEET_MANAGER,
        startDate,
        endDate
      );
      if (+res?.code === 200) {
        // Handle success
        setVideos(res?.data);
        setIsLoading(false);
        console.log("HELLO SUCCESS" + videos);
      } else if (+res?.code !== 200) {
        setVideos([]);
      }
    } catch (error) {
      // Handle error
      setVideos([]);
    }
  };
  console.log(videos);
  return (
    <div class="body-wrapper">
      <div class="content pt-4">
        <section class="section-container p-0 mt-2">
          <div class="row mb-4">
            <div className="archive-title">
              <p>Archive</p>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-auto">
              <label>Start Date: </label>
              <input
                type="date"
                className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>

            <div class="col-auto">
              <label>End Date: </label>
              <input
                type="date"
                className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>
            {startDate ? (
              <div class="col-auto">
                <input
                  type="button"
                  value="Search"
                  class="btn btn-primary btn-sm w-100 mt-10"
                  onClick={GetFilteredVideos}
                />
              </div>
            ) : (
              <div class="col-auto">
                <p className=" mt-5 font-extrabold text-red-700">
                  Please Select Start Date To Search
                </p>
              </div>
            )}
          </div>
          {videos.length ? (
            <VideoList videos={videos} />
          ) : (
            <p className="d-flex justify-content-center align-items-center w-100 flex-column">
              <MovieFilterIcon className="video-icon" />
              <b className="blue">No Videos Found</b>
            </p>
          )}

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
