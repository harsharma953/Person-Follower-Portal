/* eslint-disable */
import "./Control.css";

const Control = ({ ws }) => {

  const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "command", data: message }));
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
      <button onClick={handleStop} className="stop-button">
        Stop Vehicle
      </button>
      <button onClick={handleStart} className="start-button">
        Start Vehicle
      </button>
    </div>
  );
};

export default Control;
