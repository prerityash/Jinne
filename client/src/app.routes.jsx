import { createBrowserRouter } from "react-router";
import Login from "./feature/auth/pages/login.jsx";
import Register from "./feature/auth/pages/register.jsx";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/",
        element: <Register />
    }
])