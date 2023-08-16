import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { GetDriverDetailsByIdSuperAdmin } from "../../Services/Auth";
import APP_ROLES from "../../SharedComponents/role";
import { VideoList } from "../../Components/VideoPlayer/List";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import { Button } from "@mui/material";
import { MyContext } from "../MyContext";
export const DriverDetails = () => {
  const { usersContext, setUsersContext } = useContext(MyContext);
  const { users1 } = usersContext;
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const getDriverDetails = async () => {
    try {
      const res = await GetDriverDetailsByIdSuperAdmin(
        APP_ROLES.ADMIN,
        id,
        offset,
        limit
      );
      if (+res?.code === 200) {
        setVideos(res?.data);
      } else if (+res?.code !== 200) {
        // Handle other responses
      }
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    getDriverDetails();
  }, [id]);

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

  const selectedUser = users1?.filter((user) => user.id === parseInt(id));

  console.log("IN DRIVER DETAILS");
  console.log(users1);
  console.log(selectedUser);

  return (
    <div className="mt-36">
      <div>
        <div className="font-extrabold ml-96 text-left ">
          Name: {selectedUser.length > 0 ? selectedUser[0].userName : ""}
        </div>
        <div className="font-extrabold ml-96 text-left">
          Email: {selectedUser.length > 0 ? selectedUser[0].email : ""}
        </div>
      </div>

      <div className="ml-96">
        <h1 className="font-extrabold text-black mt-4 text-left">Videos</h1>
        {videos?.length ? (
          <div>
            <VideoList videos={videos} />
            <div className="d-flex justify-content-end">
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
          </div>
        ) : (
          <p className="d-flex justify-content-center align-items-center w-100 flex-column">
            <MovieFilterIcon className="video-icon" />
            <b className="blue">No Videos Found</b>
          </p>
        )}
      </div>
    </div>
  );
};
