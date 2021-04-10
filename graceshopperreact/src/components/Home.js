import {React, useEffect, useState} from 'react';
import { getAllProductsWithReviews, fetchProducts } from '../api'

const Home = ({loggedIn, currentUser}) => {
    const [allProducts, setAllProducts] = useState([]);
    const [keyword, setKeyword] = useState('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
       try{ console.log('in useEffect')
        const response = await fetchProducts()
        setAllProducts(response)
        console.log(allProducts)
    } catch (error){
        console.log(error)
    }
    }, []);
    // useEffect(() => {
    //     getAllProductsWithReviews(allProducts) 
    //     .then(response => {
    //         console.log(response)
    //         setAllProducts(response.data);
    //     })   
    // }, [])
    const productFilter = (keyword) => {
        const searchProducts = allProducts.filter(filter(keyword))
        return setAllProducts(searchProducts)
    }
    const filter = (keyword) => {
            let products = allProducts.map(function (product){
            if ((product.title || product.description).includes(keyword)){
                return products
            }
           })
    }
        return (<div>
                <input 
                key="products"
                value={keyword}
                placeholder={"search"}
                onChange={(event) => setKeyword(event.target.value)}
                />
                <button onClick={() => productFilter(keyword)}>Search</button>
            
            {
            allProducts?.map((product, index) => {
                return (
                    <div className='product' key={index}>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                    </div>
                )
            })
        }
        <h1>hello</h1>
        <button onClick={()=>{console.log(currentUser)}}>LogginCheck</button>
        </div>)

}

export default Home;