import { React, useState } from "react";
import { updateProduct } from "../api";

const EditProduct = (props) => {
  const [product, setProduct] = useState('');
  const [title, setTitle] = useState('')

  const handleSubmitUpdate = async (event) => {
      event.preventDefault()
    try {
      const response = await updateProduct();
      setProduct(response)
      console.log(product);
    } catch (error) {
      throw error;
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmitUpdate}>
        <h2>Update Product:</h2>
        <label>Title: </label>
        <input type="text" onChange={(event) => setProduct({...product, Title: event.target.value})} placeholder={product.title}/>
        <label>Artist: </label>
        <input type="text" onChange={(event) => setProduct({...product, Artist: event.target.value})} placeholder={product.artist}/>
        <label>Genre: </label>
        <input type="text" onChange={(event) => setProduct({...product, Genre: event.target.value})} placeholder={product.genre}/>
        <label>Release Date:</label>
        <input type="text" onChange={(event) => setProduct({...product, ReleaseDate: event.target.value})} placeholder={product.releasedate}/>
        <label>Description:</label>
        <input type="text" onChange={(event) => setProduct({...product, Description: event.target.value})} placeholder={product.description}/>
        <label>Price:</label>
        <input type="text" onChange={(event) => setProduct({...product, Price: event.target.value})} placeholder={product.price}/>
        <label>Quantity:</label>
        <input type="text" onChange={(event) => setProduct({...product, Quantity: event.target.value})} placeholder={product.quantity}/>
        <label>imageLink:</label>
        <input type="text" onChange={(event) => setProduct({...product, imageLink: event.target.value})} placeholder={product.imageLink}/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default EditProduct;
