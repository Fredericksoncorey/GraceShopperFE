import {React, useEffect, useState} from 'react';
import { getAllProductsWithReviews } from '../api'

const Home = () => {
    const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
        getAllProductsWithReviews() 
        .then(response => {
            setAllProducts(response.data);
        })
    }, [])

    const SearchBar = ({keyword, setKeyword}) => {
        return (
          <input 
           key="products"
           value={keyword}
           placeholder={"search"}
           onChange={(event) => setKeyword(event.target.value)}
          />
        );
      }

        return (<div>
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
        </div>)

}

export default Home;