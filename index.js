// import dotenv so we can use environment variables from .env file
const dotenv = require("dotenv")
dotenv.config()

// import required packages
const express = require("express")
const path = require("path")
const mongoose = require("mongoose")

// create express application
const app = express()

// import view engine and routes
const ejs = require("ejs")
const staticRoute = require("./routes/staticRouter")
const urlRoute = require("./routes/url")

// import model
const URL = require("./models/url")

// set EJS as template engine
app.set("view engine", "ejs")

// set views folder path
app.set("views", path.resolve("./views"))

// define port for server
const PORT = 8001

// connect to MongoDB using connection string from .env
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("db error", err))

// middleware to parse form data (from HTML forms)
app.use(express.urlencoded({ extended: false }))

// middleware to parse JSON data
app.use(express.json())

// route for URL related APIs
app.use("/url", urlRoute)

// route for static pages (like home page)
app.use("/", staticRoute)

// route to handle redirection using shortId
app.get("/url/:shortId", async (req, res) => {
  try {
    // get shortId from URL parameters
    const shortId = req.params.shortId

    // find URL in database and add visit timestamp in visitHistory
    let entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    )

    // redirect user to original URL
    res.redirect(entry.redirect)
  } catch (error) {
    // log error if something goes wrong
    console.log("Error from short id", error)
  }
})

// start server and listen on defined port
app.listen(PORT, () => console.log(`Server is started at ${PORT}`))