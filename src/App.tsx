import {useEffect, useState} from 'react'
import { io } from 'socket.io-client';
import "./App.css"

function App() {
  const [message,setMessage] = useState("");
  const [recMessage,setRecMessage] = useState("")
  const URL = 'http://localhost:4000';
  const socket = io(URL);

    useEffect(() =>{
      socket.on('recmessage', (arg:any)=>{
        setRecMessage(arg)})   
        return () => {
          socket.close();
        }
      }, [socket]);

  const changeMessage = (e:any) =>{
    setMessage(e.target.value)

  }
  const sendBTN =  (e:any) => {
    e.preventDefault()


   try{
      socket.emit("message", message)
    }
    catch(err){
      console.log(err)
    }

  }


  return (
    <>
    <section className='flex justify-center text-center mx-auto'>
      <article> 
        <p className='color-red-800'>{recMessage}</p>
      </article>
      <article>
        <form >
          <input value={message} onChange={ e => changeMessage(e)} placeholder="send a message"></input>
          <button onClick={(sendBTN)}>send</button>
        </form>
      </article>
    </section>
    </>
  )
}

export default App
