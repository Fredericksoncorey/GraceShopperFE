import { getToken } from "../auth";
const token = localStorage.getItem('token')

export const logIn = async ({ username, password }) => {
  console.log(username, password);
  try {
    const response = await fetch(`http://localhost:3000/api/users/login`, {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    //console.log(data)
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const register = async ({ username, password, email }) => {
  //get /users
  try {
    const response = await fetch(`http://localhost:3000/api/users/register`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
    //console.log(data)
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllProductsWithReviews = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/products`);
    const data = response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const adminCreateProduct = async (product) => {
  try {
    const response = await fetch(`http://localhost:3000/api/products`, {
      method: "POST",
      body: JSON.stringify(product),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = response.json();
    //console.log(data)
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProducts = async () => {
  //console.log("in fetchProducts")
  try {
    const response = await fetch("http://localhost:3000/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch(console.error);
    //console.log(response)
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async (token) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/info`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    //console.log(data)
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createCartItem = async (product) => {
  console.log("createCartItem: ", product);
  try {
    const response = await fetch(`http://localhost:3000/api/cartItems`, {
      method: "POST",
      body: JSON.stringify(product),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const destroyProduct = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => response.json())
    .catch(console.error);
    console.log('hello',response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserCartItems = async (userId) => {
  //console.log("in fetch")
  try {
    const response = await fetch(
      `http://localhost:3000/api/cartItems/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
      .then((response) => response.json())
      .catch(console.error);
    //console.log(response)
    return response;
  } catch (error) {
    throw error;
  }
};

export const searchProductsByArtist = async (artist) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/artist/${artist}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const searchProductsByGenre = async (genre) => {

    try {
        const response = await fetch(`http://localhost:3000/api/products/genre/${genre}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
        const data = await response.json()
        console.log(data)
        return data
        
            
    } catch(error){
        throw error
    }

}

export const searchProductsByTitle = async (title) => {

    try {
        const response = await fetch(`http://localhost:3000/api/products/title/${title}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
        const data = await response.json()
        console.log(data)
        return data
        
            
    } catch(error){
        throw error
    }

}

export const deleteCartItem = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/cartItems/${id}`, {
      method: "DELETE",
      //body: id,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .catch(console.error);
    //console.log(response)
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (product) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/update/${product.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(product),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const editProfile = async (user) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/update/${user}`,
        {
          method: "PATCH",
          body: JSON.stringify(user),
  
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

export const getAllUsers = async (users) => {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "GET",
        body: JSON.stringify(users),
        headers: {
          "Content-Type": "application/json", 
            Authorization: `Bearer ${getToken()}`,
        },
      })
        .then((response) => response.json())
        .catch(console.error);
      return response;
    } catch (error) {
      throw error;
    }
}

export const createOrder = async (userId, guestEmail, productId, quantity) => {
    const order = {
        userId,
        guestEmail,
        productId,
        quantity
    }
    try {
        const response = await fetch('http://localhost:3000/api/orders', {
            method: "POST",
            body: JSON.stringify(order),
            
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            }
        }).then(response => response.json())
            .catch(console.error);
            //console.log(response)
            return response
    } catch (error) {
        throw error
    }
}

export const fetchUserOrders = async (userId) => {
    //console.log("in fetch")
    try {
        const response = await fetch(`http://localhost:3000/api/orders/${userId}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getToken()}`
            },
          }).then(response => response.json())
            .catch(console.error);
            //console.log(response)
            return response
    } catch(error){
        throw error
    }
}

export const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => response.json())
      .catch(console.error);
      console.log('hello',response)
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  export const getUser = async (token) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/info`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.json();
      //console.log(data)
      return data;
    } catch (error) {
      console.error(error);
    }
  };
export const createGuestOrder = async (userId, guestEmail, productId, quantity) => {
  const order = {
      userId,
      guestEmail,
      productId,
      quantity
  }
  try {
      const response = await fetch('http://localhost:3000/api/orders', {
          method: "POST",
          body: JSON.stringify(order),
          
          headers: {
              "Content-Type": "application/json"
          }
      }).then(response => response.json())
          .catch(console.error);
          //console.log(response)
          return response
  } catch (error) {
      throw error
  }
}

export const getGenreList = async () => {
  try {
      const response = await fetch(`http://localhost:3000/api/products/genreList`
  )
      const data = await response.json()
      //console.log(data)
      return data
  } catch (error) {
      console.error(error)
  }
}
