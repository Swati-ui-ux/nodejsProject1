
const {getUser} =require("../service/auth")

async function restrictToLoggedUserOnly(req, res, next) {
   try {
    const userUid = req.cookies?.uid
    if (!userUid) return res.redirect("/login")
    const user = getUser(userUid);
    if (!user) return res.redirect("/login")
    req.user = user
    next()
   } catch (error) {
       console.log("Erron from cookies get",error)
   }
}

async function checkAuth(req, res, next) {
   try {
    
    const userUid = req.cookies?.uid
    const user = getUser(userUid);
    req.user = user
    next()
   } catch (error) {
       console.log("Erron from cookies check",error)
   }
}


module.exports = {restrictToLoggedUserOnly,checkAuth}