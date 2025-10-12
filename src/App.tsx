import { useState } from 'react'
import Regestration from './Regestration/Regestration.tsx'
import Login from './Login/Login.tsx'
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'

function App() {
   const [uid, setUid] = (useState<string | null>("reg"));

  return (
    <>
      <h1>Welcome to Kanban board</h1>
      {uid == "reg" ? <Regestration setUid={setUid}  /> : <Login setUid={setUid}/>}
      {/* <Login /> */}
      
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<Regestration />} />
          <Route path='/login' element={<Login />} />
       </Routes>
      </BrowserRouter> */}
    </>
  )
}

export default App
