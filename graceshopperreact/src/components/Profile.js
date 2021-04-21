import { React } from "react";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";

const Profile = ({userEdit, setUserEdit,loggedIn, currentUser}) =>{
    let history = useHistory();
    if (!loggedIn) {
        return <Redirect to="/" />;
      } else {
    return (<div className="home">
        <h1 className="account">Your Account information:</h1>
                  <div className="myprofile">
                      <h1 className="username">Username: </h1>
                      <h2 className="user">{currentUser.username}</h2>
                      <h1 className="username">Email: </h1>
                      <h2 className="user">{currentUser.email}</h2>
                      <button type="button" onClick={() => 
               {setUserEdit(currentUser.id); history.push("/editprofile") }}>Edit</button>
                  </div>
              </div>)
    }
}

export default Profile;