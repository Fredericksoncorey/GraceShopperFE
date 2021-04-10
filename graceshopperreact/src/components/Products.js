import React, { useState, useEffect } from "react";
import { storeToken } from "../auth";
import {Redirect} from "react-router-dom"
import {fetchProducts, createCartItem} from "../api"

//console.log('??')
const Products = ({loggedIn}) => {
    const [products, setProducts] = useState([]);
    const [numProductInCart, setNumProductInCart] = useState(1)

        //need to fix this hard coding by passing in state
        const userId = 4
    //console.log('??')
    useEffect(async () => {
        console.log('in useEffect')
        const response = await fetchProducts(userId)
        setProducts(response)
        console.log(products)
    }, []);


    let productToAdd = {}
    return (
        <div>{console.log(products)}
        <hr></hr>
        {
            products?.map(product => {
                return (
                <div>
                <h1>Title: {product.title}</h1>
                <div>{product.imageLink}</div>
                <img src={product.imageLink}/>
                <button value={product.id} onClick={async()=>{
                    //const = this.getAttribute('value')
                    if (loggedIn) {
                        productToAdd.userId = userId
                        productToAdd.productId = product.id
                        productToAdd.quantity = 1
                        const response = await createCartItem(productToAdd)
                    } else if (!loggedIn){
                    localStorage.setItem(`Product: ${numProductInCart}`, product.id)
                    setNumProductInCart(numProductInCart + 1)
                    }
                    //productClickHandler
                    // if (!loggedIn) {
                    // localStorage.setItem(`Product: ${numProductInCart}`, product.id)
                    // setNumProductInCart(numProductInCart + 1)
                    // } else if (loggedIn) {
                    //     makeCartItem
                        //async () => {const response = await createCartItem(product)}
                    //}
                }}>Add ProductId to Cart</button>
                <hr></hr>
                </div>
            )})
        }
        </div>
    )
}

export default Products

// const [activities, setActivities] = useState([]);
// useEffect (async () => {
//     const response = await fetchActivities()
//     setActivities(response)
//     console.log('activities', response)
// }, [])