
const {getUser} =require("../service/auth")

async function restrictToLoggedUserOnly(req, res, next) {
   try {
    const userUid = req.headers["authorization"]
       const token = userUid.split("Bearer ")[1]
       if (!userUid) return res.redirect("/login")
       const user = getUser(token);
       
    if (!user) return res.redirect("/login")
    req.user = user
    next()
   } catch (error) {
       console.log("Erron from cookies get",error)
   }
}

async function checkAuth(req, res, next) {
   try {
    
    const userUid = req.headers["authorization"]
       const token = userUid.split("Bearer ")[1]
    const user = getUser(token);
    req.user = user
    next()
   } catch (error) {
       console.log("Erron from cookies check",error)
   }
}


module.exports = {restrictToLoggedUserOnly,checkAuth}