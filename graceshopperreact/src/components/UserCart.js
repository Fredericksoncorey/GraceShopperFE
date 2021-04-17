//Issue: when refreshing page, using browser refresh, it says car is empty.
import {React, useEffect, useState} from 'react';
import {fetchUserCartItems, deleteCartItem, createOrder} from "../api"



const UserCart = ({loggedIn, currentUser}) =>{
    const [userCart, setUserCart] = useState([])
    let quantUpdate = 1
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
            <p>Product Quantity: {item.quantity}</p>
            <button onClick={async()=> {
                const response = await deleteCartItem(item.id)
                setUserCart(userCart.filter(cartItem => cartItem.id != response.id));
                //alert("Item has been removed")
                //console.log(response)
            }}>Remove Item From Cart</button>
            <form>
                <label htmlFor = "quantity">Quantity:</label>
                <input type ="number" min="1" onChange={(e) => { 
                    item.quantity = parseInt(e.target.value) 
                    console.log(item.quantity)
                    console.log(userCart)
                    quantUpdate = [...userCart]
                    //userCart[item].quantity = item.quantity
                    //setUserCart(userCart)
                    }}/>
                <button type="submit" onClick={()=> setUserCart(quantUpdate)}>submit</button>
            </form>
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

