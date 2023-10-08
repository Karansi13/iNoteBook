
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar'

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500)
  }

  const [progress , setProgress] = useState(0)

  // home me showalert lagaane se continue krna h
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <LoadingBar
          height={1.7}
          color='rgb(238, 160, 160)'
          progress={progress} 
          />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} setProgress={setProgress} />} />
              <Route exact path="/about" element={<About setProgress={setProgress}/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert} setProgress={setProgress} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} setProgress={setProgress}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
