import usermodal from "../modals/user.modal";

async function registerUserController(req, res) {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please bhaya kuch toh likho"
        })
    }

    const alreadyRegisterUser = await usermodal.findOne({
        $or: [{ username }, { email }]
    })

    if (alreadyRegisterUser) {
        return res.status(400).json({
            message: "Account already exist with this email"
        })
    }

    // until now this we saw that what will happen if user found in db

    // now we will create things that what will happen if new user is created

    // we will setup bcryptjs to encrypt the authentication

    const hash = await bcrypt.hash(password, 10)

    //we will create a user if not in db and encrypt the password
    const user = await usermodal.create({
        username,
        email,
        password: hash
    })

    //setup JWT 

    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIN: "1D" }
    )

    //cookie setup
    // cookie(cookie name,cookie value,cookie options)
    res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
    });

    //we have to return a status code with msg that user is registered successfully
    return res.status(201).json({
        message: "User registered successfully",
        user: user,
        token: token
    })
}

async function loginUserController(req, res) {
    const [email, password] = req.body;  //becuz we only need email and pass during login

    if (!email || !password) {
        return res.status(400).json({
            message: "type something"
        })
    }

    const user = await usermodal.findOne({ email })       //checking if email found 

    if (!user) {
        return res.status(400).json({
            mesaage: "User Not Found"
        })
    }

    const ispassword = await bcrypt.compare(password, user.password);

    if (!ispassword) {
        return res.status(400).json({
            message: "Password Incorrect"
        })
    }

    //if all things are fine and user found in db
    //again create a jwt token 
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIN: "1D" }
    )

    res.cookie("token", token);

    //sending status code 200 OK
    res.status(200).josn({
        message: "User Logged in succesfully",
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    })
}

export default { registerUserController, loginUserController }