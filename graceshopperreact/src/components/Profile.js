import { Link } from "react-router-dom";
import { React, useState, useEffect } from "react";
import { Redirect } from "react-router";
import { getUserInfo } from "../api";


const Profile = ({userEdit, setUserEdit,loggedIn}) =>{
    const [users, setUsers] = useState([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
      try {
        const response = await getUserInfo(users);
        setUsers(response)
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    }, [])
    if (!loggedIn) {
        return <Redirect to="/" />;
      } else {
    return (<div>
        <h1>Your Account information:</h1>
              {users?.map(user => {
                  return(
                  <div>
                      <h1>Username: {user.username}</h1>
                      <h1>Email: {user.email}</h1>
                      <Link to="/editprofile">Edit Profile</Link>
                  </div>
                  )
              })}
              </div>
    )}
}

export default Profile;