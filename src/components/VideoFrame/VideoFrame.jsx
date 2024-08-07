import "./VideoFrame.css";
import { useEffect, useState } from "react";
// import { Client } from "@stomp/stompjs";
import NoImage from "../../assets/images/no-image.svg";
import axios from "axios";
// import Control from "../Control/Control";

const VideoFrame = () => {
  // const [frameData, setFrameData] = useState(null);
  // const [lastReceivedTime, setLastReceivedTime] = useState(Date.now());
  // const dataCheckInterval = 3000; // 3 seconds
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/frame');
  //       // Check if the response and data are valid
  //       if (response.data && response.data.frameBase64) {
  //         setFrameData(response.data.frameBase64);
  //         setLastReceivedTime(Date.now()); // Update the last received time
  //       } else {
  //         console.warn('Received response but frame data is null or undefined');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching frame data:', error);
  //     }
  //   };

  //   // Fetch data initially
  //   fetchData();

  //   // Set interval to fetch data every 30 milliseconds
  //   const fetchInterval = setInterval(() => {
  //     fetchData();
  //   },100); // Adjust the interval as needed

  //   // Set interval to check for data reception
  //   const checkInterval = setInterval(() => {
  //     if (Date.now() - lastReceivedTime > dataCheckInterval) {
  //       setFrameData(null); // Set frameData to null if no data received in the last 5 seconds
  //     }
  //   }, 1000); // Check every second 

  //   // Cleanup function to clear intervals when component unmounts
  //   return () => {
  //     clearInterval(fetchInterval); 
  //     clearInterval(checkInterval);
  //   };
  // }, [lastReceivedTime]);


   
  const [imageSrc, setImageSrc] = useState(null);

  // useEffect(() => {
  //   // const ws = new WebSocket('ws://localhost:8080');
  //   const ws = new WebSocket('ws://lavender-shymask-ocelot.toystack.dev/');

  //   ws.onopen = () => {
  //     console.log('Connected to the WebSocket server');
  //   };

  //   ws.onmessage = (event) => {
  //     setImageSrc(event.data);
  //   };

  //   ws.onclose = () => {
  //     console.log('Disconnected from the WebSocket server');
  //   };

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  return (
    <>
      {imageSrc ? (
        <div>
        <img
          src={`data:image/jpeg;base64,${imageSrc}`}
          alt="Latest Frame"
          className="frame-image"
        />
        </div>
      ) : (
        <div className="frame-container">
          <p style={{ textAlign: "center" }}>
            No Frames Available
          </p>
          <img src={NoImage} alt="no-data-frame" className="no-image-icon" />
        </div>
      )}
    </>
  );
};
export default VideoFrame;
