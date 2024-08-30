/* eslint-disable */
import { WebSocketContext } from "../../context/WebSocketProvider";
import "./Control.css";
import { useContext, useState } from "react";
import { showSuccessToast } from "../../utils/toastUtils";
import { BOT_STATUS } from "../../constants/commands";

const Control = ({ toggled, setToggled }) => {
  const { ws, botStatus } = useContext(WebSocketContext);

  const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          clientType: "portal",
          msgType: "command",
          data: message,
        })
      );
      showSuccessToast(`${message} command sent`);
    }
  };

  return (
    <div className="control-container">
      <div hidden={botStatus === BOT_STATUS.DISCONNECTED}>
        <span style={{ marginTop: "10px" }}>RGB</span>
        <button
          className={`toggle-btn ${toggled ? "toggled" : ""}`}
          onClick={() => setToggled((currValue) => !currValue)}
        >
          <div className="thumb"></div>
        </button>
        <span style={{ marginTop: "10px" }}>Depth</span>
      </div>
      <button
        onClick={() => sendMessage("stop")}
        className="stop-button"
        disabled={botStatus === BOT_STATUS.DISCONNECTED}
      >
        Stop
      </button>
      <button
        onClick={() => sendMessage("pause")}
        className="pause-button"
        disabled={botStatus === BOT_STATUS.DISCONNECTED}
      >
        Pause
      </button>
      <button
        onClick={() => sendMessage("start")}
        className="start-button"
        disabled={botStatus === BOT_STATUS.DISCONNECTED}
      >
        Start
      </button>
    </div>
  );
};

export default Control;
