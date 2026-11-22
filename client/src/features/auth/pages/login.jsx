import { React, useState } from "react";
import "../auth.pages.scss"
import { Link, Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {

    const { loading, handleLogin } = useAuth();
    //we have used {} instead of [] becuz we are destructing our objects from useAuth export that we had made in client\src\feature\auth\hooks\useAuth.js

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();
        await handleLogin({ email, password });  //this will invoke the handleLogin() function in useAuth.js and pass email and pass to it
        navigate("/dashboard");
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
                            onChange={(e) => { setEmail(e.target.value) }}      //2_way_binding
                            type="email" id="email" name="email" placeholder="johndoe@gmail.com" />
                    </div>

                    <div className="form-input">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}       //2_way_binding
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