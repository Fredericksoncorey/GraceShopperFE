import { Link } from "react-router-dom";
import { React, useState, useEffect } from "react";
import { getUserInfo } from "../api";


const Profile = (userEdit, setUserEdit) =>{
    const [user, setUser] = useState([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
      try {
        const response = await getUserInfo();
        setUser(response)
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    }, [])
    return (<div>
              {user?.map(user => {
                  return(
                  <div>
                      <h1>Username: {user.username}</h1>
                      <h1>Email: {user.email}</h1>
                      <Link to="/editprofile">Edit Profile</Link>
                  </div>
                  )
              })}
              </div>
    )
}

export default Profile;