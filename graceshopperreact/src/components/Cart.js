//need to see if there is a 
import {React, useEffect, useState} from 'react';

import {fetchUserCartItems} from "../api"


let numCartItems = 1
let moreCartItems = true
let productIds = []
const Cart = ({loggedIn, currentUser}) =>{
    const [userCart, setUserCart] = useState([])
    const userId = currentUser.id 
    useEffect(async () => {
        console.log('in useEffect')
        const response = await fetchUserCartItems(userId)
        setUserCart(response)
        console.log(response)
    }, []);

    if (!loggedIn) {
    while (moreCartItems == true) {
        if (localStorage.getItem(`Product: ${numCartItems}`)) { //should probably use a json string instead
            productIds.push(localStorage.getItem(`Product: ${numCartItems}`))
            //console.log(productIds)
            numCartItems = numCartItems + 1
        } else {moreCartItems = false}
    } //console.log('out of loop')
    
    return (
    productIds.map(productId => {
        //console.log(productId)
    return (
        <div>
            <p>Product Id: {productId}</p>
        <hr></hr>
        </div>
    )}))
    } else if (loggedIn) {
    return (
     userCart.map(item => {
         return (
         <div>
         <p>Product Id: {item.product}</p>
         <hr></hr>
        </div>
         )
     })
)}
}

export default Cart;

