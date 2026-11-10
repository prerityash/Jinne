import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, logout, register, } from "../services/auth.services.js";

export const useAuth = () => {

    const context = useContext(AuthContext)
    const { loading, setLoading, user, setUser } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password })
            setUser(data.user) // this >user< in data.user comes from backend auth controller as it returns user with all parameter
        } catch (err) {

        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);

        try {
            const data = await register({ username, email, password });
            setUser(data.user)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            const data = await logout()
            setUser(NULL);
        } catch (err) {

        } finally {
            setLoading(false)
        }

    }

    return { user, loading, handleLogin, handleRegister, handleLogout }
}