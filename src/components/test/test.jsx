// src/CameraFeed.js
import { useEffect, useState } from "react";
import "./test.css";
// import io from 'socket.io-client';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Test = () => {
  // const [imageSrc, setImageSrc] = useState(null);
  // const [distance, setDistance] = useState(null);
  // const [speed, setSpeed] = useState(null);
  // const [trackingStatus, setTrackingStatus] = useState(null);
  // const [steeringAngle, setSteeringAngle] = useState(null);

  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:8080');
  //   // const ws = new WebSocket('ws://lavender-shymask-ocelot.toystack.dev/');

  //   ws.onopen = () => {
  //     console.log('Connected to the WebSocket server');
  //   };

  //   ws.onmessage = (event) => {
  //     try {
  //       const data = JSON.parse(event.data); // Parse the incoming message as JSON
  //       setImageSrc(data.frame);
  //       setDistance(data.distance);
  //       setSpeed(data.speed);
  //       setTrackingStatus(data.tracking_status);
  //       setSteeringAngle(data.steering_angle);
  //     } catch (error) {
  //       console.error('Failed to parse message data', error);
  //     }
  //   };

  //   ws.onclose = () => {
  //     console.log('Disconnected from the WebSocket server');
  //   };

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  // return (
  //   <>
  //     {imageSrc ? (
  //       <div>
  //       <img
  //         src={`data:image/jpeg;base64,${imageSrc}`}
  //         alt="Latest Frame"
  //         className="frame-image"
  //       />
  //       <div className="frame-info">
  //           <p>Distance: {distance} meters</p>
  //           <p>Speed: {speed} km/h</p>
  //           <p>Tracking Status: {trackingStatus}</p>
  //           <p>Steering Angle: {steeringAngle} degrees</p>
  //         </div>
  //       </div>

  //     ) : (
  //       <div className="frame-container">
  //         <p style={{ textAlign: "center" }}>
  //           No Frames Available
  //         </p>
  //       </div>
  //     )}
  //   </>
  // );
  const [frame, setFrame] = useState("");
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [trackingStatus, setTrackingStatus] = useState(false);
  const [steeringAngle, setSteeringAngle] = useState(0);
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
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "frame") {
        const data = message.data;
        setFrame(data.frame);
        setDistance(data.distance);
        setSpeed(data.speed);
        setTrackingStatus(data.tracking_status);
        setSteeringAngle(data.steering_angle);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <img src={`data:image/jpeg;base64,${frame}`} alt="Camera feed" />
      <p>Distance: {distance}</p>
      <p>Speed: {speed}</p>
      <p>Tracking Status: {trackingStatus ? "Active" : "Inactive"}</p>
      <p>Steering Angle: {steeringAngle}°</p>
      <button onClick={() => sendCommand("start")}>Start</button>
      <button onClick={() => sendCommand("stop")}>Stop</button>
      <ToastContainer />
    </>
  );
};
export default Test;
