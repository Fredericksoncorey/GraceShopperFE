import { React, useState } from "react";
import { editProfile} from "../api";

const EditUser = ({userEdit, setUserEdit}) => {
  const [user, setUser] = useState({id:userEdit});

  const handleSubmitUpdate = async (event) => {
      event.preventDefault()
    try {
      const response = await editProfile(user);
      console.log(response)
      setUser(response)
      console.log(user);
    } catch (error) {
      throw error;
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmitUpdate}>
        <h2>Update Profile:</h2>
        <label>Username: </label>
        <input type="text" onChange={(event) => setUser({...user, username: event.target.value})} placeholder={user.username}/>
        <label>Email: </label>
        <input type="text" onChange={(event) => setUser({...user, email: event.target.value})} placeholder={user.email}/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default EditUser;