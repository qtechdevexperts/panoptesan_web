/* eslint-disable func-names */
import { useState, useEffect } from "react";
import { FileDrop } from "react-file-drop"; // https://github.com/sarink/react-file-drop
import "./editor.css";
import Editor from "./Editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // https://fontawesome.com/v5/docs/web/use-with/react
import { faLightbulb, faMoon } from "@fortawesome/free-solid-svg-icons"; // https://fontawesome.com/v5/docs/web/use-with/react
import ReactPlayer from "react-player";
function VideoEditor(props) {
  //Boolean state handling whether upload has occured or not
  const [isUpload, setIsUpload] = useState(true);

  //State handling storing of the video
  const [videoUrl, setVideoUrl] = useState("");
  const [videoBlob, setVideoBlob] = useState("");

  //Boolean state handling whether light or dark mode has been chosen
  const [isDarkMode, setIsDarkMode] = useState(false);

  //Stateful array handling storage of the start and end times of videos
  const [timings, setTimings] = useState([]);

  const handleClose = () => {
    props.change();
  };

  //Lifecycle handling light and dark themes
  useEffect(() => {
    toggleThemes();
    document.addEventListener("drop", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Function handling file input as well as file drop library and rendering of those elements
  const renderUploader = () => {
    return (
      <div
        className="relative z-10 "
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
       
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg h-max w-max">
              <h1 className="font-bold text-center text-xl">Video Editor</h1>

              <ReactPlayer url={props.url} controls={true} width="340" />

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  //Function handling rendering the Editor component and passing props to that child component
  const renderEditor = () => {
    return (
      // videoUrl --> URL of uploaded video
      <Editor
        videoUrl={videoUrl}
        videoBlob={videoBlob}
        setVideoUrl={setVideoUrl}
        timings={timings}
        setTimings={setTimings}
      />
    );
  };

  //Function handling the light and dark themes logic
  const toggleThemes = () => {
    if (isDarkMode) {
      document.body.style.backgroundColor = "#1f242a";
      document.body.style.color = "#fff";
    }
    if (!isDarkMode) {
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = "#1f242a";
    }
    setIsDarkMode(!isDarkMode);
  };

  //Function handling the file upload file logic
  const uploadFile = async (fileInput) => {
    console.log(fileInput[0]);
    let fileUrl = URL.createObjectURL(fileInput[0]);
    //new Blob([data.slice(0, data.size, "video/mp4")], { type: "video/mp4" })
    setIsUpload(false);
    setVideoUrl(fileUrl);
    setVideoBlob(fileInput[0]);
  };

  return (
    <div>
      {/* Boolean to handle whether to render the file uploader or the video editor */}
      {isUpload ? renderUploader() : renderEditor()}
      <div className={"theme_toggler"} onClick={toggleThemes}>
        {isDarkMode ? (
          <i className="toggle" aria-hidden="true">
            <FontAwesomeIcon icon={faLightbulb} />
          </i>
        ) : (
          <i className="toggle">
            <FontAwesomeIcon icon={faMoon} />
          </i>
        )}
      </div>
    </div>
  );
}

export default VideoEditor;
