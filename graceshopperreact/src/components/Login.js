import React, { useState } from "react";
import { storeToken } from "../auth";
import {Redirect} from "react-router-dom"
import {logIn} from '../api'
const Login = ({setCurrentUser, loggedIn, setLoggedIn }) => {
  const [user, setUser] = useState("");


  function helperHandleSubmit(e) {
    setUser({ ...user, password: e.target.value });
    //setCurrentUser(user.username);
    /* console.log(currentUser); */
  }

  
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(user)
    try {
        const response = await logIn(user)
        console.log(response)
        if (response.name === "IncorrectCredentialsError") {
          alert(response.message);
        } else {
          alert(response.message);
          setLoggedIn(response.token)
          storeToken(response.token);
        }
    } catch (error) {
        
    }
    
      
  };
  if (loggedIn) {
    return <Redirect to="/" />
  }else{
    return (
      <form onSubmit={handleSubmit}>
        <h1> Login:</h1>
        <label>Username:</label>
        <input
          name="Username"
          required
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <label>Password:</label>
        <input type="password" required onChange={(e) => helperHandleSubmit(e)} />
        <button type="submit">submit</button>
      </form>
    );
  }
};

export default Login;