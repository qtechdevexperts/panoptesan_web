import React, { useEffect, useState } from "react";
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
  Button,
} from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import "./Requests.css";
import { ApproveRequests, GetRequests } from "../../Services/Auth";
import APP_ROLES from "../../SharedComponents/role";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@material-ui/core";
import check from "../../Assets/Images/check.svg";
import DialogContent from "@mui/material/DialogContent";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { clsx } from "clsx";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const useStyles = makeStyles({
  outlinedInput: {
    borderRadius: "20px", // Adjust the value as per your preference
  },
  inputLabel: {
    padding: 0, // Remove padding around the label
  },
});

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const TicketRequests = ({ role }) => {
  const [requests, setRequests] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [activeTab, setActiveTab] = useState("BECOME_FLEET");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  useEffect(() => {
    GetFleetVideos();
  }, [activeTab, offset, limit]);

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset(offset - 1);
    }
  };

  const handleNextPage = () => {
    console.log(requests.length);
    if (requests.length === limit) {
      // Only proceed to the next page if the number of fetched requests is equal to the limit
      setOffset(offset + 1);
    }
  };

  const GetFleetVideos = async () => {
    try {
      const res = await GetRequests(APP_ROLES.ADMIN, activeTab, offset, limit);
      if (+res?.code === 200) {
        // Handle success
        setRequests(res?.data);
      } else if (+res?.code !== 200) {
        setRequests([]);
      }
    } catch (error) {
      // Handle error
      setRequests([]);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApprove = async (id) => {
    // Handle edit action here
    try {
      const res = await ApproveRequests(APP_ROLES.ADMIN, id);
      if (+res?.code === 200) {
        // Handle success
        GetFleetVideos();
        handleClickOpen();
      } else if (+res?.code !== 200) {
        setSnackbarSeverity("error");
        setSnackbarMessage(res?.message);
        setSnackbarOpen(true);
      }
    } catch (error) {
      // Handle error
      setSnackbarSeverity("error");
      setSnackbarMessage(error);
      setSnackbarOpen(true);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setLimit(10);
    setOffset(0);
  };
  const handleLimit = (event) => {
    setLimit(parseInt(event.target.value));
  };
  console.log("TICKET REQS");
  console.log(requests.length);

  return (
    <div className="body-wrapper padding">
      <div className="content">
        <div className="container grid grid-cols-2 mb-4">
          <button
            onClick={() => handleTabClick("BECOME_FLEET")}
            className={clsx(
              "rounded-lg w-36 p-2 border-1 font-bold border-black text-center content-end mr-2",
              { "bg-gray-400": activeTab === "BECOME_FLEET" }
            )}
          >
            Fleet Requests
          </button>
          <button
            onClick={() => handleTabClick("OTHERS")}
            className={clsx(
              "rounded-lg w-36 p-2 border-1 font-bold border-black text-center content-end mr-2",
              { "bg-gray-400": activeTab === "OTHERS" }
            )}
          >
            Others
          </button>
        </div>
        <div>
          <label>Records To Display</label>
          <select className="mb-4" onChange={handleLimit} value={limit}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        {activeTab === "BECOME_FLEET" && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row?.requester_id}</TableCell>
                    <TableCell>{row?.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={row?.status}
                        color={
                          row?.status === "APPROVED" ? "success" : "warning"
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleApprove(row?.id)}
                      >
                        {row?.status === "APPROVED" ? (
                          <AddTaskIcon style={{ color: "green" }} />
                        ) : (
                          <AddTaskIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {activeTab === "OTHERS" && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Message</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row?.requester_id}</TableCell>
                    <TableCell>{row?.email}</TableCell>
                    <TableCell>{row?.message}</TableCell>
                    <TableCell>{row?.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}{" "}
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogContent style={{ backgroundColor: "black", padding: "0" }}>
            <div
              className="modal-dialog modal-dialog-centered"
              style={{ backgroundColor: "grey" }}
            >
              <div
                className="modal-content"
                style={{
                  backgroundColor: "transparent",
                  padding: "0",
                  paddingTop: "20px",
                }}
              >
                {/* <div className="modal-header">
                                  <a 
                                  style={{display:'flex',justifyContent:'end',alignItems:'center',width:'100%'}}
                                  onClick={handleClose}>
                                  <CloseIcon
                                  sx={{
                                      color: (theme) => theme.palette.error.main,
                                    }}
                                  />
                                  </a>
                              </div> */}
                <div className="modal-body">
                  <div
                    className="text-center mb-2"
                    style={{
                      position: "relative",
                      backgroundColor: "#E8F1FE",
                      width: "280px",
                      height: "200px",
                      margin: "0",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    <div>
                      <img
                        className="mb-4"
                        style={{
                          postion: "absolute",
                          marginTop: "-50px",
                          backgroundColor: "#E8F1FE",
                          border: "1px solid black",
                          padding: "10px",
                          borderRadius: "50px",
                        }}
                        src={check}
                        width="100"
                        alt="logo"
                      />
                    </div>
                    <div
                      className="modal-header"
                      style={{
                        position: "absolute",
                        padding: "0",
                        marginTop: "-65px",
                        marginLeft: "245px",
                      }}
                    >
                      <a
                        style={{
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                          width: "100%",
                        }}
                        onClick={handleClose}
                      >
                        <CloseIcon
                          sx={{
                            color: (theme) => theme.palette.error.main,
                          }}
                        />
                      </a>
                    </div>
                    <div>
                      <h4 className="mb-0">Approved</h4>
                      <p
                        className="mb-4"
                        style={{ marginTop: "10px", marginBottom: "0" }}
                      >
                        Successfully approved this request.
                      </p>
                    </div>
                    <div style={{ padding: "0px", width: "100%" }}>
                      <a
                        onClick={handleClose}
                        className="btn btn-primary"
                        style={{
                          borderRadius: "0",
                          borderBottomLeftRadius: "10px",
                          borderBottomRightRadius: "10px",
                        }}
                      >
                        Ok
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </BootstrapDialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert severity={snackbarSeverity} onClose={handleSnackbarClose}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
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
        {requests?.length === limit && (
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
            disabled={requests?.length < limit} // Disable the button if there are no more packages on the next page
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default TicketRequests;
