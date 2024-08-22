/* eslint-disable */
import { createContext, useState, useEffect } from "react";
import { CONNECTED_MSG , CONNECTION_RETRY_INTERVAL } from "../constants/commands";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  let webSocket;
  let retryInterval;

  const connect = () => {
    webSocket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
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
    <WebSocketContext.Provider value={{ ws, isConnected, setIsConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};
