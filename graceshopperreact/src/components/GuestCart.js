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
        return (<h2>Your Guest Cart is Empty.</h2>)
    } else {
        return (
            <div>{
            guestCart?.map((item, pos) => {
                let index = allProducts.findIndex((idx) => idx.id == item)
                return (
                <div>
                {allProducts[index] ? 
                <div>
                <img src={allProducts[index].imageLink} height="50" with ="50"/>
                <p>Title: {allProducts[index].title}</p> 
                <p>Price: {allProducts[index].price}</p>
                </div>
                : <p></p>} 
                    <button onClick={()=> { 
                        //console.log(idx)
                        cart.splice(pos, 1)
                        cart = [...cart]
                        //console.log(cart)
                        newCart = JSON.stringify(cart)
                        localStorage.setItem('guestCartItems', newCart)
                        setGuestCart(cart)
                    }}>Remove Item From Cart</button>
                    <hr></hr>
                    </div>
                )
            })}
            <form>
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