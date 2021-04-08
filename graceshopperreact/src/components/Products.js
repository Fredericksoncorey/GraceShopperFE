import React, { useState, useEffect } from "react";
import { storeToken } from "../auth";
import {Redirect} from "react-router-dom"
import {fetchProducts} from "../api"

//console.log('??')
const Products = () => {
    const [products, setProducts] = useState([]);
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
                <hr></hr>
                </div>
            )})
        }
        {/* <h1>Title: {products[0].title}</h1>
        <div>{products[0].imageLink}</div>
        <img src={products[0].imageLink}/>
        <hr></hr> */}
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