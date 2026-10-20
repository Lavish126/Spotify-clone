
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req,res){
    const {userName, email, password, role="user"} = req.body;

    const isUserAlreadyExist = await userModel.findOne({
      $or: [  //Array
         {userName}, //objects
         {email},

      ]
    })
    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"user Already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10);

     const user = await userModel.create({
        userName,
        email,
        password: hash,
        role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role,
    },process.env.JWT_SECRET)

    res.cookie("token",token);

    res.status(201).json({
        message:"user registered successfully",
        user:{
            userName: user.userName,
            email: user.email,
            role: user.role,
            id: user._id,
        }
    })
}

async function loginUser(req,res){
   const {userName,email,password} = req.body;

   const user = await userModel.findOne({
    $or:[
        {userName},
        {email}
    ] 
})
    if (!user) {
        return res.status(401).json({
            message:"invalid credentials"
        })
    }

   const isPasswordValid = await bcrypt.compare(
    password,
    user.password
   )

   if(!isPasswordValid){
    return res.status(401).json({
        message:"invalid credentials"
    })
   }

   const token = jwt.sign({
    id: user._id,
    role: user.role
   },process.env.JWT_SECRET)

   res.cookie("token",token);

   res.status(200).json({
    message:"user logged in successfully",
    user:{
        userName: user.userName,
        email: user.email,
        id: user._id,
        role: user.role
    }

   })

  
}

async function logoutUser(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message:"User logged out successfully"
    })
}

module.exports = {registerUser, loginUser, logoutUser}