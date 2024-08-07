// import { Client } from "@stomp/stompjs";
import { useEffect , useRef , useState} from "react";
import axios from "axios";
import './Control.css'
const Control = () => {
  // const sendMessage = (command) => {
  //   try {
  //     const client = new Client({
  //       brokerURL: "ws://10.167.96.48:15674/ws",
  //       connectHeaders: {
  //         login: "admin",
  //         passcode: "admin",
  //         host: "/",
  //       },
  //     });

  //     client.onConnect = () => {
  //       console.log("Connected to RabbitMQ");

  //       client.publish({
  //         destination: "/app/vehicleControl", // Replace with your endpoint
  //         body: JSON.stringify({ command }),
  //       });

  //       client.disconnect();
  //     };

  //     client.activate();
  //   } catch (error) {
  //     console.error("Error sending command to RabbitMQ:", error);
  //   }
  // };
//   const sendMessage =  () => {
//     try {
        
//         // const response = await axios.post('http://localhost:5000/api/info',  {command: 'start'} );
       
//         // console.log('Server response:', response.data);
//         axios.post('http://localhost:5000/api/info', {
//           firstName: 'Fred',
//           lastName: 'Flintstone'
//         })
//         .then(function (response) {
//           console.log(response);
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
        
//     } catch (error) {
//         // Handle errors
//         if (error.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             console.error('Error response:', error.response.data);
//             console.error('Error status:', error.response.status);
//         } else if (error.request) {
//             // The request was made but no response was received
//             console.error('Error request:', error.request);
//         } else {
//             // Something happened in setting up the request that triggered an Error
//             console.error('Error message:', error.message);
//         }
//     }
// };

const wsRef = useRef(null);
const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    wsRef.current = new WebSocket('ws://localhost:8080');

    wsRef.current.onopen = () => {
      console.log('Connected to the WebSocket server');
      setIsConnected(true);
    };

    wsRef.current.onclose = () => {
      console.log('Disconnected from the WebSocket server');
      setIsConnected(false);
    };

    // return () => {
    //   if (wsRef.current) {
    //     wsRef.current.close();
    //   }
    // };
  }, []);

  const sendMessage = (message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    } else {
      console.error('WebSocket connection is not open.');
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
      <button onClick={handleStop} className="stop-button">Stop Vehicle</button>
      <button onClick={handleStart} className="start-button">Start Vehicle</button>
      <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
    </div>
  );
};

export default Control;
