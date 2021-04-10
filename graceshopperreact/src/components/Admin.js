import {Link} from 'react-router-dom';
import { Redirect } from 'react-router';
import { React, useEffect, useState} from 'react';
import { fetchProducts, destroyProduct } from '../api';

const Admin = ({isAdmin}) =>{
    const [allProducts, setAllProducts] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        try{ console.log('in useEffect')
         const response = await fetchProducts()
         setAllProducts(response)
         console.log(allProducts)
        } catch (error){
         console.log(error)
        }
    }, [])
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
            allProducts?.map(product => {
                return (
                <div>
                <h1>Title: {product.title}</h1>
                <p>Artist: {product.artist}</p>
                <p>Genre: {product.genre}</p>
                <div>{product.imageLink}</div>
                <img src={product.imageLink}/>
                <button>Edit</button>
                <button onClick={destroyProduct()}>Delete</button>
                </div>
            )})
            }</div>
            </div>
        )   
    }
}


export default Admin;