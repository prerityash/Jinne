import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { getMe, login, logout, register, } from "../services/auth.services.js";

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

    useEffect(() => {

        const getAndSetUser = async () => {
            const data = await getMe();
            setUser(data.user)
            setLoading(false)
        }

        getAndSetUser();
    }, [])

    return { user, loading, handleLogin, handleRegister, handleLogout }
}