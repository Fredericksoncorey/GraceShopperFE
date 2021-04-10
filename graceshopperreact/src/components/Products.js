import React, { useState, useEffect } from "react";
import { storeToken } from "../auth";
import {Redirect} from "react-router-dom"
import {fetchProducts, createCartItem} from "../api"

//console.log('??')
const Products = ({loggedIn, currentUser}) => {
    const [products, setProducts] = useState([]);
    const [numProductInCart, setNumProductInCart] = useState(1)

    const userId = currentUser.id
    //console.log('??')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        console.log('in useEffect')
        const response = await fetchProducts()
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