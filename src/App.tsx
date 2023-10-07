import {useState} from 'react'

function App() {
  const [message,setMessage] = useState();

  const changeMessage = (e:any) =>{
    setMessage(e.target.value)

  }
  const sendBTN = async() => {
    console.log(message)
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
