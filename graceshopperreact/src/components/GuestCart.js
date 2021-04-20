import {React, useEffect, useState} from 'react';
import {createGuestOrder, fetchProducts} from "../api"

let cart = []
let newCart = ''
 let numCartItems = 1
 let moreCartItems = true
 let productIds = []
//  localStorage.getItem('guestCartItems')
//  cart = JSON.parse(localStorage.getItem('guestCartItems'))
//  console.log('cart :',cart)

const GuestCart = () => {
    const [allProducts, setAllProducts] = useState([])
    const [guestCart, setGuestCart] = useState(cart);
    const [guestEmail, setGuestEmail] = useState('')

    useEffect(async () => {
    localStorage.getItem('guestCartItems')
    cart = await JSON.parse(localStorage.getItem('guestCartItems'))
    //console.log('cart :',cart)
    setGuestCart(cart)
    }, [])

    useEffect(async () => {
        const response = await fetchProducts()
        setAllProducts(response)
        //console.log(allProducts)
     }, []);

        //setGuestCart(cart)
        //console.log(guestCart)
    if (!guestCart[0]){
        return(
            <div className="register">
                <h2 className="cartH2" >Your cart is empty.</h2>
            </div>)
    } else {
        return (
            <div className="home ">{
            guestCart?.map((item, pos) => {
                let index = allProducts.findIndex((idx) => idx.id == item)
                return (
                <div>
                {allProducts[index] ? 
                <div className="cartProducts">
                <img src={allProducts[index].imageLink} height="50" with ="50"/>
                <div className='cartProductInfo'>
                        <p>Title: {allProducts[index].title}</p> 
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {allProducts[index].price}</p>
                        <p>Total: ${(parseFloat(allProducts[index].price.slice(1)) * item.quantity)}</p>
                    </div>
                </div>
                : <p></p>} 
                    <div className="removeItemGuest">
                    <button onClick={()=> { 
                        //console.log(idx)
                        cart.splice(pos, 1)
                        cart = [...cart]
                        //console.log(cart)
                        newCart = JSON.stringify(cart)
                        localStorage.setItem('guestCartItems', newCart)
                        setGuestCart(cart)
                    }}>Remove Item From Cart</button>
                    </div>
                    <hr></hr>
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
            <button onClick={async() => {
                alert('Your order has been placed, Thank you!')
                guestCart.map(async (item) => {
                    const responseOrder = await createGuestOrder(null, guestEmail, item, 1)
                    localStorage.setItem('guestCartItems', "[]")
                })
            }}>Click To Checkout</button>
            </form>
            </div>
        ) 
    }
}

export default GuestCart