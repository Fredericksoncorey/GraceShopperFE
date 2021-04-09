//need to see if there is a 
import {React, useEffect, useState} from 'react';

let numCartItems = 1
let moreCartItems = true
let productIds = []
const Cart = () =>{
    while (moreCartItems == true) {
        if (localStorage.getItem(`Product: ${numCartItems}`)) { 
            productIds.push(localStorage.getItem(`Product: ${numCartItems}`))
            console.log(productIds)
            numCartItems = numCartItems + 1
        } else {moreCartItems = false}
    } console.log('out of loop')
    
    return (
    productIds.map(productId => {
        console.log(productId)
    return (
        <div>
            <p>Product Id: {productId}</p>
        <hr></hr>
        </div>
    )}))
}

export default Cart;

