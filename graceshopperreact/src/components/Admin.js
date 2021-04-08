import {Link} from "react-router-dom"

const Admin = () =>{

    return(
        <div>
            <h1>Admin Page</h1>
           <Link to="/adminCreateProduct">
                Add a Product To List
           </Link> 
        </div>
    )
}

export default Admin;