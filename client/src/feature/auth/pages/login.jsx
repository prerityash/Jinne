import React from "react";
import "../auth.pages.scss"
import { Link } from "react-router";

const Login = () => {

    const handlesubmit = (e) => {
        e.preventDefault();
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>


                <form onSubmit={handlesubmit}>
                    <div className="form-input">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="johndoe@gmail.com" />
                    </div>

                    <div className="form-input">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="********" />
                    </div>

                    <button className="button primary-button">Submit</button>
                </form>

                <p>Don't have a Account? <Link to={"/"}>Register</Link> </p>
            </div>
        </main>
    )
}

export default Login;