import "./index.css";
import {
  DeleteStoragePackages,
  GetStoragePackages,
} from "../../Services/Profile";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const PackageListingComponent = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const deletePackage = async (id) => {
    const data = await DeleteStoragePackages(id);
    fetchNotifications();
    return data;
  };

  const fetchPackagesApi = async () => {
    const data = await GetStoragePackages(offset, limit);
    console.log("Packages Data");
    console.log(data);
    return data;
  };

  const fetchNotifications = () => {
    fetchPackagesApi().then((data) => {
      setPackages(data?.data);
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, [offset, limit]);

  const editPackage = (row) => {
    navigate({
      pathname: "/superadmin/create-package",
      search: `?id=${row.id}&name=${row.name}&price=${row.price}&storage=${row.storage}&currency_symbol=${row.currency_symbol}&description=${row.description}&type=${row.type}`,
    });
  };
  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset(offset - 1);
    }
  };

  const handleNextPage = () => {
    if (packages.length === limit) {
      // Only proceed to the next page if the number of fetched packages is equal to the limit
      setOffset(offset + 1);
    }
  };
  const handleLimit = (event) => {
    setLimit(parseInt(event.target.value));
  };
  return (
    <div className="body-wrapper">
      <div className="content">
        <section className="section-padding">
          <div className="archive-title mb-4">
            <p>Packages List</p>
          </div>
          <div>
            <label>Records To Display</label>
            <select className="mb-4" onChange={handleLimit} value={limit}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Rate
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Description
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {packages.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">
                      {row.currency_symbol}
                      {row.price}
                    </TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">
                      <div class="d-flex flex-row">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mr-3"
                          onClick={() => editPackage(row)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
                          onClick={() => deletePackage(row.id)}
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
            {packages?.length === limit && (
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
                disabled={packages?.length < limit} // Disable the button if there are no more packages on the next page
              >
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
