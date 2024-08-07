// src/CameraFeed.js
import { useEffect , useState} from 'react';
// import io from 'socket.io-client';

const Test = () => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    // const ws = new WebSocket('ws://localhost:8080');
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to the WebSocket server');
    };

    ws.onmessage = (event) => {
      setImageSrc(event.data);
    };

    ws.onclose = () => {
      console.log('Disconnected from the WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="App">
      <img
          src={`data:image/jpeg;base64,${imageSrc}`}
          alt="Latest Frame"
          className="frame-image"
        />
    </div>
  );
//   const [socket, setSocket] = useState(null);
//   const [frame, setFrame] = useState('');
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const socket = io('http://localhost:5000');
//     setSocket(socket);

//     socket.on('connect', () => {
//       console.log('Connected to server');
//       socket.emit('start_stream');
//     });

//     socket.on('frame', (data) => {
//       setFrame('data:image/jpeg;base64,' + data.data);
//     });

//     return () => {
//       if (socket) socket.disconnect();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Live Stream</h1>
//       <img ref={videoRef} src={frame} alt="Live Feed" width="640" height="480" />
//     </div>
//   );
 };

export default Test;
