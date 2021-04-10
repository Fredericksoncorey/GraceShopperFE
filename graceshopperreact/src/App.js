import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, Switch, Route} from "react-router-dom"
import {getToken, clearToken} from "./auth"
import {getUserInfo} from "./api"
import {
  Admin,
  Login,
  Profile,
  Register,
  AdminCreateProduct,
  Products,
  Home,
  Cart
} from "./components"


const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(getToken());
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (loggedIn) {
        try {
            const data = await getUserInfo(loggedIn);
            console.log(data)
            setCurrentUser(data);
            if(data.isAdmin){
              setIsAdmin(true)
            }
            
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
          {!loggedIn ?<Link className="Link" to= '/register'>Sign Up</Link> : null}
          {isAdmin ? <Link className="Link" to= '/admin'>Admin Link</Link>: null}
          <Link className="Link" to= '/profile'>My Profile</Link>

          {loggedIn ? <Link className="Link" onClick={() => {
                        clearToken();
                        setCurrentUser(null)
                        setLoggedIn(null)
                        setIsAdmin(false)
                        
                        
                    }}
                        to='/'>Log Out</Link> : null}
        </div>
      </nav>
      <main>
        <Switch>
          <Route exact path= '/'>
             <Home loggedIn={loggedIn} currentUser={currentUser}/>
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

          <Route path='/cart'>
            <Cart
            loggedIn={loggedIn}
            currentUser={currentUser}
            />
          </Route>
          
          <Route path='/products'>
            <Products
            loggedIn={loggedIn}
            currentUser={currentUser}
            />
          </Route>

          <Route path='/profile'>
            <Profile />
          </Route>
          
          <Route path='/admin'>
            <Admin isAdmin={isAdmin}/>
          </Route>
          
          <Route path='/adminCreateProduct'>
            <AdminCreateProduct isAdmin={isAdmin}/>
          </Route> 

          

        </Switch>  
      </main>
    </Router>
  );
}

export default App;

