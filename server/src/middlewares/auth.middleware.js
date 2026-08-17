import jwt from "jsonwebtoken";
import blacklistedModel from "../models/blacklist.model.js";

//this middleware will return the values like id ,name etc using token 
async function authUser(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "token needed! "
        })
    }

    //we will find if the token is in blacklisted model
    const istokenblack = await blacklistedModel.findOne({ token });

    if (istokenblack) {
        return res.status(401).json({
            message: "faaah invalid token!"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  //go through jwt verify parameter, token name + token

        req.user = decoded

        next()
    }
    catch {
        return res.status(401).json({
            message: "invalid token"
        })
    }

}

export default { authUser };