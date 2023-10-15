import {useEffect, useState} from 'react'
import {socket} from "../socket"
// import io from "socket.io-client";

// export default socket;

export default function Chat() {


    // interface setUsers{
    //   userID?: string;
    //   username?: string;
    // }
    // const SOCKET_URL = 'http://localhost:4000';
    // const socket = io(SOCKET_URL,{ autoConnect: false })
    const [nameSet,setNameSet]= useState(false)
    const [users,setUsers] = useState<any[]>([])
    // const [users,setUsers] = useState([{}])
    // const allUsers: any[] = []
    // const [tacosSet,setTacosSet]= useState("hi")
    const [username,setUserName] = useState()
    // const [currentUser, setCurrentUser]= useState({
    //     name: "",
    //     message:"",
    //     socket_id:"",
    //     room:"",
    // })
    
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

    // socket.onAny((event, ...args) => {
    //   console.log(event, args);
    // });

    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        setNameSet(false);
      }
    });



      useEffect(() =>{

        // socket.on('onlineU', (user) => {
        //   console.log("Received user data:", user);
        //   setOnline(user);
        //   console.log(online)
        //   // console.log(online); // You might not see the updated value here
        // });

        // socket.on('recmessage', (arg:any, tacos)=>{
        //   setTacosSet(tacos)
        //   setOtherUser(arg)
        // })

        socket.on("users", (users) => setUsers(users))
         
        


      
  
          return () => {
            // socket.off("users");
            // socket.off("user connected");
          }
        }, [socket]);


        
  
    const changeHandler = async(e:any) =>{
    //   setCurrentUser({
    //     ...currentUser,
    //     [e.target.name]: e.target.value,
    // })  
    setUserName(e.target.value)
  }
  
    const sendBTN =  (e:any) => {
      e.preventDefault()
  
    //  try{
        
    //     socket.emit("message", currentUser)
    //   }
    //   catch(err){
    //     console.log(err)
    //   }
  
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
        {/* <p className='color-red-800'>{otherUser.name} said {otherUser.message}</p> */}
      </article>
      <article>
        <form >
          {/* <input value={currentUser.message} onChange={changeHandler} name="message" placeholder="send a message"></input> */}
          <button onClick={(sendBTN)}>send</button>
          
        </form>
        {/* <p>{currentUser.name}</p> */}
        {/* <p>{tacosSet}</p> */}
        {users.map((user) => (
            <p key={user.userID}>{user.username}</p>
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
          <input value={username} onChange={changeHandler} name="name" placeholder="set name"></input>
          <button onClick={(setNameBTN)}>set name</button>

        </form>
      </article>
    </section>
  }
  
        
    </>
  )}
// function user(user: any): import("react").ReactNode {
//   throw new Error('Function not implemented.');
// }

