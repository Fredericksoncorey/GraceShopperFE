export const storeToken = (token) => {
    localStorage.setItem('token', JSON.stringify(token))
}

export const getToken = () => {
    return JSON.parse(localStorage.getItem('token'))
}

export const clearToken = () => {
    localStorage.removeItem('token')
}

export const loggedInUserId = (userId) => {
    localStorage.setItem('id', userId)
}

export const getId = () => {
    return JSON.parse(localStorage.getItem('id'))
}