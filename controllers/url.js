const { nanoid } = require("nanoid")
const URL = require("../models/url")

async function genrateShortUrl(req, res) {
    try {
        const body = req.body

        if (!body || !body.url) {
            return res.status(400).json({ error: "url is required" })
        }

        const shortId = nanoid(8)

        await URL.create({
            shortId: shortId,
            redirect: body.url,
            visitHistory: []
        })

        const allUrls = await URL.find({})

        return res.render("home", {
            id: shortId,
            urls: allUrls
        })

    } catch (error) {
        console.log("Error form short generate", error)
    }
}

async function getAnalytics(req, res) {
    try {
        const shortId = req.params.shortId

        const result = await URL.findOne({ shortId })

        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory
        })

    } catch (error) {
        console.log("Error in analytics function", error)
    }
}

async function deleteUrls(req,res) {
    try {

        console.log("Delete request received")
        console.log(req.params.shortId)

        const shortId = req.params.shortId

        await URL.findOneAndDelete({ shortId })

        res.redirect('/')

    } catch (error) {
        console.log("Error When delete ",error)
    }
}

module.exports = { genrateShortUrl, getAnalytics, deleteUrls }


// server side rendering mean whole html page is render from server