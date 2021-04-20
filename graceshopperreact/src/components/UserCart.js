//Issue: when refreshing page, using browser refresh, it says car is empty.
import {React, useEffect, useState} from 'react';
import {fetchProducts, fetchUserCartItems, deleteCartItem, createOrder, updateItemQuantity} from "../api"

const UserCart = ({loggedIn, currentUser}) =>{
    const [allProducts, setAllProducts] = useState([])
    const [userCart, setUserCart] = useState([])
    const [quantityResp, setQuantityResp] = useState()
    const [quantUpdate, setQuantUpdate] = useState()
    const [currentItem, setCurrentItem] = useState()
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(async () => {
        const response = await fetchProducts()
        setAllProducts(response)
        //console.log(allProducts)
     }, []);
    
    const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                //item.quantity = parseInt(e.target.value)
                //console.log(e.target.value)
                //console.log('item.id: ', item.id, 'item.quantity: ', item.quantity)
                const response = await updateItemQuantity(currentItem.id, currentItem.quantity)
                setQuantityResp(response)
            } catch (error) {
                console.log(error)
            } finally {

            } document.getElementById("itemQuantity").reset()
        } 
    
    useEffect(async () => {
        const response = await fetchUserCartItems(currentUser.id)
        setUserCart(response)
        //console.log(response)
    }, [quantityResp]);

    let newTotal = 0
    if (!userCart[0]) {
        return <h2 className="empty">Your cart is empty.</h2>
    } else { //console.log(userCart)

        return (
        <div className="userCart">{
        userCart?.map(item => {
            let index = allProducts.findIndex((idx) => idx.id == item.product)
            return (
            <div>
            {allProducts[index] ? 
            <div>
            <img src={allProducts[index].imageLink} height="50" with ="50"/>
            <p>Title: {allProducts[index].title}</p> 
            <p>Quantity: {item.quantity}</p>
            <p>Price: {allProducts[index].price}</p>
            <p>Total: ${(parseFloat(allProducts[index].price.slice(1)) * item.quantity)}</p>
            </div>
            : <p></p>}
            <button onClick={async()=> {
                const response = await deleteCartItem(item.id)
                setUserCart(userCart.filter(cartItem => cartItem.id != response.id));
                //alert("Item has been removed")
                //console.log(response)
            }}>Remove Item From Cart</button>
            <form id="itemQuantity" onSubmit={handleSubmit}>
                <label htmlFor = "quantity">Quantity:</label>
                <input type ="number" min="1" placeholder={item.quantity}
                    onChange={(e) => { 
                    item.quantity = parseInt(e.target.value) 
                    }}
                    />
                <button type="submit" onClick={()=> setCurrentItem(item)}>Change Quantity</button>
            </form>
            <hr></hr>
            </div>
            )
        })}
        <button onClick={async()=>{
            //console.log('button clicked')
            alert('Your order has been placed, Thank you!')
            console.log(userCart)
            userCart.map(async (item) => {
                //console.log('item: ', item)
                const responseOrder = await createOrder(currentUser.id, null, item.product, item.quantity)
                const response = await deleteCartItem(item.id)
                //setUserCart(userCart.filter(cartItem => cartItem.id != response.id))
            })
            setUserCart([])
        }}>Checkout</button>
        </div>    
    )}
}

export default UserCart;

