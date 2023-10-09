import {useEffect, useState} from 'react'
import { io } from 'socket.io-client';
import "./App.css"

function App() {
  const [nameSet,setNameSet]= useState(false)
  const [currentUser, setCurrentUser]= useState({
      name: "",
      message:"",
      room:"",
  })
  
  const [otherUser, setOtherUser]= useState({
    name: "",
    message:"",
    room:"",
})
  const URL = 'http://localhost:4000';
  const socket = io(URL);

    useEffect(() =>{
      socket.on('recmessage', (arg:any)=>{
        setOtherUser(arg)})   
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

  }


return (
  <>

  {nameSet ?   <section className='flex justify-center text-center mx-auto'>
    <article> 
      <p className='color-red-800'>{otherUser.name} {otherUser.message}</p>
    </article>
    <article>
      <form >
        <input value={currentUser.message} onChange={changeHandler} name="message" placeholder="send a message"></input>
        <button onClick={(sendBTN)}>send</button>
        
      </form>
      <p></p>{currentUser.name}
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
)
}

export default App
