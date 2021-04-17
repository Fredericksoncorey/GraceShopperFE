import React, { useState, useEffect } from "react";

import {fetchUserOrders} from "../api"

const Orders = ({currentUser}) => {
    let [orders, setOrders] = useState([]) 
    useEffect(async()=>{
    try {
        const response = await fetchUserOrders(currentUser.id)
        setOrders(response)
        
    } catch (error) {
    }
    }, [])
    console.log(orders)
    return (
        <div className="myorders">
            <h2>Order History</h2>
            {orders?.map(order => {
                return(
                <div>Product: {order.productId}</div>)
            })}
        </div>

    )}

export default Orders