import React, { useEffect, useState, useContext, createContext } from "react";
import { GetAllUsers } from "../../Services/Auth";
import APP_ROLES from "../../SharedComponents/role";
import { Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";

import { useNavigate, Outlet } from "react-router-dom";
import { DeleteUser } from "../../Services/Auth";
import { MyContext } from "../MyContext";

export const UsersList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const { usersContext, setUsersContext } = useContext(MyContext);
  const [mainVisible, setMainVisible] = useState(true);

  useEffect(() => {
    GetUsers();
  }, [offset, limit]);

  const GetUsers = async () => {
    try {
      const res = await GetAllUsers(APP_ROLES.FLEET_MANAGER, offset, limit);
      if (+res?.code === 200) {
        // Handle success
        setUsers(res?.data.slice(0, limit));
      } else if (+res?.code !== 200) {
      }
    } catch (error) {
      // Handle error
    }
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset(offset - 1);
    }
  };

  const handleNextPage = () => {
    if (users.length === limit) {
      // Only proceed to the next page if the number of fetched users is equal to the limit
      setOffset(offset + 1);
    }
  };

  const handleLimit = (event) => {
    setLimit(parseInt(event.target.value));
  };
  const editUser = (user) => {
    navigate({
      pathname: "/superadmin/edit-user",
      search: `?id=${user?.id}&name=${user?.username}&email=${user?.email}`,
    });
  };
  const deleteUser = async (id) => {
    const data = await DeleteUser(id);
    // fetchNotifications();
    return data;
  };
  console.log("USERS LENGTH");
  console.log(users.length);

  const handleClick = (event, id) => {
    console.log("HANDKE CLICK ID");
    console.log(id);

    navigate(`/superadmin/users/${id}`);
    setMainVisible(false);
  };

  const userContextValue = {
    users1: users.map((user) => ({
      id: user.id,
      userName: user.username,
      email: user.email,
    })),
  };
  useEffect(() => {
    setUsersContext(userContextValue);
  }, [users]);

  return (
    <div>
      {mainVisible ? (
        <div>
          <div className="body-wrapper">
            <div className="content pt-4">
              <section className="section-container p-0 mt-2">
                <div id="main" className="archive-title mb-4">
                  <p>Users List</p>
                </div>
                <div>
                  <label>Records To Display</label>
                  <select className="mb-4" onChange={handleLimit} value={limit}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </select>
                </div>
              </section>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>

                      <TableCell style={{ fontWeight: "bold" }}>
                        Email
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Is Active
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Is Fleet
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users?.map((user) => (
                      <TableRow key={user?.id}>
                        <TableCell>{user?.id}</TableCell>

                        <TableCell
                          onClick={(e) =>
                            handleClick(
                              e,
                              user?.id,
                              user?.email,
                              user?.username
                            )
                          }
                        >
                          {user?.email}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user?.is_active ? "Active" : "Deactive "}
                            color={user?.is_active ? "success" : "warning"}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user?.is_fleet ? "Fleet" : "Driver"}
                            color={user?.is_fleet ? "success" : "warning"}
                          />
                        </TableCell>
                        <TableCell align="left">
                          <div class="d-flex flex-row">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-3"
                              onClick={() => editUser(user)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
                              onClick={() => deleteUser(user?.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="d-flex justify-content-end">
                {/* Render pagination buttons */}

                {offset > 0 && (
                  <Button
                    style={{
                      backgroundColor: "white", // Background color for normal state
                      color: "black", // Text color for normal state
                      fontWeight: "bold", // Font weight for normal state
                      padding: "10px 20px", // Padding for the button
                      borderRadius: "5px", // Border radius for the button
                      cursor: "pointer", // Show pointer cursor on hover
                      marginRight: "15px",
                      marginTop: "10px",
                    }}
                    onClick={handlePreviousPage}
                    variant="contained"
                  >
                    Previous
                  </Button>
                )}
                {users?.length === limit && (
                  <Button
                    style={{
                      backgroundColor: "white", // Background color for normal state
                      color: "black", // Text color for normal state
                      fontWeight: "bold", // Font weight for normal state
                      padding: "10px 20px", // Padding for the button
                      borderRadius: "5px", // Border radius for the button
                      cursor: "pointer", // Show pointer cursor on hover
                      marginRight: "15px",
                      marginTop: "10px",
                    }}
                    onClick={handleNextPage}
                    variant="contained"
                    disabled={users.length < limit} // Disable the button if there are no more users on the next page
                  >
                    Next
                  </Button>
                )}
              </div>
              <script src="./assets/js/mlib.js"></script>
              <script src="./assets/js/functions.js"></script>
            </div>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};
