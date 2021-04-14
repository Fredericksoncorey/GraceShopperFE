import {React, useEffect, useState} from 'react';
import { fetchProducts, searchProductsByArtist, searchProductsByGenre, searchProductsByTitle } from '../api'

const Home = ({loggedIn, currentUser}) => {
    const [allProducts, setAllProducts] = useState([]);
    const [artistSearch,setArtistSearch] = useState()
    const [genreSearch,setGenreSearch] = useState();
    const [titleSearch,setTitleSearch] = useState();
    const [searchFailed, setSearchFailed] = useState(false)
    const [searchResults, setSearchResults] = useState()
    const [selectedSearch, setSelectedSearch] = useState()
    
     
    const averageRating = ({reviews}) => {
        let averageRating = 0
        console.log(reviews)
        for (let i=0;i<reviews.length;i++){
            averageRating = averageRating + reviews[i].rating
        }
        averageRating = averageRating/reviews.length
        return averageRating
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            if(artistSearch){
                setSearchResults(await searchProductsByArtist(artistSearch))
            }else if(genreSearch){
                setSearchResults(await searchProductsByGenre(genreSearch))
            }else if(titleSearch){
                setSearchResults(await searchProductsByTitle(titleSearch))
            }

        } catch (error) {
            throw error
        }finally{
           /*  console.log(searchResults) */
              
        }


    }
    
    useEffect(() => {console.log(selectedSearch)}, [selectedSearch]);

// eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
            if(!searchResults){
                return
            }else if(searchResults==false){
                setSearchFailed(true)

            }else{
            setSearchFailed(false)
            }
            
        }, [searchResults]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
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
        <h3> Search:</h3>
        <form>
            <label>Search By...</label>
            <select
            name="select"
            value={selectedSearch}
            onChange={(e) => {
                return setSelectedSearch(e.target.value)}}
            >
            <option value={false}>Select One</option>
            <option value="artist">Artist</option>
            <option value="genre">Genre</option>
            <option value="title">Album Title</option>
            </select> 
            <button onClick={()=>{
                setSearchResults(null)
                setSelectedSearch(null)
                setGenreSearch(null)
                setTitleSearch(null)
                setArtistSearch(null)
            }}>Reset</button> 
             
        </form>

        {selectedSearch==="artist" ? <form onSubmit={handleSubmit}>
            
            <label>Search By Artist:</label>
            <input
            name="artist"
            placeholder="Please Input Desired Artist"
            onChange={(e) => {
                
                setArtistSearch(e.target.value)}}
            />
            <button type="submit">submit</button>   
        </form> : null }

        { selectedSearch==="genre" ? <form onSubmit={handleSubmit}>
            <label>Search By Genre:</label>
            <select
            name="genre"
            value={genreSearch}
            onChange={(e) => {
                setArtistSearch(null)
                setTitleSearch(null)
                return setGenreSearch(e.target.value)}}
            >
            <option value={false}>Select One</option>
            <option value="hardrock">Hard Rock</option>
            <option value="country">Country</option>
            </select> 
            <button type="submit">submit</button> 
             
        </form> : null }

        {selectedSearch==="title" ? <form onSubmit={handleSubmit}>
            
            <label>Search By Album:</label>
            <input
            name="title"
            placeholder="Please Input Desired Album"
            onChange={(e) => {
                setGenreSearch(null)
                setArtistSearch(null)
                setTitleSearch(e.target.value)}}
            />
            <button type="submit">submit</button>   
        </form> : null} 




        
        <h1>hello</h1>
        <button onClick={()=>{console.log(currentUser)}}>LogginCheck</button>
            {!searchResults ? allProducts?.map(product => {
                
                return (
                    <div>
                        <h3>Title: {product.title}</h3>
                        <p>Rating: {`${averageRating(product)}/5`}</p>
                        <p>{product.desciption}</p>
                        <p>{product.artist}</p>
                        <p>{product.genre}</p>
                        {product.reviews ? product.reviews.map(review => { //------I was here!!!
                            return(
                            <p>{review.review}</p>)
                        }): null}
                        <p>{product.releaseDate.slice(0,10)}</p>
                        <p>{product.price}</p>
                        <p>{product.quantity ? 'In Stock' : "Out of stock"}</p>
                        
                        <img alt="imageLink" src={product.imageLink}/>
                    </div>
                )
            })
            
            :  searchResults?.map(product => {
                return (
                    <div>
                        <h3>Title: {product.title}</h3>
                        {product.reviews ? <p>Rating: {averageRating(product)}</p> : <p>Not Yet Rated</p>}
                        <p>{product.desciption}</p>
                        <p>{product.artist}</p>
                        <p>{product.genre}</p>
                        {product.reviews ? product.reviews.map(review => { //------I was here!!!
                            return(
                            <p>{review.review}</p>)
                        }): null}
                        <p>{product.releaseDate.slice(0,10)}</p>
                        <p>{product.price}</p>
                        <p>{product.quantity ? 'In Stock' : "Out of stock"}</p>
                        
                        <img alt="imageLink" src={product.imageLink}/>
                    </div>
                )
            })
                
            }

            {searchFailed ? 
                
                <h3>Nothing came back, something went wrong with the search.</h3>
            : null}
        
    </div> )          

         

}



export default Home;