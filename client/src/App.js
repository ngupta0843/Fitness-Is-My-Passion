import { useState, useEffect } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import { CssBaseline } from '@mui/material';
import Hello from './components/Hello';
import LandingPage from './pages/landing';
// import {TextField} from "@mui/material";

/*
function App() {
  const [test, setTest] = useState("test");
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   fetch('http://localhost:5000/api')
  //   .then(data => setTest(data))
  // }, [])

  const handleClick = async () => {
    console.log("clicked");
    try {
      const response = await axios.get("http://localhost:8088/api");
      console.log(response)
      console.log(response.data.message);
      setTest(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignin = async () => {
    const user = {
      email: "johndoe@gmail.com",
      password: "password",
    };

    try {
      const response = await axios.post("http://localhost:8088/users/signin", user);
      console.log(response);
    } catch (error) {
      console.log(error);
      
    }
  }
  const handleSignupfail = async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "password",
    };

    try {
      const response = await axios.post("http://localhost:8088/users/signup", user);
      console.log(response);
    } catch (error) {
      console.log(error);
      
    }
  }
  const handleSignuppass = async () => {
    const user = {
      name: "Akarsh Legala",
      email: "akarsh@gmail.com",
      password: "password",
    };

    try {
      const response = await axios.post("http://localhost:8088/users/signup", user);
      console.log(response);
    } catch (error) {
      console.log(error);
      
    }
  }
  const handleSendUserInfo = async () => {
    const user = {
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "password",
    };

    try {
      const response = await axios.post("http://localhost:8088/users/test", user);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Hello />
        <button onClick={handleSendUserInfo}>mongo test</button>
        <button onClick={handleSignin}>Sign in test</button>
        <button onClick={handleSignupfail}>Sign up test fail</button>
        <button onClick={handleSignuppass}>Sign up test pass</button>
        
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {test}
        <button onClick={handleClick}>Click Me</button>
      </header>
    </div>
  );
}
*/

function App() {
  return (
    <div className="App">
      <CssBaseline /> 
      <LandingPage />
    </div>
  );
}

export default App;
