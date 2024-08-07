import "./Main.css";
import VideoFrame from "../VideoFrame/VideoFrame";
import VehicleData from "../VehicleData/VehicleData";
import Control from "../Control/Control";

const Main = () => {
  return (
    <>
      <div className="main-container">
        <div className="video-frame-container">
          <VideoFrame />
          <Control />
        </div>
        <div className="vehicle-data-container">
          <VehicleData />
        </div>
      </div>
    </>
  );
};
export default Main;
