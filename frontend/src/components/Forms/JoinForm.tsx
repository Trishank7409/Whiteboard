// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// interface ReactJoinFormProps {
//   uuid: () => string; // Define the correct type for uuid
//   socket: any; // Define the correct type for socket
//   setUser: (data: any) => void; // Define the correct type for setUser
// }
// // ... other imports and component definition ...

// const JoinForm: React.FC<ReactJoinFormProps> = ({ uuid, socket, setUser }) => {
//   const [roomId, setRoomId] = useState(' ');
//   const [name, setName] = useState('');
  

 
// const navigate=useNavigate()
//   const handleRoomJoin = (e: React.FormEvent) => {
//     e.preventDefault();

//     const roomData = {
//       name,
//       roomId,
//       userId: uuid(),
//       host: false,
//       presenter: false,
//     };
//     setUser(roomData);
//     // Send data via WebSocket
//    navigate(`/${roomId}`); // Navigate after clicking "Generate Room"
//    socket.emit('userJoined',roomData);
    

   
//   };

//   // ... rest of your component ...

//   return (
//     <div style={{ height: '500px' }}>
//     <form className="border border-2 rounded-5 h-100 m-5 p-5 ">
//         <div className="mb-3">
//           <h1 className="mx-auto mt-5 fw-bold">Join Room</h1>
//           <label htmlFor="exampleInputPasscode" className="form-label">
//             Enter the Passcode
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="exampleInputPasscode"
//             value={roomId} // Bind value to roomId, not name
//             onChange={(e) => setRoomId(e.target.value)} // Update roomId, not name
//           />
//           <div id="passcode" className="form-text">
//             We'll never share your Passcode with anyone else.
//           </div>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="exampleInputUsername" className="form-label">
//             Enter Your Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="exampleInputUsername"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>

//         <button
//           type="submit"
//           className="btn btn-primary mt-4 w-100"
//           onClick={handleRoomJoin}
//         >
//           Join Room
//         </button>
//       </form>
//     </div>
//   );
// };

// export default JoinForm;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ReactJoinFormProps {
  uuid: () => string;
  socket: any;
  setUser: (data: any) => void;
}

const JoinForm: React.FC<ReactJoinFormProps> = ({ uuid, socket, setUser }) => {
  const [roomId, setRoomId] = useState(' ');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleRoomJoin = (e: React.FormEvent) => {
    e.preventDefault();

    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: false,
      presenter: false,
    };
    
    if (socket) {
      // Check if socket is defined
      socket.emit('userJoined', roomData); // Emit only if socket is defined
    } else {
      console.error("Socket is not defined.");
    }
    
    setUser(roomData);
    navigate(`/${roomId}`);
  };

  return (
    <div style={{ height: '500px' }}>
      <form className="border border-2 rounded-5 h-100 m-5 p-5">
        <div className="mb-3">
          <h1 className="mx-auto mt-5 fw-bold">Join Room</h1>
          <label htmlFor="exampleInputPasscode" className="form-label">
            Enter the Passcode
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPasscode"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <div id="passcode" className="form-text">
            We'll never share your Passcode with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputUsername" className="form-label">
            Enter Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUsername"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-4 w-100"
          onClick={handleRoomJoin}
        >
          Join Room
        </button>
      </form>
    </div>
  );
};

export default JoinForm;
