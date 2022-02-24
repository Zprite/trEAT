import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from'path'
import router from './routes.js'
import multer from "multer"
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectToDB from "./utils/connectdb.js"

const app = express()
const PORT = 8000
dotenv.config()

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

app.use(cors(corsOptions));

// Multer storage for image-uploads.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
//will be using this for uplading
const upload = multer({ storage: storage });

app.use(router);
app.use('/public', express.static(path.join(path.resolve(), '../public')))
//app.use('/ftp', express.static('public'), serveIndex('public', {'icons': true})); 
 
app.get('/', function(req,res) {
    return res.send("hello from my app express server!")
})

app.post('/imageUpload', upload.single('file'), function(req,res) {
    const imagePath = "http://" + req.hostname + ":" + PORT +"/" + req.file.path;
    console.log('storage location of file upload: ', imagePath);
    return res.send(imagePath);
})

connectToDB();

const server = app.listen(PORT, () => console.log(`Example app listening on port ${PORT}...`))