import {useEffect, useState} from 'react'
// import {socket} from "../Services/socket"
import io from "socket.io-client";

// export default socket;

export default function Chat() {
    const SOCKET_URL = 'http://localhost:4000';
    const socket = io(SOCKET_URL)
    const [nameSet,setNameSet]= useState(false)
    const [tacosSet,setTacosSet]= useState("hi")
    const [currentUser, setCurrentUser]= useState({
        name: "",
        message:"",
        socket_id:"",
        room:"",
    })
    
    const [otherUser, setOtherUser]= useState({
      name: "",
      message:"",
      socket_id:"",
      room:"",
  })

    const [online,setOnline]= useState([]) 




      useEffect(() =>{
        
        socket.on('recmessage', (arg:any, tacos)=>{
          setTacosSet(tacos)
          setOtherUser(arg)
        })

        socket.on('onlineU', (user) => {
            console.log(user);
            setOnline(user)
            console.log(online)
         });
      
  
          return () => {
            socket.off('recmessage');
            socket.off('onlineU');
          }
        }, [socket]);
  
    const changeHandler = async(e:any) =>{
      setCurrentUser({
        ...currentUser,
        [e.target.name]: e.target.value,
      
    })  
  }
  
    const sendBTN =  (e:any) => {
      e.preventDefault()
  
     try{
        
        socket.emit("message", currentUser)
      }
      catch(err){
        console.log(err)
      }
  
    }
  
    const setNameBTN =  async (e:any) => {
      e.preventDefault();
      setNameSet(true)
      socket.emit("online", currentUser.name)
  
    }
  
  return (
    <>
  
    {nameSet ?   <section className='flex justify-center text-center mx-auto'>
      <article> 
        <p className='color-red-800'>{otherUser.name} said {otherUser.message}</p>
      </article>
      <article>
        <form >
          <input value={currentUser.message} onChange={changeHandler} name="message" placeholder="send a message"></input>
          <button onClick={(sendBTN)}>send</button>
          
        </form>
        <p>{currentUser.name}</p>
        <p>{tacosSet}</p>

  
        <div>
          {online.map(user => (
            <div key={user}>
              <p>{user}</p>
            </div>
          ) )}
        </div>
      </article>
      
    </section> 
    : 
    <section className='flex justify-center text-center mx-auto'>
      {/* <article> 
        <p className='color-red-800'>{recMessage}</p>
      </article> */}
      <article>
        <form >
          <input value={currentUser.name} onChange={changeHandler} name="name" placeholder="set name"></input>
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

