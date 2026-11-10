import { React, useState } from "react";
import "../auth.pages.scss"
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {

    const {loading, handleLogin} = useAuth();
    //we have used {} instead of [] becuz we are destructing our objects from useAuth export that we had made in client\src\feature\auth\hooks\useAuth.js

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        handleLogin({ email, password });  //this will invoke the handleLogin() function in useAuth.js and pass email and pass to it
    }

    if (loading) {
        return (
            <main><h1>Loading.....</h1></main>
        )
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>


                <form onSubmit={handlesubmit}>
                    <div className="form-input">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name="email" placeholder="johndoe@gmail.com" />
                    </div>

                    <div className="form-input">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name="password" placeholder="********" />
                    </div>

                    <button className="button primary-button">Submit</button>
                </form>

                <p>Don't have a Account? <Link to={"/"}>Register</Link> </p>
            </div>
        </main>
    )
}

export default Login;