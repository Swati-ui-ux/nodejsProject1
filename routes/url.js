const express = require("express")
const {genrateShortUrl,getAnalytics,deleteUrls} = require("../controllers/url")
const router = express.Router()

router.post("/", genrateShortUrl)
router.get("/analatics/:shortId",getAnalytics)
router.post("/delete/:shortId",deleteUrls)
module.exports = router