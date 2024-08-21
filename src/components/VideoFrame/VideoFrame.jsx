import "./VideoFrame.css";
import NoImage from "../../assets/images/no-image.svg";

const VideoFrame = ({ frame }) => {
  return (
    <>
      {frame ? (
        <div className="frame-container">
          <img
            src={`data:image/jpeg;base64,${frame}`}
            alt="Latest Frame"
            className="frame-image"
          />
        </div>
      ) : (
        <div className="frame-container">
          <p style={{ textAlign: "center" }}>No Frames Available</p>
          <img src={NoImage} alt="no-data-frame" className="no-image-icon" />
        </div>
      )}
    </>
  );
};
export default VideoFrame;
