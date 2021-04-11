import {Link} from 'react-router-dom';
import { Redirect } from 'react-router';
import { React, useEffect, useState} from 'react';
import { fetchProducts, destroyProduct, updateProduct } from '../api';

const Admin = ({isAdmin}) =>{
    const [products, setProducts] = useState([]);
    const [updateProduct, setUpdateProduct] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        try{ console.log('in useEffect')
         const response = await fetchProducts()
         setProducts(response)
         console.log(products)
        } catch (error){
         console.log(error)
        }
    },[])
    const handleSubmitUpdate = async (event)=>{
        const [title, imageLink, artist, genre, releaseDate, description, price, quantity] = event.target;
        if (title.value, imageLink.value, artist.value, genre.value, releaseDate.value, description.value, price.value, quantity.value) {
                setUpdateProduct({
                    title: title.value,
                    imageLink: imageLink.value, 
                    artist: artist.value, 
                    genre: genre.value, 
                    releaseDate: releaseDate.value, 
                    description: description.value, 
                    price:price.value, 
                    quantity: quantity.value
                })
            }
        /* try {
            const response = await updateProduct(productId)
            console.log(response)
            
        }catch (error) {
            throw error
        } */
    }
    const handleSubmitDelete = async ()=>{
        /* try {
            const response = await destroyProduct(productId)
            console.log(response)    
        }catch (error) {
            throw error
        } */
    }
    if (!isAdmin ){
        return <Redirect to="/" />
    }else{
        return(
            <div>
                <h1>Admin Page</h1>
            <Link to="/adminCreateProduct">
                    Add a Product To List
            </Link>
            <form onChange={handleSubmitUpdate}>
                        <h2>Update Product:</h2>
                        <label>Title: </label>
                        <input type="text" />
                        <label>Artist: </label>
                        <input type="text" />
                        <label>Genre: </label>
                        <input type="text" />
                        <label>Release Date:</label>
                        <input type="text"/>
                        <label>Description:</label>
                        <input type="text"/>
                        <label>Price:</label>
                        <input type="text"/>
                        <label>Quantity:</label>
                        <input type="text"/>
                        <label>imageLink:</label>
                        <input type="text"/>
                        <input type="submit" value="Submit" />
            </form>        
            {
            products?.map(product => {
                return (
                    <div>
                        <h1>Title: {product.title}</h1>
                        <p>Artist: {product.artist}</p>
                        <p>Genre: {product.genre}</p>
                        <div>{product.imageLink}</div>
                        <img src={product.imageLink}/>
                        <button onClick={ () => {handleSubmitUpdate(product.id)}}>Edit</button>
                        <button onClick={() => {handleSubmitDelete(product.id)}}>Delete</button>
                    </div>
            )})
            }
            </div>
        )   
    }
}

//see users
export default Admin;