import React, { useState } from "react";
import {Redirect} from "react-router-dom"
import {register} from "../api"
import { storeToken } from "../auth";
const Register = ({ setAuthorized, loggedIn, setLoggedIn }) => {
  const [user, setUser] = useState("");
 

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
        const response = await register(user)
        if (response.message === "Thank you for signing up!") {
          alert(response.message);
          setLoggedIn(response.token)
          storeToken(response.token);
        } else {
          alert(response.message);
        }
    } catch (error) {
        
    }
  };
  if (loggedIn) {
    return <Redirect to="/" />
  }else{
    return (
      <div className="register">
        <form onSubmit={handleSubmit}>
          <h1> Registration</h1>
          <label>Username:</label>
          <input
            name="Username"
            required
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <label>Password:</label>
          <input
            type="password"
            required
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <label for ="email" >Email:</label>
          <input
            name="email"
            type = "email"
            required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }    
};

export default Register;


