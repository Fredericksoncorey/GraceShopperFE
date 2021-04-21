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
        <div className="home">
            <h2>Past Purchases:</h2>
            
        {orders?.map(item => {
            let index = allProducts.findIndex((idx) => idx.id == item.id)
            console.log(index)
            return (
                <div> 
                    
                {allProducts[index] ? 
               <div className="homeProductList">
               <img src={allProducts[index].imageLink} height="50" with ="50"/>
              <div className='cartProductInfo'>
                  <p>Title: {allProducts[index].title}</p> 
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {allProducts[index].price}</p>
                  <p>Total: ${(parseFloat(allProducts[index].price.slice(1)) * item.quantity)}</p>
              </div>
      </div>
                : <p></p>}
                </div>
            )
        })}</div>
    )
    }
export default Orders