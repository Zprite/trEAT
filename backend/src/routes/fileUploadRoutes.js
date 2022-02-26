import express from 'express'
import { verifyUser } from '../authenticate.js';
import upload from "../utils/storage.js"

const router = express.Router();

router.post('/imageUpload', verifyUser, upload.single('file'), async (req, res) => {
    const imagePath = "http://" + req.hostname + ":" + process.env.PORT + "/" + req.file.path;
    console.log('storage location of file upload: ', imagePath);
    return res.send(imagePath);
})

export default router;