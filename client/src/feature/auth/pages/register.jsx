import React from "react";
import "../auth.pages.scss"
import { useNavigate, Link } from "react-router";

const Register = () => {

    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

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

                <p>Already have an Account? <Link to={"/login"}>Login</Link> </p>
            </div>
        </main>
    )
}

export default Register;