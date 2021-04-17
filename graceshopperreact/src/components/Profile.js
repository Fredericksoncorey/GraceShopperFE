import { Link } from "react-router-dom";
import { React, useState, useEffect } from "react";
import { Redirect } from "react-router";
import { getUserInfo } from "../api";


const Profile = ({userEdit, setUserEdit,loggedIn, currentUser, id}) =>{
    const [users, setUsers] = useState([])
    if (!loggedIn) {
        return <Redirect to="/" />;
      } else {
    return (<div>
        <h1>Your Account information:</h1>
                  <div>
                      <h1>Username: {currentUser.username}</h1>
                      <h1>Email: {currentUser.email}</h1>
                      <Link to="/editprofile">Edit Profile</Link>
                  </div>
              </div>)
    }
}

export default Profile;