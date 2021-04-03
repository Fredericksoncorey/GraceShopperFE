import { getToken } from "../auth";
const token = getToken();

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
        const data = response.json()
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