import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import {adminCreateProduct} from '../api'

const AdminCreateProduct = ({isAdmin}) =>{
    const [product, setProduct] = useState({imageLink: null})



    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        try {
            const response = await adminCreateProduct(product)
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
                <h1>Add Product</h1>
                <form onSubmit={handleSubmit}>
                    <label>Album:</label>
                    <input
                    //name="Title"
                    required
                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                    />
                    <label>Image Link:</label>
                    <input onChange={(e) => setProduct({ ...product, imageLink: e.target.value })} />
                    
                    <label>Artist:</label>
                    <input required onChange={(e) => setProduct({ ...product, artist: e.target.value })} />

                    <label>Genre:</label> {/* switch to dropdown */}
                    <input required onChange={(e) => setProduct({ ...product, genre: e.target.value })} />

                    <label>Release Date:</label>
                    <input required onChange={(e) => setProduct({ ...product, releaseDate: e.target.value })} />

                    <label>Description:</label>
                    <input required onChange={(e) => setProduct({ ...product, description: e.target.value })} />

                    <label>Price:</label>
                    <input required onChange={(e) => setProduct({ ...product, price: e.target.value })} />

                    <label for = "quantity">Quantity:</label>
                    <input type ="number" min="0" required onChange={(e) => setProduct({ ...product, quantity: e.target.value })} />

                    <button type="submit">submit</button>
            </form>
            </div>
        )
    }
}

export default AdminCreateProduct;