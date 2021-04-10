import { getToken } from "../auth";



export const logIn = async ({username, password}) => {
    console.log(username, password)
    try {
        const response = await fetch(`http://localhost:3000/api/users/login`,
            {
                method: "POST",
                body: JSON.stringify({ username: username, password: password}),
                headers: {
                    "Content-Type": "application/json",
                },
            }
    )
        const data = await response.json()
        //console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }

}

export const register = async ({username, password, email}) => { //get /users
    try {
        const response = await fetch(`http://localhost:3000/api/users/register`,
            {
                method: "POST",
                body: JSON.stringify({ username: username, password: password,  email: email}),
                headers: {
                    "Content-Type": "application/json",
                },
            }
    )
        const data = response.json()
        //console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}

export const getAllProductsWithReviews = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/products`
        )
            const data = response.json()
            console.log(data)
            return data
    } catch (error) {
        console.error(error);
    }
}

export const adminCreateProduct = async (product) => {

    
    try {
        const response = await fetch(`http://localhost:3000/api/products`,
            {
                method: "POST",
                body: JSON.stringify(product),
               
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`
                }
            }
    )
        const data = response.json()
        //console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}

export const fetchProducts = async () => {
    //console.log("in fetchProducts")
    try {
        const response = await fetch('http://localhost:3000/api/products', {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(response => response.json())
            .catch(console.error);
            //console.log(response)
            return response
    } catch(error){
        throw error
    }
}

export const getUserInfo = async (token) => {

    try {
        const response = await fetch(`http://localhost:3000/api/users/info`,
            {  
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
    )
        const data = response.json()
        //console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }  

}

export const destroyProduct = async (product) => {

    
    try {
        const response = await fetch(`http://localhost:3000/api/products`,
            {
                method: "DELETE",
                body: JSON.stringify(product),
               
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`
                }
            }
    )
        const data = response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

export const updateProduct = async (product) => {
    try {
        const response = await fetch(`http://localhost:3000/api/products`,
            {
                method: "DELETE",
                body: JSON.stringify(product),
               
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`
                }
            }
    )
        const data = response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}