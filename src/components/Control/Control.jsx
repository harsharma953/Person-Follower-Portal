/* eslint-disable */
import { WebSocketContext } from "../../context/WebSocketProvider";
import "./Control.css";
import { useContext, useState } from "react";
import { showSuccessToast } from "../../utils/toastUtils";

const Control = ({toggled,setToggled}) => {
  const { ws, isConnected } = useContext(WebSocketContext);
  // const [toggled, setToggled] = useState(false);
  
  const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ msgType: "command", data: message }));
      showSuccessToast(`${message} command sent`);
    }
  };

  return (
    <div className="control-container">
      <span style={{ marginTop: "10px" }}>RGB</span>
      <button
        className={`toggle-btn ${toggled ? "toggled" : ""}`}
        onClick={() => setToggled((currValue) => !currValue)}
      >
        <div className="thumb"></div>
      </button>
      <span style={{ marginTop: "10px" }}>Depth</span>
      <button
        onClick={() => sendMessage("stop")}
        className="stop-button"
        disabled={!isConnected}
      >
        Stop Bot
      </button>
      <button
        onClick={() => sendMessage("pause")}
        className="pause-button"
        disabled={!isConnected}
      >
        Pause Bot
      </button>
      <button
        onClick={() => sendMessage("start")}
        className="start-button"
        disabled={!isConnected}
      >
        Start Bot
      </button>
    </div>
  );
};

export default Control;
