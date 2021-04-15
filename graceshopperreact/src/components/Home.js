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
    const [showReview, setShowReview] = useState(false)
    const [showDescription, setShowDescription] = useState(false)
    
     
    const averageRating = ({reviews}) => {
        let averageRating = 0
        console.log(reviews)
        for (let i=0;i<reviews.length;i++){
            averageRating = averageRating + reviews[i].rating
        }
        averageRating = averageRating/reviews.length
        if(isNaN(averageRating)){
            return `This product has not been rated yet`
        }
        return `Rating: ${averageRating}/5`
    } 
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setShowReview(false)
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
        <div className="home">
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
        {/* <h3> Search:</h3> */}
        <div className="search">
            <form className="searchBar">
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
                    setShowReview(false)
                    setSearchResults(null)
                    setSelectedSearch(null)
                    setGenreSearch(null)
                    setTitleSearch(null)
                    setArtistSearch(null)
                }}>Reset</button> 
                
            </form>

            {selectedSearch==="artist" ? <form className="searchSelected" onSubmit={handleSubmit}>
                
            {/*  <label>Search By Artist:</label> */}
                <input
                name="artist"
                placeholder="Please Input Desired Artist"
                onChange={(e) => {
                    
                    setArtistSearch(e.target.value)}}
                />
                <button type="submit">Submit</button>   
            </form> : null }

            { selectedSearch==="genre" ? <form className="searchSelected" onSubmit={handleSubmit}>
                {/* <label>Search By Genre:</label> */}
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
                <button type="submit">Submit</button> 
                
            </form> : null }

            {selectedSearch==="title" ? <form className="searchSelected" onSubmit={handleSubmit}>
                
                {/* <label>Search By Album:</label> */}
                <input
                name="title"
                placeholder="Please Input Desired Album"
                onChange={(e) => {
                    setGenreSearch(null)
                    setArtistSearch(null)
                    setTitleSearch(e.target.value)}}
                />
                <button type="submit">Submit</button>   
            </form> : null} 
            

        </div>

        
            {!searchResults ? allProducts?.map((product,key) => {
                
                return (
                    <div className="homeProductList" >
                        <div><img alt="imageLink" src={product.imageLink}/></div>
                        <div className="homeInfo">
                            <div className="info">
                                 <h3>Title: {product.title}</h3>
                                <p>{averageRating(product)}</p>
                                <p>{product.artist}</p>
                                <p>{product.genre}</p>
                                <p>{product.description}</p>
                                <p>{product.releaseDate.slice(0,10)}</p>
                                <p>{product.price}</p>
                                <p>{product.quantity ? 'In Stock' : "Out of stock"}</p>
                                {product.reviews.length && showReview !== key ? <button onClick ={()=>{
                                    setShowReview(key)
                                    }}>Show Reviews</button>: null}

                            </div>
                            <div className="feature">
                    
                        
                            {showReview===key ? product.reviews.map(review => { 
                                                return(<>
                                                    <b>{`${review.rating}/5`}</b>
                                                    <p>{review.review}</p> <p>by {review.byUser}</p>
                                                </>)
                                            }):null}
                             
                            </div>
                        
                    </div>
                </div>)
            })
            
            :  searchResults?.map((product,key) => {
                return (
                    <div className="homeProductList" >
                        <div><img alt="imageLink" src={product.imageLink}/></div>
                        <div className="homeInfo">
                            <div className="info">
                                 <h3>Title: {product.title}</h3>
                                <p>{averageRating(product)}</p>
                                <p>{product.artist}</p>
                                <p>{product.genre}</p>
                                <p>{product.description}</p>
                                <p>{product.releaseDate.slice(0,10)}</p>
                                <p>{product.price}</p>
                                <p>{product.quantity ? 'In Stock' : "Out of stock"}</p>
                                
                            </div>
                            <div className="reviews">
                                {product.reviews.length   ? <button onClick ={()=>{
                                    setShowReview(key)
                                    }}>Show Reviews</button>: null}
                                {product.reviews ? product.reviews.map(review => { 
                                    return(<>
                                        
                                            {/* //------I was here!!! */}
                                            {showReview===key ? 
                                                <div classname='review'>
                                                    <b>{`${review.rating}/5`}</b>
                                                    <p>{review.review}</p> <p>by {review.byUser}</p>
                                                </div>
                                            :null
                                            }
                                        </>)}): null}
                            
                            
                        </div>
                        
                    </div>
                </div>)
            })
                
            }

            {searchFailed ? 
                
                <h3>Nothing came back, something went wrong with the search.</h3>
            : null}
        
    </div> )          

         

}



export default Home;