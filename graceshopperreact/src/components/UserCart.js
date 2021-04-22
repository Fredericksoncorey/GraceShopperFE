//Issue: when refreshing page, using browser refresh, it says car is empty.
import {React, useEffect, useState} from 'react';
import {fetchProducts, fetchUserCartItems, deleteCartItem, createOrder, updateItemQuantity} from "../api"

const UserCart = ({loggedIn, currentUser}) =>{
    const [allProducts, setAllProducts] = useState([])
    const [userCart, setUserCart] = useState([])
    const [quantityResp, setQuantityResp] = useState()
    const [currentItem, setCurrentItem] = useState()
    const [cartTotal, setCartTotal] = useState(0)
    let total = 0
    let totals = []

    const getTotal = (totals) =>{
        
        let finalTotal = 0
        totals.forEach(total=>{
            finalTotal = finalTotal + total
        })
        return finalTotal


    } 
   
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const response = await fetchProducts()
        setAllProducts(response)
     }, []);
    
    const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await updateItemQuantity(currentItem.id, currentItem.quantity)
                setQuantityResp(response)
            } catch (error) {
                console.log(error)
            } finally {

            } document.getElementById("itemQuantity").reset()
        } 
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        if(!currentUser){
            return
        }
        const response = await fetchUserCartItems(currentUser.id)
        setUserCart(response)
    }, [quantityResp, currentUser]);

    
    if (!userCart[0]) {
        return  (
            <div className="register">
                <h2 className="cartH2" >Your cart is empty.</h2>
            </div>)
    } else { 

        return (
        <div className="home">
        {userCart?.map(item => {
            // eslint-disable-next-line eqeqeq
            let index = allProducts.findIndex((idx) => idx.id == item.product)
            
            if (allProducts[index]) { 
                totals.push((parseFloat(allProducts[index].price.slice(1)) * item.quantity))
                
            } 
            return (
            <div>
            {allProducts[index] ? 
                <div className="cartProducts">
                     <img alt='' src={allProducts[index].imageLink} height="50" with ="50"/>
                    <div className='cartProductInfo'>
                        <p>Title: {allProducts[index].title}</p> 
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {allProducts[index].price}</p>
                        <p id="total" value ={(parseFloat(allProducts[index].price.slice(1)) * item.quantity)}>Total: ${(parseFloat(allProducts[index].price.slice(1)) * item.quantity)}</p>
                    </div>
            </div>
            : <p></p>}
            <div className="removeItem">
                <button onClick={async()=> {
                    const response = await deleteCartItem(item.id)
                    // eslint-disable-next-line eqeqeq
                    setUserCart(userCart.filter(cartItem => cartItem.id != response.id));
                }}>Remove Item From Cart</button>
                <form id="itemQuantity" onSubmit={handleSubmit}>
                    <label htmlFor = "quantity">Quantity:</label>
                    <input type ="number" min="1" placeholder={item.quantity}
                        onChange={(e) => { 
                        total = cartTotal - (parseFloat(allProducts[index].price.slice(1)) * item.quantity)
                        item.quantity = parseInt(e.target.value) 
                        total = total + (parseFloat(allProducts[index].price.slice(1)) * item.quantity)
                        setCartTotal(total)
                        }}
                        />
                    <button type="submit" onClick={()=> setCurrentItem(item)}>Change Quantity</button>
                </form>
                <hr></hr>
                </div>
            </div>
            )
        })} 
        
        <p className="total">Cart Total ${getTotal(totals)}</p>
        <button className="checkout" onClick={async()=>{
            alert('Your order has been placed, Thank you!')
            userCart.map(async (item) => {
                await createOrder(currentUser.id, null, item.product, item.quantity)
                await deleteCartItem(item.id)
            })
            setUserCart([])
        }}>Checkout</button>
        </div>    
    )}
}

export default UserCart;

