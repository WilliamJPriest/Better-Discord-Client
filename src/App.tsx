import {useState} from 'react'
import { io } from 'socket.io-client';

function App() {
  const [message,setMessage] = useState();
  const URL = 'http://localhost:4000';
  const socket = io(URL);

  const changeMessage = (e:any) =>{
    setMessage(e.target.value)

  }
  const sendBTN = (e: any) => {
    // e.preventDefault();    
    socket.on('hello', (arg)=>{
      console.log(arg,`

      ___  _____  ___  _  _  ____  ____    ____  ___  
     / __)(  _  )/ __)( )/ )( ___)(_  _)  (_  _)/ _ \ 
     \__ \ )(_)(( (__  )  (  )__)   )(     _)(_( (_) )
     (___/(_____)\___)(_)\_)(____) (__)   (____)\___/ 
     
     
            `)
    });
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
