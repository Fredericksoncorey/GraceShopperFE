import { React, useState, useEffect } from "react";
import { deleteUser, getAllUsers} from "../api";

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

  const handleSubmitDelete = async (deleteUserId) => { 
    try {
      const response = await deleteUser(deleteUserId);
        setUsers(users.filter(user => user.id !== deleteUserId))
        console.log(response)
    } catch (error) {
      throw error;
    }
  };

  return (<div>
      <h1 className="listheader">List of all users:</h1>
      <div className="users">
            {users?.map(user => {
                return(
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <button type="button" onClick={() => handleSubmitDelete(user.id)}>Delete</button>
                </div>
                )
            })}
        </div>
        </div>
  )
}

export default Users;