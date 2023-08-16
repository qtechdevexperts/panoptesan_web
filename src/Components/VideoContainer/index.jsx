import VideocamIcon from '@mui/icons-material/Videocam';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import ShareIcon from '@mui/icons-material/Share';
import group778 from "../../Assets/Images/group778.png";

export const VideoContainer = ({videos}) => {
    return (
        <>
        { videos?.map((video) => (
            <div class="card video-card">
            <div class="video-thumb">
              <div class="icons">
                <FolderCopyIcon style={{ fontSize: '35px', color: 'white' }} />
                <ShareIcon style={{ color: 'white', fontSize: '35px' }} />
              </div>
              <img src={group778} alt="" />
              <div class="center">
                <a href="#" data-toggle="modal" data-target="#video"><VideocamIcon style={{ fontSize: '45px', color: 'white' }} /></a>
              </div>
            </div>
            <div class="card-body">
              <span class="date">11/15/2022</span>
              <a href={video.path} class="btn btn-primary btn-sm">Download</a>
            </div>
          </div>
          )) }
        </>
    );
}