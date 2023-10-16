

// import { Routes, Route } from 'react-router-dom';
// import Forms from './Forms';
// import RoomPage from './pages/RoomPage';
// import { useState, useEffect } from 'react';
// import io from 'socket.io-client';


// const App = () => {
//   const [userNo, setUserNo] = useState(0);
//   const [roomJoined, setRoomJoined] = useState(false);
//   const [user, setUser] = useState({});
//   const [users, setUsers] = useState([]);

//   let socket;
//   const connectionOptions = {
//     "force new connection": true,
//     reconnectionAttempts: "Infinity",
//     timeout: 10000,
//     transports: ["websocket"],
//   };
//   const uuid = () => {
//     var S4 = () => {
//       return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
//     };
//     return (
//       S4() +
//       S4() +
//       "-" +
//       S4() +
//       "-" +
//       S4() +
//       "-" +
//       S4() +
//       "-" +
//       S4() +
//       S4() +
//       S4()
//     );
//   };

//   useEffect(() => {
//     if (roomJoined) {
//       const server = "http://localhost:5000";
//       socket = io(server, connectionOptions);
//     }
//   }, [roomJoined]);


//   return (
//     <div className="overflow-hidden">
//       <Routes>
//         <Route path="/" element={<Forms uuid={uuid} socket={socket} setUser={setUser} />} />
//         <Route path='/:roomId' element={<RoomPage />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;


import { Routes, Route } from 'react-router-dom';
import Forms from './Forms';
import RoomPage from './pages/RoomPage';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const App: React.FC = () => {
  const [roomJoined, setRoomJoined] = useState(false);
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [userNo, setUserNo] = useState(0);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  const connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ["websocket"],
  };

  const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  useEffect(() => {
    if (roomJoined) {
      const server = "http://localhost:5000";
      const newSocket = io(server, connectionOptions);
      setSocket(newSocket);
    }
  }, [roomJoined]);

  return (
    <div className="overflow-hidden">
      <Routes>
        <Route
          path="/"
          element={<Forms uuid={uuid} socket={socket} setUser={setUser} />}
        />
        <Route path="/:roomId" element={<RoomPage user={user} />} />
      </Routes>
    </div>
  );
};

export default App;

