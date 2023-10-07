import {useState} from 'react'
import { io } from 'socket.io-client';

function App() {
  const [message,setMessage] = useState();
  const URL = 'http://localhost:3000';
  const socket = io(URL);
  console.log(socket)

  const changeMessage = (e:any) =>{
    setMessage(e.target.value)

  }
  const sendBTN = async() => {
    console.log(message)
    console.log(socket)
  }


  return (
    <>
    <section>
      <article>
        <input value={message} onChange={ e => changeMessage(e)} placeholder="send a message"></input>
        <button onClick={(sendBTN)}></button>
      </article>
    </section>
    </>
  )
}

export default App
