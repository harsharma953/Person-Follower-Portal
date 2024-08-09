/* eslint-disable */
import { createContext, useState, useEffect } from 'react';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let webSocket;
    let retryInterval;

    const connect = () => {
      webSocket = new WebSocket('ws://localhost:8080');

      webSocket.onopen = () => {
        console.log('Connected to the server');
        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
          webSocket.send(JSON.stringify({client:"portal" , type: "connection", data: "connected" }));
        }
        setWs(webSocket);
        clearInterval(retryInterval);
      };

      webSocket.onclose = () => {
        console.log('Disconnected from server');
        retryConnection();
      };

      webSocket.onerror = () => {
        console.log('Error in creating WebSocket connection');
        retryConnection();
      };
    };

    const retryConnection = () => {
      if (!retryInterval) {
        retryInterval = setInterval(connect, 5000);
      }
    };

    connect(); 

    return () => {
      clearInterval(retryInterval);
      if (webSocket) {
        webSocket.close();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ ws, isConnected , setIsConnected}}>
      {children}
    </WebSocketContext.Provider>
  );
};
