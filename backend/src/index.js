import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import connectToDB from "./utils/connectdb.js"
import passport from "passport"

const app = express()

// Routers
import userRouter from "./routes/userRoutes.js"
import recipeRouter from "./routes/recipeRoutes.js"
import imageRouter from "./routes/fileUploadRoutes.js"

// Strategies
import jwtStrategy from "./strategies/JwtStrategy.js"
import localStrategy from "./strategies/LocalStrategy.js"

// Call to setup passport strategies
jwtStrategy()
localStrategy()

// handle json
app.use(bodyParser.json({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))

//Add the client URL to the CORS policy
const whitelist = process.env.WHITELISTED_DOMAINS
    ? process.env.WHITELISTED_DOMAINS.split(",")
    : []

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}

app.use(cors(corsOptions))

// Set public folder, mainly for image uploads
app.use('/public', express.static(path.join(path.resolve(), '../public')))

app.use(passport.initialize())

app.use("/users", userRouter)
app.use("/", imageRouter)
app.use("/", recipeRouter)

app.get('/', function (req, res) {
    return res.send("hello from my app express server!")
})

connectToDB();

const server = app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}...`))