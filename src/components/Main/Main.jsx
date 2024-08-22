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
  showInfoToast,
  showWarnToast,
  showLoadingToast
} from "../../utils/toastUtils";

const Main =()=> {
  
  const { ws , setIsConnected} = useContext(WebSocketContext);
  const [frame, setFrame] = useState("");
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [trackingStatus, setTrackingStatus] = useState("off");
  const [steeringAngle, setSteeringAngle] = useState(0);
  const [isFirstMessage, setIsFirstMessage] = useState(false);
  let id;

  useEffect(() => {
    if (!ws) return;
    const handleMessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.msgType === "connection" && message.clientType === "bot") {
        if (message.data === "connected") {
          console.log(`${message.clientType} ${message.data}`);
          showSuccessToast(`Bot ${message.data}`);
          if(!isFirstMessage){
            id = showLoadingToast('waiting for the frame ...')
          }
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
        const data = message.data;
        toast.dismiss(id);
        setFrame(data.frame);
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
          <Control ws={ws} />
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
