import React, { useState } from "react";
import "../auth.pages.scss"
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {

    const navigate = useNavigate();

    const { loading, handleRegister } = useAuth();

    const [username, setUsername] = useState("");   //fixed username field and state in this version
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password });
        navigate("/dashboard");
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handlesubmit}>

                    <div className="form-input">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" id="username" name="username" placeholder="johndoe" />
                    </div>

                    <div className="form-input">
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)}
                            type="email" id="email" name="email" placeholder="prerit@gmail.com" />
                    </div>

                    <div className="form-input">
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)}
                            type="password" id="password" name="password" placeholder="***Secured***" />
                    </div>

                    <button className="button primary-button">Submit</button>
                </form>

                <p>Already have an Account? <Link to={"/login"}>Login</Link> </p>
            </div>
        </main>
    )
}

export default Register;