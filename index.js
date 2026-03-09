
const dotenv = require("dotenv")
dotenv.config()
const express = require("express")

const app = express()

const PORT = 8001

const urlRoute = require("./routes/url")

const mongoose = require("mongoose")

mongoose.connect(process.env.CONNECTION_STRING).then(() => console.log("DB started")).catch((err) => console.log("db error",err))

app.use("/url",urlRoute)

app.listen(PORT,()=>console.log(`Server is started at ${PORT}`))