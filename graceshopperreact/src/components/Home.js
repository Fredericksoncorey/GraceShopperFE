import {React, useEffect, useState} from 'react';
import { fetchProducts, searchProductsByArtist } from '../api'

const Home = ({loggedIn, currentUser}) => {
    const [allProducts, setAllProducts] = useState([]);
    //const [keyword, setKeyword] = useState('')
    const [search,setSearch] = useState()
    const [searchResults, setSearchResults] = useState()
     
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setSearchResults(await searchProductsByArtist(search)) 
            
        } catch (error) {
            throw error
        }


    }
// eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        if(!searchResults){
            return
        }else{
            console.log(searchResults)
        }
        
    }, [searchResults]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    /* const productFilter = (event) => {
        event.preventDefault()
        let keyword = event.target.value
        const searchProducts = allProducts.filter(filteredProduct(keyword))
        setAllProducts(searchProducts)
    }
    const filteredProduct = (keyword) => {
            let products = allProducts.map(function (product){
            if ((product.title || product.description||product.genre).includes(keyword)){
                return products
            }else return
           })
    } */
        return (
        <div>
            {/*         <input 
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
                } */}
        
        <form onSubmit={handleSubmit}>
            <h3> Search:</h3>
            <label>Search By Artist:</label>
            <input
            name="artist"
            required
            onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">submit</button>

        </form>
        <h1>hello</h1>
        <button onClick={()=>{console.log(currentUser)}}>LogginCheck</button>
            {!searchResults ? allProducts?.map(product => {
                return (
                    <div>
                        <h3>Title: {product.title}</h3>
                        <p>{product.desciption}</p>
                        <p>{product.artist}</p>
                        <p>{product.genre}</p>
                        <p>{product.releaseDate}</p>
                        <p>{product.price}</p>
                        <p>{product.quantity}</p>
                        
                        <img alt="imageLink" src={product.imageLink}/>
                    </div>
                )
            })
            
            :  searchResults?.map(product => {
                return (
                    <div>
                        <h1>Title: {product.title}</h1>
                        <div>{product.imageLink}</div>
                        <img alt="imageLink" src={product.imageLink}/>
                    </div>
                )
            })
                
            }
        
    </div> )          

         

}

export default Home;