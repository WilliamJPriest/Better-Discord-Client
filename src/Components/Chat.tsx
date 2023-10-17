import {useEffect, useState} from 'react'
import {socket} from "../socket"
// import io from "socket.io-client";

// export default socket;

export default function Chat() {


    // interface setUsers{
    //   userID?: string;
    //   username?: string;
    // }

    const [nameSet,setNameSet]= useState(false)
    const [users,setUsers] = useState<any[]>([])
    const [receiver,setReceiver] = useState("")
    const [messages,setMessages] = useState("")
    // Later combine receiver and messages
    const [username,setUserName] = useState()
  //   const [currentUser, setCurrentUser]= useState({
  //       name: "",
  //       message:"",
  //       socket_id:"",
  //       room:"",
  //   })
    
  //   const [otherUser, setOtherUser]= useState({
  //     name: "",
  //     message:"",
  //     socket_id:"",
  //     room:"",
  // })

//     const [online,setOnline]= useState([{     
//       usedID: "",
//       username: "",

// }]) 

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        setNameSet(false);
      }
    });



      useEffect(() =>{

        // socket.on('recmessage', (arg:any, tacos)=>{
        //   setTacosSet(tacos)
        //   setOtherUser(arg)
        // })

        socket.on("users", (users) => setUsers(users))

        socket.emit("user connected", (users))
         
        socket.on("private messages",(content) => setMessages(content))


      
  
          return () => {
            socket.off("users");
            socket.off("user connected");
            socket.off("private message");
          }
        }, [socket]);


        
  
    const changeNameHandler = async(e:any) =>{
    //   setCurrentUser({
    //     ...currentUser,
    //     [e.target.name]: e.target.value,
    // })  
    setUserName(e.target.value)

  }

    const changeMessageHandler = async(e:any) =>{
      //   setCurrentUser({
      //     ...currentUser,
      //     [e.target.name]: e.target.value,
      // })  
      
      setMessages(e.target.value)
    }
    
    const sendBTN =  (e:any) => {
      e.preventDefault()
  
      socket.emit("private message", {
        messages,
        to: receiver
      });
      // selectedUser.messages.push({
      //   content,
      //   fromSelf: true,
      // });
  
    }

    const selectUser = (e:any) =>{
      setReceiver(e.target.getAttribute("data-id"))
      console.log(receiver)
    }
  
    const setNameBTN =  (e:any) => {
      e.preventDefault();
      setNameSet(true)
      socket.auth = { username };
      socket.connect();
  
    }
  
  return (
    <>
  
    {nameSet ?   <section className='flex justify-center text-center mx-auto'>
      <article> 
        <p className='color-red-800'>{messages}</p>
      </article>
      <article>
        <form >
          <input value={messages} onChange={changeMessageHandler} name="message" placeholder="send a message"></input>
          <button onClick={(sendBTN)}>send</button>
          
        </form>
        {/* <p>{messages}</p> */}
        {/* <p>{tacosSet}</p> */}
        {users.map((user) => (
            <p  onClick={(selectUser)} data-id={user.userID}>{user.username}</p>
          ))}

  
      </article>
      
    </section> 
    : 
    <section className='flex justify-center text-center mx-auto'>
      {/* <article> 
        <p className='color-red-800'>{recMessage}</p>
      </article> */}
      <article>
        <form >
          <input value={username} onChange={changeNameHandler} name="name" placeholder="set name"></input>
          <button onClick={(setNameBTN)}>set name</button>

        </form>
      </article>
    </section>
  }
  
        
    </>
  )}
