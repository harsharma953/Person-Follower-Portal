// src/CameraFeed.js
import { useEffect, useState } from "react";
import "./test.css";
// import io from 'socket.io-client';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Test = () => {
  const handleClick = () => {
    const fakePromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.5;
        success ? resolve("Data loaded successfully!") : reject("Failed to load data.");
      }, 2000);
    });
  
    toast.promise(
      fakePromise,
      {
        pending: 'Waiting for the frames ...',
        success: 'Frames loaded successfully!',
        error: 'Error loading Frames'
      }
    );
  };

  return (
    <>
      <h1>test compo</h1>
      <button onClick={handleClick}>Load Data</button>
      <ToastContainer />
    </>
  );
};
export default Test;
