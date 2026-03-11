

const jwt = require("jsonwebtoken")
const secret = "swati123"
function setUser(user) {
    
    return jwt.sign({
        _id: user._id,
        email:user.email
    
    }, secret)
}

function getUser(token) {
   try {
     if(!token) return null
    return jwt.verify(token,secret)
   } catch (error) {
    return null
   }
}

module.exports = {setUser,getUser}