import React, { Children } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router";

const Protected = ({ Children }) => {

    const { loading, user } = useAuth

    if (loading) {
        return (<main><h1>Loading....</h1></main>);
    }

    if (!user) {
        return <Navigate to={'/login'} />
    }

    return Children;
}

export default Protected;