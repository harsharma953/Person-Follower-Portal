/* eslint-disable */
import "./Main.css";
import { useState, useEffect, useContext } from "react";
import VideoFrame from "../VideoFrame/VideoFrame";
import VehicleData from "../VehicleData/VehicleData";
import Control from "../Control/Control";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WebSocketContext } from "../../context/WebSocketProvider";
import {
  showSuccessToast,
  showWarnToast,
  showLoadingToast,
} from "../../utils/toastUtils";

const Main = () => {
  const { ws, setIsConnected } = useContext(WebSocketContext);
  const [toggled, setToggled] = useState(false);
  const [frame, setFrame] = useState("");
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [trackingStatus, setTrackingStatus] = useState("off");
  const [steeringAngle, setSteeringAngle] = useState(0);
  const [isFirstMessage, setIsFirstMessage] = useState(false);
  const [frameMessageSuccess, setFrameMessageSuccess] = useState(false);
  let toastId;

  useEffect(() => {
    if (!ws) return;
    const handleMessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.msgType === "identify" && message.clientType === "bot") {
        if (message.data === "connected") {
          console.log(`${message.clientType} ${message.data}`);
          showSuccessToast(`Bot ${message.data}`);
          toastId = toast.loading("Waiting for Frames..");
          setIsConnected(true);
        } else if (message.data === "disconnected") {
          console.log(`${message.clientType} ${message.data}`);
          showWarnToast(`Frames ${message.data}`);
          setFrame("");
          setSpeed(0);
          setTrackingStatus("off");
          setSteeringAngle(0);
          setDistance(0);
        }
      } else if (message.msgType === "frame") {
        if (!frameMessageSuccess) {
          if (toastId) {
            toast.update(toastId, {
              render: "Frame loaded successfully!",
              type: "success",
              isLoading: false,
              autoClose:2000
            });
            toast.dismiss(toastId);
            toastId = undefined;
          
          }
        }
        const data = message.data;
        setFrame(toggled ? data.depth_frame : data.frame);
        setDistance(data.distance);
        setSpeed(data.speed);
        setTrackingStatus(data.tracking_status);
        setSteeringAngle(data.steering_angle);
      }
    };
    ws.addEventListener("message", handleMessage);

    return () => {
      ws.removeEventListener("message", handleMessage);
    };
  }, [ws]);


  return (
    <>
      <div className="main-container">
        <div className="video-frame-container">
          <VideoFrame frame={frame} />
          <Control toggled={toggled} setToggled={setToggled}/>
        </div>
        <div className="vehicle-data-container">
          <VehicleData
            distance={distance}
            speed={speed}
            trackingStatus={trackingStatus}
            steeringAngle={steeringAngle}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default Main;
