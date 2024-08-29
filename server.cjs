const WebSocket = require("ws");
const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

let isBotClientConnected = false;
let botClientMsg = null;
let botClient = null;

wss.on("connection", (ws) => {

  ws.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      
      switch (parsedMessage.msgType) {

        case "frame":
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(parsedMessage));
            }
          });
          break;

        case "command":
          if(botClient?.readyState === WebSocket.OPEN) {
            console.log(`${parsedMessage.data} command sent to bot: ${new Date().toString()}`);
            botClient.send(JSON.stringify(parsedMessage));
          }
          break;

        case "identify":
          console.log(`${parsedMessage.clientType} ${parsedMessage.data}: ${new Date().toString()}`);
          if (parsedMessage.clientType === "bot") {
            isBotClientConnected = parsedMessage.data === "connected" ? true : false;
            botClient = ws;
            botClientMsg = parsedMessage;
            wss.clients.forEach((client) => {
              if(client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(botClientMsg)); 
              }
            });
          }
          else if(parsedMessage.clientType === "portal" && isBotClientConnected){
            ws.send(JSON.stringify(botClientMsg));
          }
          break;

        default:
          console.log('Error in message type')
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  });

  ws.on("close", () => {
    if (ws === botClient) {
      botClient = null;
    }
  });

});

console.log(`WebSocket server is running on port ${PORT}`);