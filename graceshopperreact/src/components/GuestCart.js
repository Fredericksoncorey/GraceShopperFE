import {React, useEffect, useState} from 'react';

let cart = []
let newCart = ''
 let numCartItems = 1
 let moreCartItems = true
 let productIds = []
//  localStorage.getItem('guestCartItems')
//  cart = JSON.parse(localStorage.getItem('guestCartItems'))
//  console.log('cart :',cart)

const GuestCart = () => {
    const [guestCart, setGuestCart] = useState(cart);

    useEffect(async () => {
    localStorage.getItem('guestCartItems')
    cart = await JSON.parse(localStorage.getItem('guestCartItems'))
    //console.log('cart :',cart)
    setGuestCart(cart)
    }, [])
        //setGuestCart(cart)
        //console.log(guestCart)
    if (!guestCart[0]){
        return (<h2>Your Guest Cart is Empty.</h2>)
    } else {
        return (
            <div>{
            guestCart.map((productId, idx) => {
                console.log(guestCart)
                return (
                    <div>
                        <p>Product Id: {productId}</p>
                        <button onClick={()=> { 
                            //console.log(idx)
                            cart.splice(idx, 1)
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
                onChange={(e) => ({})}
                />
            <button>Click To Checkout</button>
            </form>
            </div>
        ) 
    }
}

export default GuestCart