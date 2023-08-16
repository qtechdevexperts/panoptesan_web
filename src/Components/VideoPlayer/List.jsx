import ReactPlayer from "react-player";
import React, { useState } from "react";
import { Player } from "./Player";
import Editor from "./Editor";
import VideocamIcon from "@mui/icons-material/Videocam";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ArchiveIcon from "@mui/icons-material/Archive";
import { ArchiveVideos } from "../../Services/Auth";
import APP_ROLES from "../../SharedComponents/role";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import smile from "../../Assets/Images/smile.svg";
import { ShareSocial } from "react-share-social";
import "./list.css";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  textAlign: "center",
  root: {
    position: "relative",
    backgroundColor: "transparent",
    borderRadius: 3,
    border: 0,
    boxShadow: "none",
    color: "white",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-25px",
  },
  copyContainer: {
    border: "1px solid blue",
    background: "rgb(0,0,0,0.7)",
    height: "40px",
  },
  title: {
    color: "aquamarine",
    fontStyle: "italic",
  },
};

export function VideoList({ videos }) {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [timings, setTimings] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openShareModal, setOpenShareModal] = React.useState(false);
  const navigationURL = useNavigate();

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(40),
      backgroundColor: "red",
      position: "relative",
      width: "500px",
      height: "500px",
      display: "flex",
      // flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
  }));

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
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleShareModalOpen = () => {
    setOpenShareModal(true);
  };

  const closeShareModal = () => {
    setOpenShareModal(false);
  };
  const handleClick = (event, video) => {
    console.log("handleClick called ", video);
    setOpenModal(true);
    setTitle(video.title);
    setUrl(video?.path);
  };
  const handleStateFromChild = (event, video) => {
    setOpenModal(false);
    setTitle("");
    setUrl("");
    setOpenEdit(false);
  };

  const handleEdit = (event, video) => {
    console.log("handleEdit called!", video);
    setOpenEdit(true);
    setTitle(video.title);
    setUrl(video?.path);
  };

  const videoDownloader = async (videoUrl) => {
    try {
      const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
      const response = await fetch(corsProxyUrl + videoUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "video.mp4";
      anchor.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the video:", error);
    }
  };

  const ArchiveVideo = async (url) => {
    navigationURL(url);
  };
  const ShareVideos = async (url) => {
    setUrl(url);
    handleShareModalOpen();
  };
  return (
    <div className="w-full">
      <div className="video-list-container">
        {console.log(videos)}
        {videos?.map((video) => (
          <div key={video?.id} class="video-card">
            <div class="video-thumb">
              <div class="icons">
                <a onClick={() => ArchiveVideo("/archive")}>
                  <ArchiveIcon className="icon-color" />
                </a>
                <a onClick={() => ShareVideos(video?.path)}>
                  <ShareOutlinedIcon />
                </a>
              </div>
              {/* <div > */}
              <ReactPlayer
                className="react-player"
                url={video?.path}
                controls={false}
                width="210px"
                height="120px"
              />
              {/* </div> */}

              <div class="center">
                <a>
                  <VideocamIcon
                    onClick={(event) => handleClick(event, video)}
                    style={{ fontSize: "30px", color: "white" }}
                  />
                </a>
              </div>
            </div>
            <div class="card-body-content">
              <div className="title-style">
                <span class="date">
                  {new Date(video?.created_at)?.toLocaleDateString(
                    undefined,
                    options
                  )}
                </span>
              </div>
              <a
                onClick={() => videoDownloader(video?.path)}
                class="btn btn-primary btn-sm w-50"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <Player
          title={title}
          path={url}
          change={handleStateFromChild}
          edit={(event) => handleEdit(event, { title, path: url })}
        />
      )}
      {openEdit && (
        <Editor
          videoUrl={url}
          timings={timings}
          setTimings={setTimings}
          change={handleStateFromChild}
          title={title}
        />
      )}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent>
          <div className="modal-dialog modal-dialog-centered h-96">
            <div className="modal-content">
              <div className="modal-header">
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
              <div className="modal-body">
                <div className="text-center mb-2">
                  <img className="mb-4" src={smile} width="100" alt="logo" />
                  <h4 className="mb-0">Congratulations</h4>
                  <p className="mb-4">
                    You have successfully archived this video
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>

      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          openShareModal ? "" : "hidden"
        }`}
      >
        <div className="bg-white w-96 h-80 p-4 rounded-lg shadow-lg">
          <div className="flex justify-end">
            <a className="cursor-pointer" onClick={closeShareModal}>
              <CloseIcon className="text-red-500" />
            </a>
          </div>
          <div className="my-4 text-center">
            <h4 className="text-lg font-semibold">Share</h4>
          </div>
          <div className="text-center space-x-4">
            <div className="social-icons">
              <ShareSocial
                url={url}
                socialTypes={["facebook", "twitter", "linkedin", "whatsapp"]}
                onSocialButtonClicked={(data) => console.log(data)}
                style={style}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
