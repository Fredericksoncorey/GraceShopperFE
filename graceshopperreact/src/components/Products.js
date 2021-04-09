import React, { useState, useEffect } from "react";
import { storeToken } from "../auth";
import {Redirect} from "react-router-dom"
import {fetchProducts} from "../api"

//console.log('??')
const Products = () => {
    const [products, setProducts] = useState([]);
    const [numProductInCart, setNumProductInCart] = useState(1)
    //console.log('??')
    useEffect(async () => {
        console.log('in useEffect')
        const response = await fetchProducts()
        setProducts(response)
        console.log(products)
    }, []);
    
    
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
                <button onClick={()=> {
                    localStorage.setItem(`Product: ${numProductInCart}`, product.id)
                    setNumProductInCart(numProductInCart + 1)
                }}>Add ProductId to LocalStorage</button>
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