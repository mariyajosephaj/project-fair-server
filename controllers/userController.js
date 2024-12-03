
const users = require('../models/userModel')
// register
exports.registerController= async (req,res) =>{
    console.log("Inside register controller");
    const {username,email,password}=req.body
    console.log(username,email,password);

    try{

        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User Already exists .. Please login")
        }
        else{
             const newUser = new users({
                username,email,password,github:"",linkedin:"",profilePic:""
             })

             await newUser.save()
             res.status(200).json(newUser)
        }

    }
    catch(err){
        res.status(401).json(err)
    }
    
    
    
}

// login

exports.loginController= async (req,res) =>{
    console.log("Inside login Controller");
    const {email,password}=req.body
    console.log(email,password);

    try{

        const existingUser = await users.findOne({email,password})
        if(existingUser){
            res.status(200).json({
                user :existingUser
            })
        }
        else{
            res.status(404).json("Invalid email/password")
        }

    }
    catch(err){
        res.status(401).json(err)
    }
    
    
    
}


// profile updation
