import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { React, useEffect, useState } from "react";
import { fetchProducts, destroyProduct, getAllUsers } from "../api";
import { useHistory } from "react-router-dom";


const Admin = ({ isAdmin }) => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  let history = useHistory();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      console.log("in useEffect");
      const response = await fetchProducts()
      setProducts(response)
      console.log(products)
    } catch (error) {
      console.log(error);
    }
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
//   useEffect(async () => {
//     try {
//       const response = await getAllUsers();
//       setUsers(response)
//       console.log(users);
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);

  function handleClick() {
    history.push("/editproduct");
  }
  
  const handleSubmitDelete = async () => {
    try {
      const response = await destroyProduct();
      setProducts(response)
      console.log(products);
    } catch (error) {
      throw error;
    }
  };
  if (!isAdmin) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <h1>Admin Page</h1>
        <Link to="/adminCreateProduct">Add a Product To List</Link>

        {products?.map(product => {
          return (
            <div className="products">
              <h1>Title: {product.title}</h1>
              <p>Artist: {product.artist}</p>
              <p>Genre: {product.genre}</p>
              <div>{product.imageLink}</div>
              <img src={product.imageLink} />
              <button type="button" onClick={handleClick}>Edit</button>
              <button type="button" onClick={() => handleSubmitDelete(product.id)}>Delete</button>
            </div>
          );
        })}
        {
            users?.map((user) => {
                return(
                <div>
                    <h1>Username: {user.username}</h1>
                    <h1>Email: {user.email}</h1>
                </div>
                )
            })
        }
      </div>
    );
  }
};

export default Admin;
