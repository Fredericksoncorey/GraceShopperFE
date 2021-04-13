import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import {adminCreateProduct} from '../api';


const AdminCreateProduct = ({isAdmin}) =>{
    const [product, setProduct] = useState({imageLink: null})
    const [finished, setFinished] = useState(false)


    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        const imageLink = evt.target[1].value
        console.log(imageLink)
        try {
            if(imageLink){
                console.log("Hit Conditional")
               product.imageLink = imageLink
                
            }
            const response = await adminCreateProduct(product)
            console.log(response)
            setFinished(true)
            

            
        }catch (error) {
            throw error
        }


    }
    if (!isAdmin ){
        return <Redirect to="/" />
    }else if(finished){
        return <Redirect to="/admin" />
    }else{
        return(
            <div>
                <h1>Add Product</h1>
                <form onSubmit={handleSubmit}>
                    <label>Album:</label>
                    <input
                        required
                        placeholder="Album Title"
                        onChange={(e) => setProduct({ ...product, title: e.target.value })}
                    />
                    
                    <label>Image Link:</label>
                    <input type="text" placeholder="Image link if applicable" />
                    
                    <label>Artist:</label>
                    <input 
                        required 
                        placeholder="Artist" 
                        onChange={(e) => setProduct({ ...product, artist: e.target.value })} 
                    />

                    <label>Genre:</label> {/* switch to dropdown */}
                    <input 
                        required
                        placeholder="Genre" 
                        onChange={(e) => setProduct({ ...product, genre: e.target.value })} />

                    <label>Release Date:</label>
                    <input 
                        required 
                        placeholder=""
                        onChange={(e) => setProduct({ ...product, releaseDate: e.target.value })} />

                    <label>Description:</label>
                    <input required onChange={(e) => setProduct({ ...product, description: e.target.value })} />

                    <label>Price:</label>
                    <input type = "number" min="0" required onChange={(e) => setProduct({ ...product, price: e.target.value })} />

                    <label htmlFor = "quantity">Quantity:</label>
                    <input type ="number" min="0" required onChange={(e) => setProduct({ ...product, quantity: e.target.value })} />

                    <button type="submit">submit</button>
            </form>
            </div>
        )
    }
}

export default AdminCreateProduct;