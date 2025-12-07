import Regestration from './Regestration/Regestration.tsx'
import Login from './Login/Login.tsx'
import Board from './Board/Board.tsx'
// import { Button } from './components/ui/button.tsx'
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import { Route, Routes } from 'react-router'

function App() {

  return (
    <>
      <h1 >Welcome to Kanban board</h1>
      {/* {uid === "reg" ? <Regestration setUid={setUid} /> : uid === "log" ? <Login setUid={setUid} /> : <Board setUid={setUid} uid={uid} />} */}
      
      {/* <Button variant="outline" size="icon">+</Button> */}
      <Routes>
        <Route path='/' element={<Board />} />
        <Route path='/login' element={<Login />} />
         <Route path='/register' element={<Regestration/>}  />
      </Routes>
    </>
  )
}

export default App
