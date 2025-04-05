const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
//@ desc Regsiter a user
//@route POST /users/register
//@access public


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fileds are mandatory");
    }
    const userAvailable = await User.findOne({ email });//check whether user exits with the now given email

    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    //Hash password(we store hashPassword in DB not the raw passowrd)
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("hashpassword", hashPassword);
    const user = await User.create({
        username,
        email,
        password: hashPassword,
    });

    console.log(`User created ${user}`);
    if (user) {
        res.status(201), json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data was not valid");
    }
    res.json({ message: "register the user" });
});


//@ desc Login a user
//@route POST /users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        //if user found we create a token use jwt
        //jwt includes payload(user info embedded), and we have to pass accesTokenSecret to it, which we define in .env file
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            }
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
            //accesToken experes in 1 min
        )
        res.status(200).json({ accessToken })
    } else {
        res.status(401)
        throw new Error("email or password not valid")
    }

    res.json({ message: "login the user" })
});

//@ desc current user info
//@route GET /users/lcurrent
//@access private

const currentUser = asyncHandler(async (req, res) => {
    //after validation send user as response
    res.json(req.user)
});



module.exports = { registerUser, loginUser, currentUser }