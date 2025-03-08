const asyncHandler=require("express-async-handler");
const User=require("../models/userModel");
const bcrypt= require("bcrypt");

//@ desc Regsiter a user
//@route POST /users/register
//@access public

const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username||!email|| !password){
        res.status(400);
        throw new Error("All fileds are mandatory");
    }
    const userAvailable= await User.findOne({email});//check whether user exits with the now given email

    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }

    //Hash password(we store hashPassword in DB not the raw passowrd)
    const hashPassword=await bcrypt.hash(password,10);
    console.log("hasspassword", hashPassword);
    const user=await User.create({
        username,
        email,
        password:hashPassword,
    });

    console.log(`User created ${user}`);
    if(user){
        res.status(201),json({_id:user.id,email:user.email});
    }else{
        res.status(400);
        throw new Error("User data was not valid");
    }
    res.json({message:"register the user"});
});


//@ desc Login a user
//@route POST /users/login
//@access public

const loginUser= asyncHandler(async (req,res)=>{
    res.json({message:"login the user"})
});

//@ desc Lcurrent user info
//@route GET /users/lcurrent
//@access private

const currentUser= asyncHandler(async (req,res)=>{
    res.json({message:"current user information"})
});



module.exports={registerUser,loginUser,currentUser}