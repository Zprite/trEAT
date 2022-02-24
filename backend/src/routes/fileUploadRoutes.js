import express from 'express'
import upload from "../utils/storage.js"

const router = express.Router();

router.post('/imageUpload', upload.single('file'), async (req, res) => {
    const imagePath = "http://" + req.hostname + ":" + PORT + "/" + req.file.path;
    console.log('storage location of file upload: ', imagePath);
    return res.send(imagePath);
})

export default router;