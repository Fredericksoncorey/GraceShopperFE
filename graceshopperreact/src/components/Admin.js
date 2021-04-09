import {Link} from "react-router-dom"
import { Redirect } from 'react-router';
const Admin = ({isAdmin}) =>{
    if (!isAdmin ){
        return <Redirect to="/" />
    }else{
        return(
            <div>
                <h1>Admin Page</h1>
            <Link to="/adminCreateProduct">
                    Add a Product To List
            </Link> 
            </div>
        )
    }
}

export default Admin;