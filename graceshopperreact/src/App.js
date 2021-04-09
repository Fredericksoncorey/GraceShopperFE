import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, Switch, Route} from "react-router-dom"
import {getToken, clearToken} from "./auth"
import {
  Admin,
  Login,
  Profile,
  Register,
  AdminCreateProduct,
  Products,
  Home
} from "./components"


const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(getToken());
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (loggedIn) {
        try {
            //const data = await fetchUserData();
            //setCurrentUser(data.username);
            
        } catch (error) {
            console.error(error);
        }
    }
  }, [loggedIn])


  return (
    <Router>
      <nav className="navBar">
        <h1>Grace-Shopper</h1>
        <div>
          <Link className="Link" to= '/'>Home</Link>
          <Link className="Link" to= '/products'>Shop</Link>
          <Link className="Link" to= '/cart'>Cart</Link>
          <Link className="Link" to= '/orders'>Orders</Link>
          {!loggedIn ? <Link className="Link" to= '/login'>Login</Link> : null}
          <Link className="Link" to= '/register'>Sign Up</Link>
          <Link className="Link" to= '/admin'>Admin Link</Link>
          <Link className="Link" to= '/profile'>My Profile</Link>

          {loggedIn ? <Link className="Link" onClick={() => {
                        clearToken();
                        //setUsername(null);
                        setLoggedIn(null);
                        
                        //setCurrentUser(null)
                    }}
                        to='/'>Log Out</Link> : null}
        </div>
      </nav>
      <main>
        <Switch>
          <Route exact path= '/'>
             <Home />
          </Route>         
          
          <Route path='/Login'>
          <Login 
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setCurrentUser={setCurrentUser}
            />          
          </Route>
          
          <Route path='/Register'>
            <Register 
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setCurrentUser={setCurrentUser}
            />          
          </Route>
          
          <Route path='/products'>
            <Products/>
          </Route>

          <Route path='/profile'>
            <Profile />
          </Route>
          
          <Route path='/admin'>
            <Admin />
          </Route>
          
          <Route path='/adminCreateProduct'>
            <AdminCreateProduct />
          </Route> 

          

        </Switch>  
      </main>
    </Router>
  );
}

export default App;

