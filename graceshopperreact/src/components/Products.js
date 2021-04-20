import React, { useState, useEffect } from "react";
import { storeToken } from "../auth";
import {Redirect} from "react-router-dom"
import {fetchProducts, createCartItem} from "../api"

//console.log('??')
const Products = ({loggedIn, currentUser}) => {
    const [products, setProducts] = useState([]);
    const [numProductInCart, setNumProductInCart] = useState(1)

    //const userId = currentUser.id
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        console.log('in useEffect')
        const response = await fetchProducts()
        setProducts(response)
        //console.log(products)
    }, []);

    let guestCart = [] 
    let productToAdd = {}
    return (
        <div>
        <hr></hr>
        {
            products?.map(product => {
                return (
                <div>
                <h1>Title: {product.title}</h1>
                <div>{product.imageLink}</div>
                <img src={product.imageLink} height="200" with ="200"/>
                <button value={product.id} onClick={async()=>{
                    if (loggedIn) {
                        productToAdd.userId = currentUser.id
                        productToAdd.productId = product.id
                        productToAdd.quantity = 1
                        const response = await createCartItem(productToAdd)
                    } else if (!loggedIn){
                        if (localStorage.getItem('guestCartItems')) {
                        guestCart = JSON.parse(localStorage.getItem('guestCartItems'))
                        guestCart.push(product.id)
                        const newCart = JSON.stringify(guestCart)
                        localStorage.setItem('guestCartItems', newCart)
                        } else {
                            guestCart = [product.id]
                            let newCart = JSON.stringify(guestCart)
                            localStorage.setItem('guestCartItems', newCart)}
                    }
                }}>Add Record to Cart</button>
                <hr></hr>
                </div>
            )})
        }
        </div>
    )
}

export default Products

