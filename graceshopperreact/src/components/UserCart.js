//Issue: when refreshing page, using browser refresh, it says car is empty.
import {React, useEffect, useState} from 'react';
import {fetchUserCartItems, deleteCartItem, createOrder} from "../api"



const UserCart = ({loggedIn, currentUser}) =>{
    const [userCart, setUserCart] = useState([])
    useEffect(async () => {
        const response = await fetchUserCartItems(currentUser.id)
        setUserCart(response)
        console.log(response)
    }, []);

    if (!userCart[0]) {
        return <h2>Your cart is empty.</h2>
    } else { console.log(userCart)
        return (
        <div>{
        userCart.map(item => {
            return (
            <div>
            <p>Product Id: {item.product}</p>
            <button onClick={async()=> {
                const response = await deleteCartItem(item.id)
                setUserCart(userCart.filter(cartItem => cartItem.id != response.id));
                //alert("Item has been removed")
                //console.log(response)
            }}>Remove Item From Cart</button>
            {/* <form>
            <label>Quantity:</label>
            <input type="text" onChange={(event) => setUserCart(userCart.item.quantity = event.target.value)} placeholder={userCart.item.quantity}/>
            </form> */}
            <hr></hr>

            </div>
            )
        })}
        <button onClick={async()=>{
            //console.log('button clicked')
            alert('Your order has been placed, Thank you!')
            userCart.map(async (item) => {
                console.log('item: ', item)
                const responseOrder = await createOrder(currentUser.id, null, item.product, 1)
                const response = await deleteCartItem(item.id)
                //setUserCart(userCart.filter(cartItem => cartItem.id != response.id))
            })
            setUserCart([])
        }}>Checkout</button>
        </div>    
    )}
}

export default UserCart;

// below is a copy of the code before I split the carts.
// //need to see if there is a 
// import {React, useEffect, useState} from 'react';

// import {fetchUserCartItems, deleteCartItem} from "../api"

// let cart = []
// // let numCartItems = 1
// // let moreCartItems = true
// // let productIds = []

// const Cart = ({loggedIn, currentUser}) =>{

//     // if (!loggedIn && localStorage.getItem('guestCartItems')){
//     //     cart = JSON.parse(localStorage.getItem('guestCartItems'))
//     //     console.log('cart :', cart)
//     // }
//     let newCart = []
//     const [userCart, setUserCart] = useState([])
//     const [guestCart, setGuestCart] = useState(cart)
//     //const userId = currentUser.id 
//     useEffect(async () => {
//         console.log('in useEffect')
//         if (currentUser) {
//         const response = await fetchUserCartItems(currentUser.id)
//         setUserCart(response)
//         console.log(response)
//         } 
//     }, []);

//     useEffect(()=>{
//         if (!loggedIn && localStorage.getItem('guestCartItems')){
//             cart = JSON.parse(localStorage.getItem('guestCartItems'))
//             console.log('cart :', cart)
//             setGuestCart(cart)
//         }
//     }, [])

//     if (!loggedIn) {
//         // if (JSON.parse(localStorage.getItem('guestCartItems')) == [] ) {
//         //     return (<h2>Your Guest Cart is Empty.</h2>)}
//         // }else if (localStorage.getItem('guestCartItems')){
//         //     cart = JSON.parse(localStorage.getItem('guestCartItems'))
//         //     console.log('cart :',cart)
//         //     //setGuestCart(cart)
//         // }
//         return (
//         guestCart.map((productId, idx) => {
//             console.log(idx)
//             return (
//                 <div>
//                     <p>Product Id: {productId}</p>
//                     <button onClick={()=> { 
//                         console.log(idx)
//                         cart.splice(idx, 1)
//                         console.log(cart)
//                         newCart = JSON.stringify(cart)
//                         localStorage.setItem('guestCartItems', newCart)
//                     //console.log('button clicked, id: ', productId)
//                     //alert("Item has been removed")
//                     //console.log(response)
//                 }}>Remove Item From Cart</button>
//                 <hr></hr>
//                 </div>
//             )
//         })
//     )
//     } else if (loggedIn) {
//     return (
//      userCart.map(item => {
//          return (
//          <div>
//          <p>Product Id: {item.product}</p>
//          <button onClick={async()=> {
//              //console.log('button clicked, id: ', item.id)
//              const response = await deleteCartItem(item.id)
//              setUserCart(userCart.filter(cartItem => cartItem.id != response.id));
//              //alert("Item has been removed")
//              //console.log(response)
//          }}>Remove Item From Cart</button>
//          <hr></hr>
//         </div>
//          )
//      })
// )}
// }

// export default Cart;



