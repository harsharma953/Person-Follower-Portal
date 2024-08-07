import "./Control.css";
const Control = ({ sendCommand }) => {
  const sendMessage = (message) => {
    sendCommand(message);
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
