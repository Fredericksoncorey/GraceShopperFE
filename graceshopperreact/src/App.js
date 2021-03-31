import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, Switch, Route} from "react-router-dom"
import {getToken, clearToken} from "./auth"

const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(getToken());
  const [activities, setActivities] = useState(null);
  

  return (
    <Router>
      <nav className="navBar">
        <h1>Grace-Shopper</h1>
        <div>
          <Link className="Link" to= '/'>Home</Link>
          <Link className="Link" to= '/products'>Shop</Link>
          <Link className="Link" to= '/cart'>Cart</Link>
          <Link className="Link" to= '/orders'>Orders</Link>
          <Link className="Link" to= '/login'>Login</Link>
          <Link className="Link" to= '/register'>Sign Up</Link>
          <Link className="Link" to= '/admin'>Admin Link</Link>
          <Link className="Link" to= '/profile'>My Profile</Link>

          {/* {loggedIn ? <Link className="Link" onClick={() => {
                        clearToken();
                        //setUsername(null);
                        setLoggedIn(null);
                        setAuthorized(null)
                        setCurrentUser(null)
                    }}
                        to='/'>Log Out</Link> : null} */}
        </div>
      </nav>
      <main>
        <Switch>
          <Route exact path= '/'>
          </Route>
          
          <Route path='/Login'>
          </Route>
          
          <Route path='/Register'>
          </Route>
          
          <Route path='/routines'>
          </Route>

          <Route path='/myRoutines'>
          </Route>
          
          <Route path='/activities'>
          </Route>
          
          <Route path='/createRoutine'>
          </Route> 

        </Switch>  
      </main>
    </Router>
  );
}

export default App;

