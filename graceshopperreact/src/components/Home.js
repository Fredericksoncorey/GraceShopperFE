import {React, useEffect, useState} from 'react';
import { getAllProductsWithReviews } from '../api'

const Home = ({loggedIn, currentUser}) => {
    /* const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
        getAllProductsWithReviews() 
        .then(response => {
            console.log(response)
            setAllProducts(response.data);
        })
        
    }, [])
console.log(allProducts) */
        return (<div>
            
            
            {/* {
            allProducts?.map((product, index) => {
                return (
                    <div className='product' key={index}>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                    </div>
                )
            })
        } */}
        <h1>hello</h1>
        <button onClick={()=>{console.log(currentUser)}}>LogginCheck</button>
        </div>)

}

export default Home;