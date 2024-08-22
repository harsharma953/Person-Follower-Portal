/* eslint-disable */
import { WebSocketContext } from "../../context/WebSocketProvider";
import "./Control.css";
import { useContext } from "react";


import { showSuccessToast } from "../../utils/toastUtils";

const Control = ({ ws }) => {

  const {isConnected} = useContext(WebSocketContext)
  const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "command", data: message }));
      showSuccessToast(`${message} command sent`)
    }
  };

  const handleStart = () => {
    sendMessage("start");
  };

  const handleStop = () => {
    sendMessage("stop");
  };

  return (
    <div className="control-container">
      <button onClick={handleStop} className="stop-button" disabled={!isConnected}>
        Stop Vehicle
      </button>
      <button onClick={handleStart} className="start-button" disabled={!isConnected}>
        Start Vehicle
      </button>
    </div>
  );
};

export default Control;
