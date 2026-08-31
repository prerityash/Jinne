import axios from 'axios'

//this version is cleaned if want to see base version go to: https://github.com/prerityash/GenZ/blob/main/client/src/feature/auth/services/auth.services.js 

const api = axios.create({
    baseURL: "http://localhost:5173",
    withCredentials: true, // send cookies with every request
});

export async function register({ username, email, password }) {
    //Syntax with the curly braces {} inside the parentheses() is called Object Destructuring.So When someone calls the register function, they are going to grab the properties named username, email, and password
    try {
        const response = await api.post("/api/auth/register", {
            username, email, password
        }, {
            withCredentials: true   //allow us to get data from cookies as by default we can't access cookies data in axios, read: https://axios.rest/pages/advanced/authentication.html#cookie-based-authentication
        })

        return response.data

    } catch (err) {
        console.log(err);
    }
}

export async function login({ email, password }) {

    try {
        const response = await api.post("/api/auth/login", {
            email, password
        }, {
            withCredentials: true
        })

        return response.data
    } catch (err) {
        console.log(err);
    }
}

export async function logout() {
    try {
        const response = await api.get("/api/auth/logout", {
            withCredentials: true
        })
    } catch (err) {
        console.log(err)
    }
}

export async function getMe() {
    try {
        const response = await api.get("/api/auth/get-me", {
            withCredentials: true
        })

    } catch (err) {
        console.log(err)
    }
}