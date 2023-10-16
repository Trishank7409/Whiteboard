import CreateForm from "./components/Forms/CreateForm"
import JoinForm from "./components/Forms/JoinForm"
interface ReactFormProps{
  uuid:any
  setUser:any
  socket: any;
}
const Forms: React.FC<ReactFormProps> = ({uuid, socket,setUser}) => {
  return (
    <div className=" vh-100 border border-2 border-primary bg-info p-5 style={{ backgroundColor: 'rgba(0, 0, 255, 0.5)">
    <div className="d-flex mx-auto justify-content-center align-items-center gap-3 pt-5  ">
    <CreateForm uuid={uuid} socket={socket} setUser={setUser}/>
    <JoinForm uuid={uuid} socket={socket} setUser={setUser}/>
    
    </div>
  
   
    </div>
  )
}

export default Forms
