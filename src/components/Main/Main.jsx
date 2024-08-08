import "./Main.css";
import { useState, useEffect } from "react";
import VideoFrame from "../VideoFrame/VideoFrame";
import VehicleData from "../VehicleData/VehicleData";
import Control from "../Control/Control";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = ({ setIsConnected }) => {
  const [frame, setFrame] = useState("");
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [trackingStatus, setTrackingStatus] = useState('In-Active');
  const [steeringAngle, setSteeringAngle] = useState(0);
  const [hasReceivedFirstMesg, setHasReceivedFirstMesg] = useState(false);

  useEffect(() => {
    let ws;
    let retryInterval;
    let messageTimeout;

    const connect = () => {
        ws = new WebSocket("ws://localhost:8080");

        ws.onopen = () => {
          console.log('Connected to the server');
            setIsConnected(true);
            toast.success("Connected to Server", {
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
            clearInterval(retryInterval); // Clear retry interval on successful connection
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            clearTimeout(messageTimeout);
            if (message.type === "frame") {
                const data = message.data;
                setFrame(data.frame);
                setDistance(data.distance);
                setSpeed(data.speed);
                setTrackingStatus(data.tracking_status);
                setSteeringAngle(data.steering_angle);
               
            }
            
            messageTimeout = setTimeout(() => {
              setFrame("");
              setDistance(0);
              setSpeed(0);
              setTrackingStatus('In-Active');
              setSteeringAngle(0);
          }, 5000);
        };

        ws.onclose = () => {
            setIsConnected(false);
            setFrame("");
            setDistance(0);
            setSpeed(0);
            setTrackingStatus('In-Active');
            setSteeringAngle(0);
            retryConnection(); 
        };

        ws.onerror = () => {
          console.log('error in connecting to server');
            setIsConnected(false);
            retryConnection(); 
        };
    };

    const retryConnection = () => {
        if (!retryInterval) {
            retryInterval = setInterval(connect, 5000); // Retry every 5 seconds
        }
    };

    connect(); // Initial connection attempt

    return () => {
        clearInterval(retryInterval); // Clear retry interval on component unmount
        if (ws) {
            ws.close();
        }
    };
}, []);

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
          <Control sendCommand={sendCommand} />
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
