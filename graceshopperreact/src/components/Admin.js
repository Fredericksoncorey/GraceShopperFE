import {Link} from 'react-router-dom';
import { Redirect } from 'react-router';
import { React, useEffect, useState} from 'react';
import { fetchProducts, destroyProduct, updateProduct } from '../api';

const Admin = ({isAdmin}) =>{
    const [products, setProducts] = useState([]);
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
        event.preventDefault();
        try {
            const response = await updateProduct(products.id)
            console.log(response)
            
        }catch (error) {
            throw error
        }
    }
    const handleSubmitDelete = async (event)=>{
        event.preventDefault();
        try {
            const response = await destroyProduct(products.id)
            console.log(response)    
        }catch (error) {
            throw error
        }
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
            <div>        
            {
            products?.map(product => {
                return (
                <div>
                <h1>Title: {product.title}</h1>
                <p>Artist: {product.artist}</p>
                <p>Genre: {product.genre}</p>
                <div>{product.imageLink}</div>
                <img src={product.imageLink}/>
                <button onClick={handleSubmitUpdate(product.id)}>Edit</button>
                <button onClick={handleSubmitDelete(product.id)}>Delete</button>
                </div>
            )})
            }</div>
            </div>
        )   
    }
}


export default Admin;