const User = require("../models/user")
const { v4: uuidv4 } = require("uuid")
const {setUser} = require("../service/auth")

async function userSignUp(req,res) {
   try {
       const { name, email, password } = req.body
       await User.create({ name, email, password })
       return res.redirect("/")
   } catch (error) {
       console.log("Error from sign up",error)
       
   }
}


async function userLogin(req,res) {
   try {
       const {  email, password } = req.body
       const user = await User.findOne({ email, password })
       console.log("User",user)
       if (!user) return res.redirect("/login")
       const token = setUser(user)
       res.cookie("uid",token)
       return res.redirect("/")
   } catch (error) {
       console.log("Error from sign up",error)
       
   }
}

module.exports = {userSignUp,userLogin}