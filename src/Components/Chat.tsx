import {useEffect, useState} from 'react'
import {socket} from "../Services/socket"

export default function Chat() {
    const [nameSet,setNameSet]= useState(false)
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
  
        socket.on('recmessage', (arg:any)=>{
          setOtherUser(arg)})
          
        socket.on('onlineU', (duh:any)=>{
          setOnline(duh)
          console.log(duh)
        })   
  
          return () => {
            socket.close();
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
      console.log(socket)
  
     try{
        
        socket.emit("message", currentUser)
      }
      catch(err){
        console.log(err)
      }
  
    }
  
    const setNameBTN =  (e:any) => {
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
        <p>{online}</p>
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
