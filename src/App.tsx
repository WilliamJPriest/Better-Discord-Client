import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Messenger from "./Pages/Messenger";

//todos
// dynamic id sending instead of general sending
// list of users
// chatlogs
// Database??
// MultiPage?? can try Context API, possibly.

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Messenger/>}/>
        {/* <Route path='*' element={< />}/>
        <Route path='/unsubscriber' element={<Unsubscriber />}/> */}
      </Routes>    
    </BrowserRouter>
    </>
  )
}

export default App
