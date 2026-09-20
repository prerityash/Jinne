import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, logout, register, } from "../services/auth.services.js";

export const useAuth = () => {

    const context = useContext(AuthContext)
    const { loading, setLoading, user, setUser } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        const data = await login({ email, password })
        setUser(data.user) // this >user< in data.user comes from backend auth controller as it returns user with all parameter
        setLoading(false);
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        const data = await register({ username, email, password });
        setUser(data.user)
        setLoading(false)
    }

    const handleLogout = async () => {
        setLoading(true);
        const data = await logout()
        setUser(NULL);
        setLoading(false)

    }

    return { user, loading, handleLogin, handleRegister, handleLogout }
}