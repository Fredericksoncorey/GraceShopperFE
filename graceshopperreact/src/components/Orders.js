import React, { useState, useEffect } from "react";

import {fetchUserOrders, fetchProducts} from "../api"

const Orders = ({currentUser}) => {
    let [orders, setOrders] = useState() 
    const [allProducts, setAllProducts] = useState([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async()=>{
        if(!currentUser){
            return
        }
        try {
        const response = await fetchUserOrders(currentUser.id)
        setOrders(response)
        
    } catch (error) {
    }
    }, [currentUser])

    useEffect(async () => {
        const response = await fetchProducts()
        setAllProducts(response)
        //console.log(allProducts)
     }, []);

    console.log(orders)
    return (
        <div>Past Orders:{
        orders?.map(item => {
            let index = allProducts.findIndex((idx) => idx.id == item.id)
            console.log(index)
            return (
                
                <div>
                <hr></hr>
                {allProducts[index] ? 
                <div>
                <img src={allProducts[index].imageLink} height="50" with ="50"/>
                <p>Title: {allProducts[index].title}</p> 
                </div>
                : <p></p>}
                </div>
            )
        })}</div>
    )
    }
export default Orders