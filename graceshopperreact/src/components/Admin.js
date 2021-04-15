import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { React, useEffect, useState } from "react";
import { fetchProducts, destroyProduct} from "../api";
import { useHistory } from "react-router-dom";


const Admin = ({ isAdmin, productEdit, setProductEdit }) => {
  const [products, setProducts] = useState([]);
  let history = useHistory();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const response = await fetchProducts()
      setProducts(response)
      console.log(products)
    } catch (error) {
      console.log(error);
    }
  }, []);


  
  const handleSubmitDelete = async (deleteProductId) => { 
    try {
      const response = await destroyProduct(deleteProductId);
        setProducts(products.filter(product => product.id !== deleteProductId))
        console.log(response)
    } catch (error) {
      throw error;
    }
  };
  if (!isAdmin) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <h1 className="Admin">Welcome to the Administrator Page</h1>
        <div className="link">
        <Link to="/adminCreateProduct">Add a Product</Link>
        <Link to="/users">See all Users</Link>
        </div>
        <h2 className="listheader">List of all products:</h2>
        {products?.map(product => {
          return (  
            <div className="products">
              <h1>Title: {product.title}</h1>
              <p>Artist: {product.artist}</p>
              <p>Genre: {product.genre}</p>
              <p>Release Date: {product.releaseDate}</p>
              <p>Description: {product.description}</p>
              <p>Price: {product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <div>{product.imageLink}</div>
              <img src={product.imageLink} />
              <button type="button" onClick={() => 
               {setProductEdit(product.id); history.push("/editproduct") }}>Edit</button>
              <button type="button" onClick={() => handleSubmitDelete(product.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Admin;
