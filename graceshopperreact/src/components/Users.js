import { React, useState, useEffect } from "react";
import { deleteUser, getAllUsers} from "../api";

  const Users = ({isAdmin}) =>{
      const [users, setUsers] = useState([])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const response = await getAllUsers();
      setUsers(response)
    } catch (error) {
      console.log(error);
    }
  }, [])

  const handleSubmitDelete = async (deleteUserId) => { 
    try {
        await deleteUser(deleteUserId);
        setUsers(users.filter(user => user.id !== deleteUserId))
    } catch (error) {
      throw error;
    }
  };

  return (<div>
      <h1 className="listheader">List of all users:</h1>
      <div className="users">
            {users?.map(user => {
                return(
                <div className="myusers">
                    <h1 className="username">Username: <em>{user.username}</em></h1>
                    <h1 className= "username">Email: <em>{user.email}</em></h1>
                    <button type="button" onClick={() => handleSubmitDelete(user.id)}>Delete</button>
                </div>
                )
            })}
        </div>
        </div>
  )
}

export default Users;