import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from'path'
import mongoose from 'mongoose'
import router from './routes.js'
import multer from "multer"

const app = express()
const PORT = 8000


// handle json
app.use(bodyParser.json({ extended: true }))

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

//will be using this for uplading
const upload = multer({ storage: storage });

// origins should be spesified in prod
app.use(cors());
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

// Connect to mongodb
mongoose
    .connect(
        "mongodb+srv://henrikskog:JYN*yvn1dyk7anx*jmy@cluster0.ycj8k.mongodb.net/Cluster0?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}...`))