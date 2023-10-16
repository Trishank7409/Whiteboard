// import React, { useState } from "react";
// import { FaRegCopy } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// interface ReactCreateFormProps {
//   uuid: () => string; // Define the correct type for uuid
//   socket: WebSocket; // Define the correct type for socket
//   setUser: (data: any) => void; // Define the correct type for setUser
// }

// const CreateForm: React.FC<ReactCreateFormProps> = ({ uuid, socket, setUser }) => {
//   const [roomId, setRoomId] = useState(uuid());
//   const [name, setName] = useState("");
//   const navigate = useNavigate();

//   const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newName = e.target.value;
//     setName(newName);
//   };

//   const generateId = () => {
//     setRoomId(uuid());
//   };

//   const handleCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const roomData = {
//       name,
//       roomId,
//       userId: uuid(),
//       host: true,
//       presenter: true
//     };
//     setUser(roomData);
//      // Send data via WebSocket
//     navigate(`/${roomId}`); // Navigate after clicking "Generate Room"
//     socket.send(JSON.stringify(roomData));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//   };

//   return (
//     <div style={{ height: "500px" }}>
//       <form
//         className="border border-2 rounded-5 h-100 m-5 p-5"
//         onSubmit={handleSubmit}
//       >
//         <div className="mb-3">
//           <h1 className="mx-auto mt-5 fw-bold">Create Room</h1>
//           <label htmlFor="exampleInputPasscode" className="form-label">
//             Create the Passcode
//           </label>
//           <input
//             type="text"
//             disabled
//             className="form-control"
//             placeholder="Generate Passcode"
//             id="exampleInputPasscode"
//             value={roomId}
//           />
//           <div id="passcode" className="form-text">
//             We'll never share your Passcode with anyone else.
//           </div>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="exampleInputPassword1" className="form-label">
//             Enter Your Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="exampleInputUsername"
//             value={name}
//             onChange={changeHandler}
//           />
//         </div>
//         <div className="d-flex justify-content-between">
//           <button type="button" className="btn btn-primary" onClick={generateId}>
//             Create Room
//           </button>
//           <button type="submit" className="btn btn-outline-dark">
//             Copy <FaRegCopy />{" "}
//           </button>
//         </div>
//         <button
//           type="submit"
//           className="btn btn-primary mt-4 w-100"
//           onClick={handleCreateRoom}
//         >
//           Generate Room{" "}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateForm;


import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ReactCreateFormProps {
  uuid: () => string;
  socket: WebSocket; // Assuming you are using WebSocket
  setUser: (data: any) => void; // Define the correct type for setUser
}

const CreateForm: React.FC<ReactCreateFormProps> = ({ uuid, socket, setUser }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
  };

  const generateId = () => {
    setRoomId(uuid());
  };

  const handleCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true
    };
    setUser(roomData);
    // Send data via WebSocket
    navigate(`/${roomId}`); // Navigate after clicking "Generate Room"
    socket.send(JSON.stringify(roomData));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div style={{ height: "500px" }}>
      <form
        className="border border-2 rounded-5 h-100 m-5 p-5"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <h1 className="mx-auto mt-5 fw-bold">Create Room</h1>
          <label htmlFor="exampleInputPasscode" className="form-label">
            Create the Passcode
          </label>
          <input
            type="text"
            disabled
            className="form-control"
            placeholder="Generate Passcode"
            id="exampleInputPasscode"
            value={roomId}
          />
          <div id="passcode" className="form-text">
            We'll never share your Passcode with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Enter Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUsername"
            value={name}
            onChange={changeHandler}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-primary" onClick={generateId}>
            Create Room
          </button>
          <button type="submit" className="btn btn-outline-dark">
            Copy <FaRegCopy />{" "}
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4 w-100"
          onClick={handleCreateRoom}
        >
          Generate Room{" "}
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
