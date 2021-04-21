import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, Switch, Route} from "react-router-dom"
import {getToken, clearToken} from "./auth"
import {getUserInfo, getGenreList} from "./api"
import {
  Admin,
  Login,
  Profile,
  Register,
  AdminCreateProduct,
  Products,
  Home,
  EditProduct,
  UserCart,
  GuestCart,
  Orders,
  Users,
  EditProfile,
  IntroPage,
} from "./components"




const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(getToken());
  const [productEdit, setProductEdit] = useState('');
  const [userEdit, setUserEdit] = useState('');
  const [genreList, setGenreList]= useState();
  const [timerDone, setTimerDone] = useState(false)

  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const response = await getGenreList()
      setGenreList(response)
    } catch (error) {
      console.error(error)
    }
  }, [])
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

  useEffect(()=>{}, [timerDone])




  return (
    <Router>
      <nav className="navBar">
        <h1 className="title">&#127932;For The Record <img className="icon" src="/record.png"></img></h1>
        <div>
          <Link className="Link" to= '/'>Home</Link>
          <Link className="Link" to= '/home'>Shop</Link>
          <Link className="Link" to= '/cart'>Cart</Link>
          {loggedIn ? <Link className="Link" to= '/orders'>Orders</Link> : null}
          {!loggedIn ? <Link className="Link" to= '/login'>Login</Link> : null}
          {!loggedIn ?<Link className="Link" to= '/register'>Sign Up</Link> : null}
          {isAdmin ? <Link className="Link" to= '/admin'>Admin Link</Link>: null}
          {loggedIn ? <Link className="Link" to= '/profile'>My Profile</Link>:null}

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
        <aside className="empty-left"></aside>
        <Switch>
          
        <Route exact path= '/'>
             <IntroPage />
          </Route>  

          <Route exact path= '/home'>
             <Home 
             loggedIn={loggedIn} 
             currentUser={currentUser}
             genreList={genreList} 
             />

          </Route>         
          
          <Route path='/Login'>
          <Login 
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setCurrentUser={setCurrentUser}
            />          
          </Route>

          <Route path='/EditProduct'>
          <EditProduct 
              productEdit = {productEdit} 
              setProductEdit = {setProductEdit}
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
            {loggedIn ? <UserCart
            loggedIn={loggedIn}
            currentUser={currentUser}
            />
            : <GuestCart/>}
          </Route>
          
          <Route path='/products'>
            <Products
            loggedIn={loggedIn}
            currentUser={currentUser}
            />
          </Route>

          <Route path='/orders'>
            <Orders currentUser={currentUser}/>
          </Route>

          <Route path='/profile'>
            <Profile 
            loggedIn={loggedIn}
            currentUser={currentUser}
            userEdit = {userEdit} 
            setUserEdit = {setUserEdit}/>
          </Route>
          
          <Route path='/admin'> {/* setProductEdit, loggedIn, currentUser, genreList */}
            <Admin 
            loggedIn={loggedIn}
            currentUser={currentUser}
            genreList={genreList}
            setIsAdmin={setIsAdmin}
            isAdmin={isAdmin}
            productEdit = {productEdit} 
            setProductEdit = {setProductEdit}
            timerDone={timerDone}
            setTimerDone={setTimerDone}/>
            
          </Route>

          <Route path='/users'>
            <Users 
            isAdmin={isAdmin}/>
          </Route>

          <Route path='/editprofile'>
            <EditProfile 
            loggedIn={loggedIn}
            userEdit = {userEdit} 
            setUserEdit = {setUserEdit}/>
          </Route>
          
          <Route path='/adminCreateProduct'>
            <AdminCreateProduct isAdmin={isAdmin}/>
          </Route> 

          

        </Switch>  
      <aside className="empty-right" ></aside>
      </main>
      <footer></footer>
    
    </Router>
    
  );
}

export default App;

