import {React, useEffect, useState} from 'react';
import { fetchProducts } from '../api'

const Home = ({loggedIn, currentUser}) => {
    const [allProducts, setAllProducts] = useState([]);
    const [keyword, setKeyword] = useState('')
     useEffect(async () => {
         console.log('in useEffect')
        const response = await fetchProducts()
         setAllProducts(response)
         console.log(allProducts)
     }, []);
    /* useEffect(() => {
        getAllProductsWithReviews(allProducts) 
        .then(response => {
            console.log(response)
            setAllProducts(response.data);
        })
        
    }, []) */

    /* const handleSubmit = (event) => {
        event.preventDefault();
        if (event.target[0].value) {
            const searchTerm = event.target[0].value.toLowerCase();
            const filtered = posts.filter(post => {
                const { title, description, location, author: { username } } = post;
                if (title.toLowerCase().indexOf(searchTerm) >= 0 ||
                    description.toLowerCase().indexOf(searchTerm) >= 0 ||
                    location.toLowerCase().indexOf(searchTerm) >= 0 ||
                    username.toLowerCase().indexOf(searchTerm) >= 0) {
                    return true;
                }
                return false;
            })
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts(null);
        }
    }
 */
    const productFilter = (keyword) => {
        const searchProducts = allProducts.filter(filteredProduct(keyword))
        setAllProducts(searchProducts)
    }
    const filteredProduct = (keyword) => {
            let products = allProducts.map(function (product){
            if ((product.title || product.description||product.genre).includes(keyword)){
                return products
            }else return
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