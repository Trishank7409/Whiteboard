import { useState, useRef } from "react";
import Whiteboard from "../components/Canvas/Whiteboard";
interface ReactRoomPageProps {
 user:any
}
const RoomPage: React.FC<ReactRoomPageProps> = ({user}) => {

  const canvasRef=useRef(null)
  const ctxRef=useRef(null)
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");
const [element,setElement]=useState([])
const [history, setHistoy]=useState([])


const handleCanvasClear =()=>{
  const canvas= canvasRef.current
  const ctx= canvas.getContext('2d')
  ctx.fillRect='white'
  ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  setElement([])
}

const undo=()=>{
setHistoy((prev)=>[
  ...prev, element[element.length-1]
]
)
setElement((prev)=>{
  return prev.slice(0, prev.length - 1);
})
}

const redo=()=>{
  setElement((prev)=>[
    ...prev, history[history.length-1]
  ])
  setHistoy((prev)=>{
   return prev.slice(0, prev.length-1)
  }

  )
}

  return (
    <div className="row vw-100 mx-auto  ">
      <h1 className="text-center py-5">
        White Board Sharing App{" "}
        <span className="text-primary">[Users Online:0]</span>
      </h1>

{
  user?.presenter &&(
    <div
    className="col-md-12 mt-1 mb-5 d-flex align-items-center justify-content-around 
  mx-auto rounded-5  "
    style={{
      height: "100px",
      backgroundColor: "lightblue",
      width: "1400px",
    }}
  >
    <div className="d-flex col-md-4 justify-content-between gap-1 align-items-center">
      <div className="d-flex gap-1">
        <label htmlFor="pencil">Pencil</label>
        <input
          type="radio"
          name="tool"
          value="pencil"
          id="pencil"
          checked={tool === "pencil"}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        />
      </div>

      <div className="d-flex gap-1">
        <label htmlFor="Line">Line</label>
        <input
          type="radio"
          name="tool"
          value="Line"
          id="Line"
          checked={tool === "Line"}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        />
      </div>

      <div className="d-flex gap-1">
        <label htmlFor="Rectangle">Rectangle</label>
        <input
          type="radio"
          name="tool"
          value="Rectangle"
          id="Rectangle"
          checked={tool === "Rectangle"}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        />
      </div>

      <div className="d-flex gap-1">
        <label htmlFor="color">Select Color</label>
        <input
          type="color"
          id="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
          }}
        />
      </div>
    </div>
    <div className="d-flex gap-5">
      <div className="d-flex  gap-2 ">
        <button className="btn btn-success"
        disabled={element.length==0}
        onClick={undo}
        >Undo</button>
        <button className="btn btn-warning"
        disabled={history.length<1}
        onClick={redo}
        >Redo</button>
      </div>
      <div>
        <button className="btn btn-danger" onClick={handleCanvasClear}>Reset</button>
      </div>
    </div>
  </div>

  )
}
      <div
        className="col-md-12 mt-1 mb-5 d-flex align-items-center justify-content-around 
      mx-auto rounded-5  "
        style={{
          height: "100px",
          backgroundColor: "lightblue",
          width: "1400px",
        }}
      >
        <div className="d-flex col-md-4 justify-content-between gap-1 align-items-center">
          <div className="d-flex gap-1">
            <label htmlFor="pencil">Pencil</label>
            <input
              type="radio"
              name="tool"
              value="pencil"
              id="pencil"
              checked={tool === "pencil"}
              onChange={(e) => {
                setTool(e.target.value);
              }}
            />
          </div>

          <div className="d-flex gap-1">
            <label htmlFor="Line">Line</label>
            <input
              type="radio"
              name="tool"
              value="Line"
              id="Line"
              checked={tool === "Line"}
              onChange={(e) => {
                setTool(e.target.value);
              }}
            />
          </div>

          <div className="d-flex gap-1">
            <label htmlFor="Rectangle">Rectangle</label>
            <input
              type="radio"
              name="tool"
              value="Rectangle"
              id="Rectangle"
              checked={tool === "Rectangle"}
              onChange={(e) => {
                setTool(e.target.value);
              }}
            />
          </div>

          <div className="d-flex gap-1">
            <label htmlFor="color">Select Color</label>
            <input
              type="color"
              id="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="d-flex gap-5">
          <div className="d-flex  gap-2 ">
            <button className="btn btn-success"
            disabled={element.length==0}
            onClick={undo}
            >Undo</button>
            <button className="btn btn-warning"
            disabled={history.length<1}
            onClick={redo}
            >Redo</button>
          </div>
          <div>
            <button className="btn btn-danger" onClick={handleCanvasClear}>Reset</button>
          </div>
        </div>
      </div>

      <div>
     
        <Whiteboard canvasRef={canvasRef} ctxRef={ctxRef} element={element} setElement={setElement}
           tool={tool}
           setTool={setTool}
           color={color}
           user={user}
        />
     
      </div>
    </div>
  );
};

export default RoomPage;
