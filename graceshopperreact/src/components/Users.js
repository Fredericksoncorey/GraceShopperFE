import { React, useState, useEffect } from "react";
import { getAllUsers} from "../api";

  const Users = ({isAdmin}) =>{
      const [users, setUsers] = useState([])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const response = await getAllUsers();
      setUsers(response)
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  }, [])
  return (<div>
            {users?.map(user => {
                return(
                <div>
                    <h1>Username: {user.username}</h1>
                    <h1>Email: {user.email}</h1>
                    <button type="button" >Delete</button>
                </div>
                )
            })}
            </div>
  )
}

export default Users;