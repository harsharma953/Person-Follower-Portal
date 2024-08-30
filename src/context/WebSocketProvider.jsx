/* eslint-disable */
import { createContext, useState, useEffect } from "react";
import { BOT_STATUS, CONNECTED_MSG , CONNECTION_RETRY_INTERVAL } from "../constants/commands";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null);
  const [botStatus, setBotStatus] = useState(BOT_STATUS.DISCONNECTED);
  let webSocket;
  let retryInterval;

  const connect = () => {
    webSocket = new WebSocket("ws://localhost:8080");
    webSocket.onopen = () => {
      console.log(`Connected to the server : ${new Date().toString()}`)
      if (webSocket && webSocket.readyState === WebSocket.OPEN) {
        webSocket.send(JSON.stringify(CONNECTED_MSG));
      }
      setWs(webSocket);
      clearInterval(retryInterval);
      retryInterval = undefined;
    };

    webSocket.onclose = () => {
      console.log("Disconnected from server");
      retryConnection();
    };

    webSocket.onerror = () => {
      console.log(`Error in creating WebSocket connection`);
    };
  };
  const retryConnection = () => {
    if (!retryInterval) {
      retryInterval = setInterval(connect, CONNECTION_RETRY_INTERVAL);
    }
  };
  useEffect(() => {
    connect();
    return () => {
      clearInterval(retryInterval);
      if (webSocket) {
        webSocket.close();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ ws, botStatus, setBotStatus }}>
      {children}
    </WebSocketContext.Provider>
  );
};
