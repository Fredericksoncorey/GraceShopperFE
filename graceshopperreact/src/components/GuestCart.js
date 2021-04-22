/* eslint-disable no-unused-vars */
import {React, useEffect, useState} from 'react';
import {createGuestOrder, fetchProducts} from "../api"

let cart = []
let newCart = ''
let quantity = []
let newQuantity = ''

const GuestCart = () => {
    const [allProducts, setAllProducts] = useState([])
    const [guestCart, setGuestCart] = useState(cart);
    const [questQuantity, setGuestQuantity] = useState(quantity)
    const [guestEmail, setGuestEmail] = useState('')
    const [cartTotal, setCartTotal] = useState(0)
    const [currentItem, setCurrentItem] = useState()
    let totals = []

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        } catch (error) {
            console.log(error)
        } finally {

        } document.getElementById("itemQuantity").reset()
    } 

    const getTotal = (totals) =>{
        let finalTotal = 0
        totals.forEach(total=>{
            finalTotal = finalTotal + total
        })
        return finalTotal


    } 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
    localStorage.getItem('guestCartItems')
    cart = await JSON.parse(localStorage.getItem('guestCartItems'))
    quantity = await JSON.parse(localStorage.getItem('guestQuantity'))
    setGuestCart(cart)
    setGuestQuantity(quantity)
    }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const response = await fetchProducts()
        setAllProducts(response)
     }, []);

    if (!guestCart[0]){
        return(
            <div className="register">
                <h2 className="cartH2" >Your cart is empty.</h2>
            </div>)
    } else {
        return (
            <div className="home ">{
            guestCart?.map((item, pos) => {
                // eslint-disable-next-line eqeqeq
                let index = allProducts.findIndex((idx) => idx.id == item)
                
                if (allProducts[index]) { 
                    totals.push((parseFloat(allProducts[index].price.slice(1)) * quantity[pos]))
                }

                return (
                <div>
                    {allProducts[index] ? 
                    <div className="cartProducts">
                    <img alt="" src={allProducts[index].imageLink} height="50" with ="50"/>
                    <div className='cartProductInfo'>
                    <p>Title: {allProducts[index].title}</p> 
                    <p>Price: {allProducts[index].price}</p>
                    <p>Quantity: {quantity[pos]}</p>
                    <p>Total: {quantity[pos] * parseFloat(allProducts[index].price.slice(1))}</p>
                    </div>
                    </div>
                    : <p></p>} 
                        <div className="removeItemGuest">
                        <button onClick={()=> { 
                            cart.splice(pos, 1)
                            quantity.splice(pos, 1)
                            cart = [...cart]
                            quantity = [...quantity]
                            newCart = JSON.stringify(cart)
                            newQuantity = JSON.stringify(quantity)
                            localStorage.setItem('guestCartItems', newCart)
                            localStorage.setItem('guestQuantity', newQuantity)
                            setGuestCart(cart)
                            setGuestQuantity(quantity)
                        }}>Remove Item From Cart</button>
                            <form id="itemQuantity" onSubmit={handleSubmit}>
                            <label htmlFor = "quantity">Quantity:</label>
                            <input type ="number" min="1" placeholder={quantity[pos]}
                                onChange={(e) => { 
                                quantity.splice(pos, 1, parseInt(e.target.value))
                                newQuantity = JSON.stringify(quantity)
                                localStorage.setItem('guestQuantity', newQuantity)
                                quantity = [...quantity]
                                setGuestQuantity(quantity)
                                }}
                                />
                            <button type="submit" onClick={()=> setCurrentItem(item)}>Change Quantity</button>
                            </form>
                        <hr></hr>
                        </div>
                    </div>
                )

            })}
            <form className="checkoutGuest">
            <label for ="email" >Email:</label>
                <input
                name="email"
                type = "email"
                required
                onChange={(e) => setGuestEmail(e.target.value)}
                />
                <p>Cart Total ${getTotal(totals)}</p>
            <button onClick={async() => {
                alert('Your order has been placed, Thank you!')
                guestCart.map(async (item) => {
                    await createGuestOrder(null, guestEmail, item, 1)
                    localStorage.setItem('guestCartItems', "[]")
                })
            }}>Click To Checkout</button>
            </form>
            </div>
        ) 
    }
}

export default GuestCart