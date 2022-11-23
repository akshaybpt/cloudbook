
import './App.css';
import React,{useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Home from './component/Home';
import About from './component/About';
import Navigationbar from './component/navbar';
import NoteState from './context/notes/NoteState';
import  Alert  from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
import ModeState from './context/mode/ModeState';


function App() {
  const [alert, setAlert] = useState(null)
 
  const showAlert =(message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null)
    },1500)
 }
  return (
    <div>
      <NoteState>
        <ModeState showAlert={showAlert}>
        <Router>
          <Navigationbar />
          <Alert alert={alert}/>
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </Router>
        </ModeState>
      </NoteState>
    </div>
  );
}

export default App;
