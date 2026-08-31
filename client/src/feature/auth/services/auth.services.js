import axios from 'axios'

export async function register({ username, email, password }) {
    //Syntax with the curly braces {} inside the parentheses() is called Object Destructuring.So When someone calls the register function, they are going to grab the properties named username, email, and password
    try {
        const response = await axios.post("http://localhost:5173/api/auth/register", {
            username, email, password
        }, {
            withCredentials: true   //allow us to get data from cookies as by default we can't access cookies data in axios, read: https://axios.rest/pages/advanced/authentication.html#cookie-based-authentication
        })

        return response.data

    } catch (err) {
        console.log(err);
    }
}

export async function login({email, password}) {

    try {
        const response = await axios.post("http://localhost:5173/api/auth/login", {
            email, password
        }, {
            withCredentials: true
        })

        return response.data
    } catch (err) {
        console.log(err);
    }
}

export async function logout(){
    try{
        const response=await axios.get("http://localhost:5173/api/auth/logout",{
            withCredentials: true
        })
    }catch(err){
        console.log(err)
    }
}

export async function getMe(){
    try{
        const response = await axios.get("http://localhost:5173/api/auth/get-me",{
            withCredentials: true
        })
        
    }catch(err){
        console.log(err)
    }
}