/* eslint-disable */
import "./Main.css";
import { useState, useEffect, useContext } from "react";
import VideoFrame from "../VideoFrame/VideoFrame";
import VehicleData from "../VehicleData/VehicleData";
import Control from "../Control/Control";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WebSocketContext } from "../../context/WebSocketProvider"; // Import the context
import {
  showSuccessToast,
  showInfoToast,
  showErrorToast,
} from "../../utils/toastUtils";

const Main = () => {
  const { ws , setIsConnected} = useContext(WebSocketContext);
  const [frame, setFrame] = useState("");
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [trackingStatus, setTrackingStatus] = useState("In-Active");
  const [steeringAngle, setSteeringAngle] = useState(0);
  // const [hasReceivedFirstMesg, setHasReceivedFirstMesg] = useState(false);

  useEffect(() => {
    if (!ws) return;

    const handleMessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "connection" && message.client === "bot") {
        if (message.data === "connected") {
          console.log(`Bot ${message.data}`);
          showSuccessToast(`Bot ${message.data}`);
          setIsConnected(true);
        } else if (message.data === "disconnected") {
          console.log(`Bot ${message.data}`);
          showInfoToast(`Bot ${message.data}`);
          setIsConnected(false);
          setFrame("");
          setSpeed(0);
          setTrackingStatus("In-Active");
          setSteeringAngle(0);
          setDistance(0)
        }
      } else if (message.type === "frame") {
        const data = message.data;
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

  const sendCommand = (command) => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "command", data: command }));
      toast.success("Command Sent Successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: undefined,
        className: "toast-custom",
      });
    };

    ws.onclose = () => {
      console.log(`Command '${command}' sent successfully.`);
    };

    ws.onerror = (error) => {
      console.error(`WebSocket error: ${error}`);
    };
  };

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
